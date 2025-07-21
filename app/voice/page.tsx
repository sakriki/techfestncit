"use client"

import { useState, useEffect, useRef } from "react"
import { Sidebar } from "@/components/anonymous/navigation/sidebar"
import { ThemeSelector } from "@/components/anonymous/theme-selector"
import { getTheme } from "@/lib/themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UserAvatar } from "./components/user-avatar"
import { VoiceControls } from "./components/voice-controls"
import { RoomInfo } from "./components/room-info"
import { RoomManager, type User, type Room } from "@/lib/room-manager"
import { WebRTCManager } from "@/lib/webrtc"
import { Mic } from "lucide-react"
import React from "react"

function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

export default function VoicePage() {
  // Theme and sidebar state
  const [currentTheme, setCurrentTheme] = useState("dark")
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const themeColors = getTheme(currentTheme).colors

  // Voice chat state (from old app)
  const [isInRoom, setIsInRoom] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const [room, setRoom] = useState<Room | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [connectedPeers, setConnectedPeers] = useState(0)
  const [speakingUsers, setSpeakingUsers] = useState<Set<string>>(new Set())
  const [error, setError] = useState<string | null>(null)
  const [audioQuality, setAudioQuality] = useState<'low' | 'medium' | 'high'>('high')
  const [localAudioLevel, setLocalAudioLevel] = useState(0)
  const [showAudioPrompt, setShowAudioPrompt] = useState(false)
  const pendingAudioElementsRef = useRef<Set<HTMLAudioElement>>(new Set())

  const roomManagerRef = useRef<RoomManager | null>(null)
  const webrtcManagerRef = useRef<WebRTCManager | null>(null)
  const audioElementsRef = useRef<Map<string, HTMLAudioElement>>(new Map())
  const currentUserIdRef = useRef<string | null>(null)

  const handleRemoteStream = (userId: string, stream: MediaStream) => {
    let audioElement = audioElementsRef.current.get(userId)
    if (!audioElement) {
      audioElement = document.createElement("audio")
      audioElement.autoplay = true
      audioElement.volume = 1.0
      audioElement.muted = false
      audioElementsRef.current.set(userId, audioElement)
      document.body.appendChild(audioElement)
    }
    audioElement.srcObject = stream
    audioElement.play().catch(() => {
      // If playback fails, add to pending set and show prompt
      pendingAudioElementsRef.current.add(audioElement!)
      setShowAudioPrompt(true)
    })
    setConnectedPeers((prev) => prev + 1)
  }

  const handleUserDisconnected = (userId: string) => {
    const audioElement = audioElementsRef.current.get(userId)
    if (audioElement) {
      audioElement.remove()
      audioElementsRef.current.delete(userId)
    }
    setConnectedPeers((prev) => Math.max(0, prev - 1))
    setSpeakingUsers((prev) => {
      const newSet = new Set(prev)
      newSet.delete(userId)
      return newSet
    })
  }

  const handleVoiceActivity = (userId: string, isActive: boolean) => {
    const actualUserId = userId === "local" ? currentUserIdRef.current : userId
    if (!actualUserId) return
    setSpeakingUsers((prev) => {
      const newSet = new Set(prev)
      if (isActive) {
        newSet.add(actualUserId)
      } else {
        newSet.delete(actualUserId)
      }
      return newSet
    })
  }

  const handleJoinRoom = async () => {
    try {
      setIsJoining(true)
      setError(null)
      roomManagerRef.current = new RoomManager(
        (room: Room) => setRoom(room),
        (users: User[]) => setUsers(users),
      )
      const { roomId, userId, users: initialUsers } = await roomManagerRef.current.joinRoom()
      currentUserIdRef.current = userId
      webrtcManagerRef.current = new WebRTCManager(
        handleRemoteStream,
        handleUserDisconnected,
        handleVoiceActivity,
        (err: Error) => setError(err.message),
        (level: number) => setLocalAudioLevel(level)
      )
      webrtcManagerRef.current.setAudioQuality(audioQuality)
      await webrtcManagerRef.current.initializeLocalStream()
      const isPolite = users.length > 0 && userId > users[0].id
      webrtcManagerRef.current.setRoomAndUser(roomId, userId, isPolite)
      setIsInRoom(true)
      setIsConnected(true)
      const otherUsers = initialUsers.filter((user) => user.id !== userId)
      for (const user of otherUsers) {
        if (user.id !== userId) {
          await webrtcManagerRef.current.initiateCall(user.id)
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to join room")
    } finally {
      setIsJoining(false)
    }
  }

  const handleLeaveRoom = async () => {
    try {
      if (webrtcManagerRef.current) {
        webrtcManagerRef.current.cleanup()
        webrtcManagerRef.current = null
      }
      if (roomManagerRef.current) {
        await roomManagerRef.current.leaveRoom()
        roomManagerRef.current = null
      }
      audioElementsRef.current.forEach((audioElement) => {
        audioElement.remove()
      })
      audioElementsRef.current.clear()
      setIsInRoom(false)
      setUsers([])
      setRoom(null)
      setIsMuted(false)
      setIsConnected(false)
      setConnectedPeers(0)
      setSpeakingUsers(new Set())
      currentUserIdRef.current = null
      setError(null)
    } catch (error) {}
  }

  const handleToggleMute = () => {
    if (webrtcManagerRef.current) {
      const isEnabled = webrtcManagerRef.current.toggleMute()
      setIsMuted(!isEnabled)
    }
  }

  // Function to retry playing all pending audio elements
  const enableAllAudio = () => {
    pendingAudioElementsRef.current.forEach((audioElement) => {
      audioElement.play()
    })
    pendingAudioElementsRef.current.clear()
    setShowAudioPrompt(false)
  }

  useEffect(() => {
    return () => {
      handleLeaveRoom()
    }
  }, [])

  // --- RENDER ---
  return (
    <div
      className="h-screen flex overflow-hidden"
      style={{ backgroundColor: themeColors.background, color: themeColors.text }}
    >
      {/* Audio enable overlay for iOS/Safari */}
      {showAudioPrompt && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.85)",
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff"
          }}
        >
          <div style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Enable Audio</div>
          <div style={{ fontSize: 16, marginBottom: 24, maxWidth: 320, textAlign: "center" }}>
            For security reasons, audio playback is blocked on iOS and some browsers until you tap below.
          </div>
          <Button
            onClick={enableAllAudio}
            style={{ fontSize: 18, padding: "12px 32px", background: themeColors.accent, color: themeColors.text }}
          >
            Tap to Enable Audio
          </Button>
        </div>
      )}
      {/* Sidebar Navigation */}
      <Sidebar
        currentTheme={currentTheme}
        themeColors={themeColors}
        user={{ anonymousId: currentUserIdRef.current || "User#0000" }}
        isSoundEnabled={isSoundEnabled}
        toggleSound={() => setIsSoundEnabled((prev) => !prev)}
      />
      {/* Main Voice Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0 transition-all duration-500 ease-out">
        {/* Theme Selector */}
        <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
        {/* Main Content */}
        {!isInRoom ? (
          <div className="min-h-screen flex items-center justify-center p-4">
            <Card 
              className="w-full max-w-md"
              style={{ 
                backgroundColor: themeColors.primary, 
                borderColor: themeColors.secondary 
              }}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  {/* Audio Quality Selector */}
                  <div className="mb-4">
                    <label 
                      className="block mb-2 font-medium"
                      style={{ color: themeColors.text }}
                    >
                      Audio Quality
                    </label>
                    <select
                      className="w-full p-2 rounded focus:outline-none"
                      style={{
                        backgroundColor: themeColors.secondary,
                        color: themeColors.text,
                        borderColor: themeColors.accent
                      }}
                      value={audioQuality}
                      onChange={e => setAudioQuality(e.target.value as 'low' | 'medium' | 'high')}
                      disabled={isJoining}
                    >
                      <option value="low">Low (16kHz, best for slow networks)</option>
                      <option value="medium">Medium (32kHz, balanced)</option>
                      <option value="high">High (44.1kHz, best quality)</option>
                    </select>
                  </div>
                  <div 
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: themeColors.accent }}
                  >
                    <Mic className="h-10 w-10" style={{ color: themeColors.text }} />
                  </div>
                  <h1 
                    className="text-2xl font-bold mb-2"
                    style={{ color: themeColors.text }}
                  >
                    Voice Chat
                  </h1>
                  <p style={{ color: themeColors.secondaryText }}>
                    Join a voice room and start talking with others
                  </p>
                </div>
                {error && (
                  <div 
                    className="text-sm mt-2"
                    style={{ color: '#ef4444' }}
                  >
                    {error}
                  </div>
                )}
                <Button
                  onClick={handleJoinRoom}
                  disabled={isJoining}
                  className="w-full font-medium py-3"
                  style={{ 
                    backgroundColor: themeColors.accent,
                    color: themeColors.text
                  }}
                >
                  {isJoining ? "Joining..." : "Join Voice Chat"}
                </Button>
                <p 
                  className="text-xs mt-4"
                  style={{ color: themeColors.secondaryText }}
                >
                  Make sure to allow microphone access when prompted
                </p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full p-4">
            {/* Room Info */}
            <RoomInfo room={room} isConnected={isConnected} themeColors={themeColors} />
            {/* Users Grid */}
            <div 
              className="rounded-lg p-6 mb-6"
              style={{ backgroundColor: themeColors.primary }}
            >
              <h2 
                className="text-xl font-bold mb-4"
                style={{ color: themeColors.text }}
              >
                Users in Room ({users.length}/10)
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {users.map((user: User) => (
                  <UserAvatar
                    key={user.id}
                    user={user}
                    isCurrentUser={user.id === currentUserIdRef.current}
                    isSpeaking={speakingUsers.has(user.id)}
                    localAudioLevel={user.id === currentUserIdRef.current ? localAudioLevel : undefined}
                    themeColors={themeColors}
                  />
                ))}
              </div>
            </div>
            {/* Voice Controls */}
            <div 
              className="rounded-lg p-6"
              style={{ backgroundColor: themeColors.primary }}
            >
              <VoiceControls
                isMuted={isMuted}
                onToggleMute={handleToggleMute}
                onLeaveRoom={handleLeaveRoom}
                isConnected={isConnected}
                connectedPeers={connectedPeers}
                themeColors={themeColors}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 