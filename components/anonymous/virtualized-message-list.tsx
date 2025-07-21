"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { FixedSizeList as List } from "react-window"
import AutoSizer from "react-virtualized-auto-sizer"
import { MessageBubble } from "./message-bubble"
import type { Message } from "@/hooks/useFirebase"

interface VirtualizedMessageListProps {
  messages: Message[]
  currentUserId: string
  onAddReaction: (messageId: string, emoji: string) => void
  themeColors: {
    messageBackground: string
    userMessageBackground: string
    text: string
    secondaryText: string
    secondary: string
    accent: string
  }
}

export function VirtualizedMessageList({
  messages,
  currentUserId,
  onAddReaction,
  themeColors,
}: VirtualizedMessageListProps) {
  const listRef = useRef<any>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    if (listRef.current && messages.length > 0) {
      listRef.current.scrollToItem(messages.length - 1, "end")
    }
  }, [messages.length])

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const message = messages[index]
    return (
      <div style={style} className="px-2 py-1">
        <MessageBubble
          message={message}
          isCurrentUser={message.sender === currentUserId}
          currentUserId={currentUserId}
          onAddReaction={onAddReaction}
          themeColors={themeColors}
        />
      </div>
    )
  }

  return (
    <div className="flex-1 h-full">
      <AutoSizer>
        {({ height, width }) => (
          <List
            ref={listRef}
            height={height}
            width={width}
            itemCount={messages.length}
            itemSize={80} // Adjust based on average message height
            overscanCount={5}
            initialScrollOffset={messages.length * 80} // Scroll to bottom initially
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  )
}
