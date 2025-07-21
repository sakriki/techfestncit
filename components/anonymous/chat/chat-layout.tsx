"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useFirebase } from "@/hooks/useFirebase"
import { ThemeSelector } from "@/components/anonymous/theme-selector"
import { MobileHeader } from "@/components/anonymous/mobile-header"
import { MessageContainer } from "@/components/anonymous/message-container"
import { MobileOptimizedInput } from "@/components/anonymous/mobile-optimized-input"
import { Sidebar } from "@/components/anonymous/navigation/sidebar"
import { getTheme } from "@/lib/themes"
import { JumpToLatest } from "@/components/anonymous/jump-to-latest"

interface ChatLayoutProps {
  defaultTheme?: string
}

export function ChatLayout({ defaultTheme = "dark" }: ChatLayoutProps) {
  // Firebase hook
  const { user, messages, activeUsers, totalVisitors, isLoading, isFirebaseReady, sendMessage, addReaction } =
    useFirebase()

  // Local state
  const [messageText, setMessageText] = useState("")
  const [currentTheme, setCurrentTheme] = useState(defaultTheme)
  const [typewriterText, setTypewriterText] = useState("")
  const [charCount, setCharCount] = useState(1000)
  const [lastMessageTime, setLastMessageTime] = useState(0)
  const [highlightedMessageId, setHighlightedMessageId] = useState<string | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSoundEnabled, setIsSoundEnabled] = useState(true)
  const [cooldownTime, setCooldownTime] = useState(0)

  // Theme colors
  const themeColors = getTheme(currentTheme).colors

  // Refs
  const messageRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})
  const audioRef = useRef<HTMLAudioElement>(null)
  const messageContainerRef = useRef<HTMLDivElement>(null)

  // Constants
  const MAX_MESSAGE_LENGTH = 1000
  const MESSAGE_COOLDOWN = 5000
  const phrases = ["TRINITIANS UNITE", "CHAT AWAY", "GOSSIP TIME", "VIBE CHECK", "LET'S GOOO"]

  // Typewriter effect
  useEffect(() => {
    let currentPhraseIndex = 0
    let currentCharIndex = 0
    let isDeleting = false

    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex]
      setTypewriterText(currentPhrase.substring(0, currentCharIndex))

      if (!isDeleting) {
        currentCharIndex++
        if (currentCharIndex > currentPhrase.length) {
          isDeleting = true
          setTimeout(type, 1000)
          return
        }
      } else {
        currentCharIndex--
        if (currentCharIndex < 0) {
          isDeleting = false
          currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length
        }
      }
      setTimeout(type, isDeleting ? 100 : 200)
    }

    type()
  }, [])

  // Scroll to highlighted message
  useEffect(() => {
    if (highlightedMessageId && messageRefs.current[highlightedMessageId]) {
      messageRefs.current[highlightedMessageId]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
  }, [highlightedMessageId])

  // Play notification sound for new messages
  const lastMessageIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Load sound setting from local storage
    const savedSoundSetting = localStorage.getItem('isSoundEnabled');
    if (savedSoundSetting !== null) {
      setIsSoundEnabled(JSON.parse(savedSoundSetting));
    }
  }, []); // Run only once on mount

  useEffect(() => {
    // Save sound setting to local storage whenever it changes
    localStorage.setItem('isSoundEnabled', JSON.stringify(isSoundEnabled));
  }, [isSoundEnabled]); // Run whenever isSoundEnabled changes

  useEffect(() => {
    if (messages.length > 0 && audioRef.current && isSoundEnabled) { // Check if sound is enabled
      const latestMessage = messages[messages.length - 1]
      // Only play sound for a new message that hasn't triggered the sound before
      if (latestMessage.id !== lastMessageIdRef.current && latestMessage.sender !== user?.uid && latestMessage.id !== "welcome") {
        audioRef.current.play().catch(() => {});
        lastMessageIdRef.current = latestMessage.id; // Store the ID of the message that triggered the sound
      }
    }
  }, [messages, user, isSoundEnabled]); // Add isSoundEnabled to dependency array

  const handleSendMessage = async () => {
    if (!messageText.trim() || messageText.length > MAX_MESSAGE_LENGTH || !user) return

    const now = Date.now()
    if (now - lastMessageTime < MESSAGE_COOLDOWN) {
      return // Don't show alert, just return
    }

    const success = await sendMessage(messageText)
    if (success) {
      setMessageText("")
      setCharCount(MAX_MESSAGE_LENGTH)
      setLastMessageTime(now)
      setCooldownTime(MESSAGE_COOLDOWN / 1000) // Set countdown in seconds
    } else {
      alert("Failed to send message. Please try again.")
    }
  }

  const handleInputChange = (value: string) => {
    setMessageText(value)
    setCharCount(MAX_MESSAGE_LENGTH - value.length)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const addEmoji = (emoji: string) => {
    setMessageText((prev) => prev + emoji)
  }

  const handleAddReaction = async (messageId: string, emoji: string) => {
    await addReaction(messageId, emoji)
  }

  const handleSearchResults = (results: any[], currentIndex?: number) => {
    if (results.length > 0 && typeof currentIndex === "number") {
      setHighlightedMessageId(results[currentIndex].id)
    } else {
      setHighlightedMessageId(null)
    }
  }

  const navigateToMessage = (messageId: string) => {
    setHighlightedMessageId(messageId)
  }

  // Jump to latest messages
  const jumpToLatestMessages = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
    }
  }

  // Auto-scroll to latest messages for new users
  useEffect(() => {
    if (messages.length > 0 && messageContainerRef.current) {
      // Check if user is new (no highlighted message and near top)
      const { scrollTop } = messageContainerRef.current
      if (!highlightedMessageId && scrollTop < 100) {
        // Small delay to ensure messages are rendered
        setTimeout(() => {
          if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight
          }
        }, 500)
      }
    }
  }, [messages.length, highlightedMessageId])

  // Countdown timer effect
  useEffect(() => {
    if (cooldownTime > 0) {
      const timer = setTimeout(() => {
        setCooldownTime(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [cooldownTime])

  if (isLoading) {
    return (
      <div
        className="h-screen flex items-center justify-center"
        style={{ backgroundColor: themeColors.background, color: themeColors.text }}
      >
        <div className="text-center">
          <img src="/images/gafadi-logo.webp" alt="Gafadi Chat Logo" className="w-20 h-20 mx-auto mb-4 animate-pulse" />
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: themeColors.accent }}
          ></div>
          <p>Connecting to Gafadi Chat...</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex anonymous-chat-container"
      style={{ backgroundColor: themeColors.background, color: themeColors.text }}
    >
      {/* Sidebar Navigation */}
      <Sidebar
        currentTheme={currentTheme}
        themeColors={themeColors}
        user={user}
        isSoundEnabled={isSoundEnabled}
        toggleSound={() => setIsSoundEnabled(prev => !prev)}
      />

      {/* Main Chat Area with Backdrop Blur Effect */}
      <div
        className={`flex-1 flex flex-col lg:ml-0 transition-all duration-500 ease-out ${
          isSidebarOpen ? "lg:blur-none blur-sm scale-95" : "blur-none scale-100"
        }`}
      >
        {/* Theme Selector */}
        <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />

        {/* Chat Content Container - Auto-adjusts to screen size */}
        <div className="flex-1 flex flex-col max-w-4xl w-full mx-auto p-1 md:p-4">
          {/* Header Section - Always visible */}
          <div className="flex-shrink-0">
            <MobileHeader
              typewriterText={typewriterText}
              activeUsers={activeUsers}
              totalVisitors={totalVisitors}
              messages={messages}
              onSearchResults={handleSearchResults}
              onNavigateToMessage={navigateToMessage}
              themeColors={themeColors}
              user={user}
            />
          </div>

          {/* Messages Container - Auto-adjusts size */}
          <div
            className="flex-1 rounded-lg flex flex-col overflow-hidden shadow-lg transition-all duration-300 ease-out hover:shadow-xl"
            style={{ backgroundColor: themeColors.primary, minHeight: '200px', maxHeight: '60vh' }}
          >
            <MessageContainer
              messages={messages}
              currentUserId={user?.uid || ""}
              highlightedMessageId={highlightedMessageId}
              onAddReaction={handleAddReaction}
              messageRefs={messageRefs}
              containerRef={messageContainerRef}
              themeColors={{
                ...themeColors,
                secondary: themeColors.secondary,
              }}
            />
          </div>

          {/* Input Area - Always visible */}
          <div className="flex-shrink-0 mt-2 md:mt-4">
            <MobileOptimizedInput
              messageText={messageText}
              onMessageChange={handleInputChange}
              onSendMessage={handleSendMessage}
              onKeyDown={handleKeyDown}
              onEmojiSelect={addEmoji}
              charCount={charCount}
              maxLength={MAX_MESSAGE_LENGTH}
              disabled={charCount < 0 || !messageText.trim() || cooldownTime > 0}
              cooldownTime={cooldownTime}
              messageCooldown={MESSAGE_COOLDOWN / 1000}
              themeColors={themeColors}
            />
          </div>

          {/* Jump to Latest Messages Button */}
          <JumpToLatest
            onJumpToLatest={jumpToLatestMessages}
            themeColors={themeColors}
          />
        </div>

        {/* Footer - Always at bottom */}
        <footer className="flex-shrink-0 text-center py-0.5 px-2 text-xs md:text-xs" style={{ color: themeColors.secondaryText }}>
          © 2025 Gafadi Chat - Saksham Jaiswal
        </footer>
      </div>

      {/* Audio for notifications */}
      <audio ref={audioRef} preload="auto">
        <source src="/placeholder.mp3" type="audio/mpeg" />
      </audio>
    </div>
  )
}
