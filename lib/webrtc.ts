import { db } from "./firebase"
import { collection, addDoc, onSnapshot, query, where, orderBy, deleteDoc } from "firebase/firestore"

export const rtcConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun1.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:19302" },
  ],
}

/**
 * WebRTCManager manages peer connections, signaling, and audio streams for voice chat.
 * - Handles offer collision (glare) with polite/impolite peer logic.
 * - Exposes error events for UI feedback.
 * - Supports audio quality selection.
 */
export class WebRTCManager {
  private peerConnections: Map<string, RTCPeerConnection> = new Map()
  private localStream: MediaStream | null = null
  private onRemoteStream?: (userId: string, stream: MediaStream) => void
  private onUserDisconnected?: (userId: string) => void
  private onVoiceActivity?: (userId: string, isActive: boolean) => void
  private audioContext: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private voiceActivityInterval: NodeJS.Timeout | null = null
  private roomId: string | null = null
  private currentUserId: string | null = null
  private signalingUnsubscribes: Map<string, () => void> = new Map()
  private isPolite: boolean = false;
  private makingOffer: boolean = false;
  private ignoreOffer: boolean = false;
  private onError?: (error: Error) => void;
  private audioConstraints: MediaStreamConstraints['audio'] = {
    echoCancellation: true,
    noiseSuppression: true,
    autoGainControl: true,
    sampleRate: 44100,
  };
  private onLocalAudioLevel?: (level: number) => void;

  /**
   * @param onRemoteStream Callback for remote stream
   * @param onUserDisconnected Callback for user disconnect
   * @param onVoiceActivity Callback for voice activity
   * @param onError Callback for error events
   */
  constructor(
    onRemoteStream?: (userId: string, stream: MediaStream) => void,
    onUserDisconnected?: (userId: string) => void,
    onVoiceActivity?: (userId: string, isActive: boolean) => void,
    onError?: (error: Error) => void,
    onLocalAudioLevel?: (level: number) => void,
  ) {
    this.onRemoteStream = onRemoteStream;
    this.onUserDisconnected = onUserDisconnected;
    this.onVoiceActivity = onVoiceActivity;
    this.onError = onError;
    this.onLocalAudioLevel = onLocalAudioLevel;
  }

  /**
   * Set audio quality (call before initializeLocalStream)
   * @param quality 'low' | 'medium' | 'high'
   */
  setAudioQuality(quality: 'low' | 'medium' | 'high') {
    if (quality === 'low') {
      this.audioConstraints = { echoCancellation: true, noiseSuppression: true, sampleRate: 16000 };
    } else if (quality === 'medium') {
      this.audioConstraints = { echoCancellation: true, noiseSuppression: true, sampleRate: 32000 };
    } else {
      this.audioConstraints = { echoCancellation: true, noiseSuppression: true, sampleRate: 44100 };
    }
  }

  async initializeLocalStream(): Promise<MediaStream> {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: this.audioConstraints,
        video: false,
      });
      this.setupVoiceActivityDetection();
      console.log("Local stream initialized successfully");
      return this.localStream;
    } catch (error) {
      console.error("Error accessing microphone:", error);
      this.onError?.(error instanceof Error ? error : new Error(String(error)));
      throw new Error("Microphone access denied. Please allow microphone permissions and try again.");
    }
  }

  setRoomAndUser(roomId: string, userId: string, isPolite: boolean = false): void {
    this.roomId = roomId;
    this.currentUserId = userId;
    this.isPolite = isPolite;
    this.setupSignalingListener();
  }

  private setupSignalingListener(): void {
    if (!this.roomId || !this.currentUserId) return

    const signalingRef = collection(db, "rooms", this.roomId, "signaling")
    const q = query(signalingRef, where("to", "==", this.currentUserId), orderBy("timestamp", "asc"))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
        if (change.type === "added") {
          const data = change.doc.data()
          await this.handleSignalingMessage(data)
          // Delete the processed message
          await deleteDoc(change.doc.ref)
        }
      })
    })

    this.signalingUnsubscribes.set(this.roomId, unsubscribe)
  }

  private async handleSignalingMessage(data: any): Promise<void> {
    const { from, type, payload } = data;
    try {
      switch (type) {
        case "offer":
          await this.handleOffer(from, payload);
          break;
        case "answer":
          await this.handleAnswer(from, payload);
          break;
        case "ice-candidate":
          await this.handleIceCandidate(from, payload);
          break;
      }
    } catch (error) {
      console.error("Error handling signaling message:", error);
      this.onError?.(error instanceof Error ? error : new Error(String(error)));
    }
  }

  private async sendSignalingMessage(to: string, type: string, payload: any): Promise<void> {
    if (!this.roomId || !this.currentUserId) return

    try {
      // Serialize the payload to ensure it's Firebase-compatible
      let serializedPayload = payload

      if (type === "ice-candidate" && payload) {
        // Convert RTCIceCandidate to plain object
        serializedPayload = {
          candidate: payload.candidate,
          sdpMLineIndex: payload.sdpMLineIndex,
          sdpMid: payload.sdpMid,
          usernameFragment: payload.usernameFragment,
        }
      }

      const signalingRef = collection(db, "rooms", this.roomId, "signaling")
      await addDoc(signalingRef, {
        from: this.currentUserId,
        to,
        type,
        payload: serializedPayload,
        timestamp: Date.now(),
      })
      console.log(`Sent ${type} to user:`, to)
    } catch (error) {
      console.error("Error sending signaling message:", error)
    }
  }

  private setupVoiceActivityDetection(): void {
    if (!this.localStream) return

    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const source = this.audioContext.createMediaStreamSource(this.localStream)
      this.analyser = this.audioContext.createAnalyser()

      this.analyser.fftSize = 256
      this.analyser.smoothingTimeConstant = 0.8

      source.connect(this.analyser)
      this.startVoiceActivityMonitoring()
    } catch (error) {
      console.error("Error setting up voice activity detection:", error)
    }
  }

  private startVoiceActivityMonitoring(): void {
    if (!this.analyser) return

    const bufferLength = this.analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    this.voiceActivityInterval = setInterval(() => {
      this.analyser!.getByteFrequencyData(dataArray)
      const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength
      const threshold = 20
      const isActive = average > threshold
      // Normalized audio level (0-1)
      const level = Math.min(1, average / 128)
      this.onVoiceActivity?.("local", isActive)
      this.onLocalAudioLevel?.(level)
    }, 100)
  }

  async createPeerConnection(userId: string): Promise<RTCPeerConnection> {
    const peerConnection = new RTCPeerConnection(rtcConfiguration)

    // Add local stream tracks
    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        console.log("Adding track to peer connection:", track.kind, "for user:", userId)
        peerConnection.addTrack(track, this.localStream!)
      })
    }

    // Handle remote stream
    peerConnection.ontrack = (event) => {
      console.log("Received remote track from user:", userId, event.track.kind)
      const [remoteStream] = event.streams

      // Ensure we have a valid stream
      if (remoteStream && remoteStream.getAudioTracks().length > 0) {
        console.log("Remote stream has audio tracks:", remoteStream.getAudioTracks().length)
        this.onRemoteStream?.(userId, remoteStream)
        this.setupRemoteVoiceActivityDetection(userId, remoteStream)
      }
    }

    // Offer collision handling
    peerConnection.onnegotiationneeded = async () => {
      try {
        this.makingOffer = true;
        await peerConnection.setLocalDescription(await peerConnection.createOffer({ offerToReceiveAudio: true, offerToReceiveVideo: false }));
        await this.sendSignalingMessage(userId, "offer", peerConnection.localDescription);
      } catch (err) {
        this.onError?.(err instanceof Error ? err : new Error(String(err)));
      } finally {
        this.makingOffer = false;
      }
    };
    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        this.sendSignalingMessage(userId, "ice-candidate", event.candidate);
      }
    };

    // Handle connection state changes
    peerConnection.onconnectionstatechange = () => {
      console.log(`Connection state for ${userId}:`, peerConnection.connectionState)
      if (peerConnection.connectionState === "disconnected" || peerConnection.connectionState === "failed") {
        this.onUserDisconnected?.(userId)
        this.removePeerConnection(userId)
      }
    }

    peerConnection.oniceconnectionstatechange = () => {
      console.log(`ICE connection state for ${userId}:`, peerConnection.iceConnectionState)
    }

    this.peerConnections.set(userId, peerConnection)
    return peerConnection
  }

  private setupRemoteVoiceActivityDetection(userId: string, stream: MediaStream): void {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      const source = audioContext.createMediaStreamSource(stream)
      const analyser = audioContext.createAnalyser()

      analyser.fftSize = 256
      analyser.smoothingTimeConstant = 0.8
      source.connect(analyser)

      const bufferLength = analyser.frequencyBinCount
      const dataArray = new Uint8Array(bufferLength)

      const checkVoiceActivity = () => {
        analyser.getByteFrequencyData(dataArray)
        const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength
        const threshold = 20
        const isActive = average > threshold
        this.onVoiceActivity?.(userId, isActive)
      }

      const interval = setInterval(checkVoiceActivity, 100)

      // Store cleanup function
      const cleanup = () => {
        clearInterval(interval)
        audioContext.close()
      }

      // Clean up when peer connection is removed
      const originalRemove = this.removePeerConnection.bind(this)
      this.removePeerConnection = (id: string) => {
        if (id === userId) {
          cleanup()
        }
        originalRemove(id)
      }
    } catch (error) {
      console.error("Error setting up remote voice activity detection:", error)
    }
  }

  async initiateCall(userId: string): Promise<void> {
    console.log("Initiating call to user:", userId)
    const peerConnection = await this.createPeerConnection(userId)

    const offer = await peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: false,
    })

    await peerConnection.setLocalDescription(offer)
    await this.sendSignalingMessage(userId, "offer", offer)
    console.log("Sent offer to user:", userId)
  }

  private async handleOffer(fromUserId: string, offer: RTCSessionDescriptionInit): Promise<void> {
    let peerConnection = this.peerConnections.get(fromUserId);
    if (!peerConnection) {
      peerConnection = await this.createPeerConnection(fromUserId);
    }
    const offerCollision = peerConnection.signalingState !== "stable" || this.makingOffer;
    this.ignoreOffer = !this.isPolite && offerCollision;
    if (this.ignoreOffer) {
      console.warn("Ignoring offer due to collision (impolite peer)");
      return;
    }
    try {
      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      await this.sendSignalingMessage(fromUserId, "answer", answer);
    } catch (err) {
      this.onError?.(err instanceof Error ? err : new Error(String(err)));
    }
  }

  private async handleAnswer(fromUserId: string, answer: RTCSessionDescriptionInit): Promise<void> {
    const peerConnection = this.peerConnections.get(fromUserId);
    if (peerConnection) {
      try {
        await peerConnection.setRemoteDescription(answer);
      } catch (err) {
        this.onError?.(err instanceof Error ? err : new Error(String(err)));
      }
    }
  }

  private async handleIceCandidate(fromUserId: string, candidate: RTCIceCandidateInit): Promise<void> {
    const peerConnection = this.peerConnections.get(fromUserId);
    if (peerConnection) {
      try {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      } catch (err) {
        this.onError?.(err instanceof Error ? err : new Error(String(err)));
      }
    }
  }

  removePeerConnection(userId: string): void {
    const peerConnection = this.peerConnections.get(userId)
    if (peerConnection) {
      peerConnection.close()
      this.peerConnections.delete(userId)
      console.log("Removed peer connection for user:", userId)
    }
  }

  toggleMute(): boolean {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled
        console.log("Audio track enabled:", audioTrack.enabled)
        return audioTrack.enabled
      }
    }
    return false
  }

  cleanup(): void {
    console.log("Cleaning up WebRTC manager...")

    if (this.voiceActivityInterval) {
      clearInterval(this.voiceActivityInterval)
      this.voiceActivityInterval = null
    }

    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
    }

    this.signalingUnsubscribes.forEach((unsubscribe) => unsubscribe())
    this.signalingUnsubscribes.clear()

    this.peerConnections.forEach((pc) => pc.close())
    this.peerConnections.clear()

    if (this.localStream) {
      this.localStream.getTracks().forEach((track) => {
        track.stop()
        console.log("Stopped track:", track.kind)
      })
      this.localStream = null
    }
  }
}
