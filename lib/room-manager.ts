import { db, auth } from "./firebase"
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  getDoc,
  serverTimestamp,
  increment,
} from "firebase/firestore"
import { signInAnonymously } from "firebase/auth"

export interface User {
  id: string
  anonymousId: string
  lastActive: any
  visits: number
  active: boolean
  timestamp: number
}

export interface Room {
  id: string
  userCount: number
  created: number
  users: { [userId: string]: User }
}

export class RoomManager {
  private roomId: string | null = null
  private userId: string | null = null
  private unsubscribeRoom: (() => void) | null = null
  private onRoomUpdate?: (room: Room) => void
  private onUsersUpdate?: (users: User[]) => void
  private heartbeatInterval: NodeJS.Timeout | null = null

  constructor(onRoomUpdate?: (room: Room) => void, onUsersUpdate?: (users: User[]) => void) {
    this.onRoomUpdate = onRoomUpdate
    this.onUsersUpdate = onUsersUpdate
  }

  async joinRoom(): Promise<{ roomId: string; userId: string; users: User[] }> {
    try {
      // Ensure user is authenticated
      if (!auth.currentUser) {
        console.log("Signing in anonymously...");
        await signInAnonymously(auth);
        // Wait for auth state to update
        await new Promise<void>((resolve) => {
          const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
              unsubscribe();
              resolve();
            }
          });
        });
      }

      this.userId = auth.currentUser!.uid;
      console.log("User authenticated with ID:", this.userId)

      // Get or create user data
      const userData = await this.getOrCreateUserData(this.userId)
      console.log("User data:", userData)

      // Find or create room
      const roomData = await this.findOrCreateRoom()
      this.roomId = roomData.roomId

      console.log("Joining room:", this.roomId)

      // Add user to room
      await this.addUserToRoom(this.roomId, this.userId, userData)

      // Set up room listener
      this.setupRoomListener(this.roomId)

      // Start heartbeat
      this.startHeartbeat()

      // Set up cleanup on page unload
      this.setupCleanupListeners()

      const users = await this.getRoomUsers(this.roomId)
      return { roomId: this.roomId, userId: this.userId, users }
    } catch (error) {
      console.error("Error joining room:", error)
      throw error
    }
  }

  private async getOrCreateUserData(userId: string): Promise<User> {
    try {
      const userRef = doc(db, "users", userId)
      const userDoc = await getDoc(userRef)

      if (userDoc.exists()) {
        const userData = userDoc.data()
        // Update existing user
        await updateDoc(userRef, {
          lastActive: serverTimestamp(),
          visits: increment(1),
        })

        return {
          id: userId,
          anonymousId: userData.anonymousId,
          lastActive: userData.lastActive,
          visits: userData.visits + 1,
          active: true,
          timestamp: Date.now(),
        }
      } else {
        // Create new user
        const anonymousId = `User#${Math.floor(Math.random() * 10000)
          .toString()
          .padStart(4, "0")}`
        const newUser: User = {
          id: userId,
          anonymousId,
          lastActive: serverTimestamp(),
          visits: 1,
          active: true,
          timestamp: Date.now(),
        }

        await setDoc(userRef, {
          anonymousId,
          lastActive: serverTimestamp(),
          visits: 1,
        })

        return newUser
      }
    } catch (error) {
      console.error("Error getting/creating user data:", error)
      throw error
    }
  }

  private async findOrCreateRoom(): Promise<{ roomId: string }> {
    try {
      // Find rooms with available space
      const roomsRef = collection(db, "rooms")
      const availableRoomsQuery = query(roomsRef, where("userCount", "<", 10), orderBy("created", "asc"), limit(1))

      const availableRooms = await getDocs(availableRoomsQuery)

      if (!availableRooms.empty) {
        const roomDoc = availableRooms.docs[0]
        console.log("Found available room:", roomDoc.id)
        return { roomId: roomDoc.id }
      }

      // Create new room
      const newRoomRef = doc(collection(db, "rooms"))
      const roomData = {
        id: newRoomRef.id,
        userCount: 0,
        created: Date.now(),
      }

      await setDoc(newRoomRef, roomData)
      console.log("Created new room:", newRoomRef.id)
      return { roomId: newRoomRef.id }
    } catch (error) {
      console.error("Error finding/creating room:", error)
      throw error
    }
  }

  private async addUserToRoom(roomId: string, userId: string, userData: User): Promise<void> {
    try {
      const roomRef = doc(db, "rooms", roomId)
      const userInRoomRef = doc(db, "rooms", roomId, "users", userId)

      // Add user to room's users subcollection
      await setDoc(userInRoomRef, {
        id: userId,
        anonymousId: userData.anonymousId,
        active: true,
        timestamp: Date.now(),
      })

      // Update room user count
      await updateDoc(roomRef, {
        userCount: increment(1),
      })

      console.log("Added user to room:", roomId)
    } catch (error) {
      console.error("Error adding user to room:", error)
      throw error
    }
  }

  private setupRoomListener(roomId: string): void {
    const usersRef = collection(db, "rooms", roomId, "users")
    const usersQuery = query(usersRef, orderBy("timestamp", "asc"))

    this.unsubscribeRoom = onSnapshot(usersQuery, (snapshot) => {
      const users: User[] = []
      snapshot.forEach((doc) => {
        const userData = doc.data()
        users.push({
          id: doc.id,
          anonymousId: userData.anonymousId,
          lastActive: userData.lastActive,
          visits: userData.visits || 1,
          active: userData.active,
          timestamp: userData.timestamp,
        })
      })

      console.log("Room users updated:", users.length)
      this.onUsersUpdate?.(users)

      // Update room data
      const roomData: Room = {
        id: roomId,
        userCount: users.length,
        created: Date.now(),
        users: users.reduce(
          (acc, user) => {
            acc[user.id] = user
            return acc
          },
          {} as { [userId: string]: User },
        ),
      }

      this.onRoomUpdate?.(roomData)
    })
  }

  private async getRoomUsers(roomId: string): Promise<User[]> {
    try {
      const usersRef = collection(db, "rooms", roomId, "users")
      const usersQuery = query(usersRef, orderBy("timestamp", "asc"))
      const usersSnapshot = await getDocs(usersQuery)

      const users: User[] = []
      usersSnapshot.forEach((doc) => {
        const userData = doc.data()
        users.push({
          id: doc.id,
          anonymousId: userData.anonymousId,
          lastActive: userData.lastActive,
          visits: userData.visits || 1,
          active: userData.active,
          timestamp: userData.timestamp,
        })
      })

      return users
    } catch (error) {
      console.error("Error getting room users:", error)
      return []
    }
  }

  private startHeartbeat(): void {
    this.heartbeatInterval = setInterval(async () => {
      if (this.roomId && this.userId) {
        try {
          const userInRoomRef = doc(db, "rooms", this.roomId, "users", this.userId)
          await updateDoc(userInRoomRef, {
            timestamp: Date.now(),
            active: true,
          })
        } catch (error) {
          console.error("Error updating heartbeat:", error)
        }
      }
    }, 30000) // Update every 30 seconds
  }

  /**
   * Mark the user as active or inactive in the room (without removing them)
   */
  async setUserActiveStatus(isActive: boolean): Promise<void> {
    if (this.roomId && this.userId) {
      const userInRoomRef = doc(db, "rooms", this.roomId, "users", this.userId)
      await updateDoc(userInRoomRef, {
        active: isActive,
        timestamp: Date.now(),
      })
    }
  }

  private setupCleanupListeners(): void {
    const cleanup = async () => {
      await this.leaveRoom()
    }

    // Handle page unload (remove user)
    window.addEventListener("beforeunload", cleanup)
    window.addEventListener("unload", cleanup)

    // Handle visibility change (tab switch/away)
    document.addEventListener("visibilitychange", async () => {
      if (document.hidden) {
        await this.setUserActiveStatus(false)
      } else {
        await this.setUserActiveStatus(true)
      }
    })
  }

  async leaveRoom(): Promise<void> {
    try {
      if (this.roomId && this.userId) {
        console.log("Leaving room:", this.roomId)

        // Remove user from room
        const userInRoomRef = doc(db, "rooms", this.roomId, "users", this.userId)
        await deleteDoc(userInRoomRef)

        // Update room user count
        const roomRef = doc(db, "rooms", this.roomId)
        await updateDoc(roomRef, {
          userCount: increment(-1),
        })

        // Update user's last active in main users collection
        if (auth.currentUser) {
          const userRef = doc(db, "users", this.userId)
          await updateDoc(userRef, {
            lastActive: serverTimestamp(),
          })
        }
      }

      // Clean up listeners and intervals
      if (this.unsubscribeRoom) {
        this.unsubscribeRoom()
        this.unsubscribeRoom = null
      }

      if (this.heartbeatInterval) {
        clearInterval(this.heartbeatInterval)
        this.heartbeatInterval = null
      }

      this.roomId = null
      this.userId = null
    } catch (error) {
      console.error("Error leaving room:", error)
    }
  }

  getRoomId(): string | null {
    return this.roomId
  }

  getUserId(): string | null {
    return this.userId
  }
}
