"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { MessageBubble } from "@/components/anonymous/message-bubble"

interface MessageContainerProps {
  messages: any[]
  currentUserId: string
  highlightedMessageId: string | null
  onAddReaction: (messageId: string, emoji: string) => void
  messageRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>
  containerRef?: React.RefObject<HTMLDivElement>
  themeColors: {
    messageBackground: string
    userMessageBackground: string
    text: string
    secondaryText: string
    secondary: string
    accent: string
  }
}

export function MessageContainer({
  messages,
  currentUserId,
  highlightedMessageId,
  onAddReaction,
  messageRefs,
  containerRef: externalContainerRef,
  themeColors,
}: MessageContainerProps) {
  const internalContainerRef = useRef<HTMLDivElement>(null)
  const containerRef = externalContainerRef || internalContainerRef

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (containerRef.current && !highlightedMessageId) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100

      if (isNearBottom) {
        containerRef.current.scrollTop = scrollHeight
      }
    }
  }, [messages, highlightedMessageId])

  // Handle scroll events to enable page scrolling when reaching end of messages
  useEffect(() => {
    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement
      const { scrollTop, scrollHeight, clientHeight } = target
      
      // If we're at the bottom of messages and trying to scroll down more
      if (scrollHeight - scrollTop - clientHeight < 10) {
        // Allow the scroll event to bubble up to the page
        e.stopPropagation()
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="message-container flex-1 overflow-y-auto p-2 md:p-4 flex flex-col gap-2 md:gap-3 chat-scrollbar min-h-0"
      style={{
        height: "100%",
        maxHeight: "calc(100vh - 300px)",
        scrollBehavior: "smooth",
      }}
    >
      {messages.map((message) => (
        <div
          key={message.id}
          ref={(el) => (messageRefs.current[message.id] = el)}
          className={`flex ${
            message.sender === currentUserId ? 'justify-end' : message.isAdmin ? 'justify-center' : 'justify-start'
          } ${highlightedMessageId === message.id ? "ring-2 animate-pulse" : ""}`}
          style={{
            ringColor: highlightedMessageId === message.id ? themeColors.accent : "transparent",
            borderRadius: "0.5rem",
          }}
        >
          <MessageBubble
            message={message}
            isCurrentUser={message.sender === currentUserId}
            currentUserId={currentUserId}
            onAddReaction={onAddReaction}
            themeColors={themeColors}
          />
        </div>
      ))}
    </div>
  )
}
