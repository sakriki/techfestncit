"use client"

import { useState, useEffect, useRef } from "react"
import { db, auth } from "@/lib/firebase"

export interface Message {
  id: string
  text: string
  sender: string
  timestamp: any
  isAdmin?: boolean
  reactions?: { [emoji: string]: string[] } // emoji -> array of user IDs
}

// Generate a consistent anonymous ID from the user ID
const generateAnonymousId = (uid: string) => {
  if (!uid) return "Anonymous User"
  const hash = uid.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
  return `Trinitian#${Math.abs(hash).toString().slice(0, 4)}`
}

export function useFirebase() {
  const [user, setUser] = useState<any>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [activeUsers, setActiveUsers] = useState(0)
  const [totalVisitors, setTotalVisitors] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  // Remove isFirebaseReady and firebaseServices
  const unsubscribers = useRef<any[]>([])
  const messageLimit = 100 // Limit the number of messages to display

  // Setup Authentication listener
  useEffect(() => {
    const setupAuth = async () => {
      try {
        const { onAuthStateChanged, signInAnonymously } = await import("firebase/auth")
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUser(user)
            updateUserPresence(user.uid)
            setIsLoading(false) // <-- Add this here
          } else {
            signInAnonymously(auth).catch(console.error)
          }
        })
        unsubscribers.current.push(() => unsubscribe());
      } catch (error) {
        console.error("Authentication setup failed:", error)
      }
    }
    setupAuth()
    return () => {
      unsubscribers.current.forEach((unsubscribe) => {
        if (typeof unsubscribe === "function") {
          unsubscribe()
        }
      })
      unsubscribers.current = []
    }
  }, [])

  // Setup Visitor Tracking listener
  useEffect(() => {
    const setupVisitorTrackingListener = async () => {
      try {
        const { doc, setDoc, updateDoc, increment, getDoc, onSnapshot } = await import("firebase/firestore")
        const visitRef = doc(db, "stats", "totalVisits")
        const docSnap = await getDoc(visitRef)
        if (!docSnap.exists()) {
          await setDoc(visitRef, { count: 1 })
        } else {
          await updateDoc(visitRef, { count: increment(1) })
        }
        const unsubscribe = onSnapshot(visitRef, (doc) => {
          if (doc.exists()) {
            setTotalVisitors(doc.data().count)
          }
        })
        unsubscribers.current.push(() => unsubscribe());
      } catch (error) {
        console.error("Visitor tracking setup failed:", error)
      }
    }
    setupVisitorTrackingListener();
    return () => {
      unsubscribers.current.forEach((unsubscribe) => {
        if (typeof unsubscribe === "function") {
          unsubscribe()
        }
      })
      unsubscribers.current = []
    }
  }, [])

  // Setup Active Users listener - dependent on user
  useEffect(() => {
    const setupActiveUsersListener = async () => {
      if (!user) {
        return;
      }
      try {
        const { collection, query, where, onSnapshot } = await import("firebase/firestore")
        const thirtySecondsAgo = new Date(Date.now() - 30000)
        const q = query(collection(db, "users"), where("lastActive", ">", thirtySecondsAgo))
        const unsubscribe = onSnapshot(q, (snapshot) => {
          setActiveUsers(snapshot.size)
        })
        unsubscribers.current.push(() => unsubscribe());
      } catch (error) {
        console.error("Active users listener setup failed:", error)
      }
    }
    setupActiveUsersListener();
    return () => {
      unsubscribers.current.forEach((unsubscribe) => {
        if (typeof unsubscribe === "function") {
          unsubscribe()
        }
      })
      unsubscribers.current = []
    }
  }, [user])

  // Setup Message Listeners - dependent on user
  useEffect(() => {
    const setupMessageListeners = async () => {
      if (!user) {
        return;
      }
      try {
        const { collection, query, where, orderBy, onSnapshot, getDocs, limit, Timestamp } = await import("firebase/firestore")
        const now = Timestamp.now()
        const oneDayAgo = new Date(now.toDate().getTime() - 24 * 60 * 60 * 1000)
        const oneDayAgoTimestamp = Timestamp.fromDate(oneDayAgo)
        // Get old messages with limit
        const oldMessagesQuery = query(
          collection(db, "messages"),
          where("timestamp", ">=", oneDayAgoTimestamp),
          orderBy("timestamp", "asc"),
          limit(messageLimit - 1)
        )
        const snapshot = await getDocs(oldMessagesQuery)
        const oldMessages: Message[] = []
        snapshot.forEach((doc) => {
          const data = doc.data()
          oldMessages.push({
            id: doc.id,
            text: data.text,
            sender: data.sender,
            timestamp: data.timestamp,
            reactions: data.reactions || {},
          })
        })
        // Add welcome message to the beginning of the fetched messages
        const welcomeMessage: Message = {
          id: "welcome",
          text: "Welcome to Gafadi Chat, Trinitians!\n\nThis is a live chat with anonymous Trinitians. Your ID's hidden, so go wild! 😎\n\nMore features/options coming soon!\n\nPlease refresh the page if you're not seeing the latest messages. or active users are not updating.",
          sender: "ADMIN SAKSHAM",
          timestamp: null,
          isAdmin: true,
        }
        // Combine welcome message and old messages, ensuring uniqueness by ID
        const initialMessagesMap = new Map<string, Message>();
        initialMessagesMap.set(welcomeMessage.id, welcomeMessage);
        oldMessages.forEach(msg => { if (!initialMessagesMap.has(msg.id)) initialMessagesMap.set(msg.id, msg) });
        const initialMessages = Array.from(initialMessagesMap.values());
        setMessages(initialMessages);
        setIsLoading(false); // <-- Add this after setting messages
        // Listen for new messages from now onwards
        const newMessagesQuery = query(
          collection(db, "messages"),
          where("timestamp", ">=", now),
          orderBy("timestamp", "asc")
        )
        const unsubscribe = onSnapshot(newMessagesQuery, (snapshot) => {
          const newMessages: Message[] = []
          snapshot.forEach((doc) => {
            const data = doc.data()
            newMessages.push({
              id: doc.id,
              text: data.text,
              sender: data.sender,
              timestamp: data.timestamp,
              reactions: data.reactions || {},
            })
          })
          setMessages((prev) => {
            // Avoid duplicate messages
            const existingIds = new Set(prev.map((msg) => msg.id))
            return [...prev, ...newMessages.filter((msg) => !existingIds.has(msg.id))]
          })
        })
        unsubscribers.current.push(() => unsubscribe());
      } catch (error) {
        console.error("Message listener setup failed:", error)
      }
    }
    setupMessageListeners();
    return () => {
      unsubscribers.current.forEach((unsubscribe) => {
        if (typeof unsubscribe === "function") {
          unsubscribe()
        }
      })
      unsubscribers.current = []
    }
  }, [user])

  // Remove setupDemoMode and all demo/test logic for public repository

  const updateUserPresence = async (uid: string) => {
    if (!uid) {
      return;
    }
    try {
      const { doc, setDoc, serverTimestamp, increment } = await import("firebase/firestore")
      const userRef = doc(db, "users", uid)
      // Generate the anonymous ID
      const anonymousId = generateAnonymousId(uid);
      await setDoc(
        userRef,
        {
          lastActive: serverTimestamp(),
          visits: increment(1),
          anonymousId: anonymousId, // Add the anonymous ID here
        },
        { merge: true },
      )
      setUser((prevUser: any) => ({ ...prevUser, anonymousId: anonymousId }));
    } catch (error) {
      console.error("Error updating presence:", error)
    }
  }

  const sendMessage = async (text: string) => {
    if (!user || !text.trim()) {
      return false
    }
    try {
      const { collection, addDoc, serverTimestamp } = await import("firebase/firestore")
      const messageData = {
        text: text.trim(),
        sender: user.uid,
        timestamp: serverTimestamp(),
      }
      const docRef = await addDoc(collection(db, "messages"), messageData)
      return true
    } catch (error) {
      return false
    }
  }

  const addReaction = async (messageId: string, emoji: string) => {
    if (!user || !messageId) return false

    try {
      const { doc, updateDoc, arrayUnion, arrayRemove, getDoc } = await import("firebase/firestore")
      const messageRef = doc(db, "messages", messageId)
      const messageDoc = await getDoc(messageRef)

      if (messageDoc.exists()) {
        const messageData = messageDoc.data()
        const reactions = messageData.reactions || {}
        const userReactions = reactions[emoji] || []

        if (userReactions.includes(user.uid)) {
          // Remove reaction
          await updateDoc(messageRef, {
            [`reactions.${emoji}`]: arrayRemove(user.uid),
          })
        } else {
          // Add reaction
          await updateDoc(messageRef, {
            [`reactions.${emoji}`]: arrayUnion(user.uid),
          })
        }
      }
      return true
    } catch (error) {
      console.error("Reaction failed:", error)
      return false
    }
  }

  // Update presence periodically
  useEffect(() => {
    if (!user) return

    const interval = setInterval(() => {
      updateUserPresence(user.uid)
    }, 10000)

    return () => clearInterval(interval)
  }, [user])

  // Cleanup unsubscribers on component unmount
  useEffect(() => {
    return () => {
      unsubscribers.current.forEach((unsubscribe) => {
        if (typeof unsubscribe === "function") {
          unsubscribe()
        }
      })
      unsubscribers.current = []; // Clear unsubscribers
    };
  }, []); // Empty dependency array to run only on mount and unmount

  return {
    user,
    messages,
    activeUsers,
    totalVisitors,
    isLoading,
    sendMessage,
    addReaction,
    updateUserPresence,
    setUser,
    setMessages,
    setActiveUsers,
    setTotalVisitors,
  }
}
