"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

interface MessageReactionsProps {
  reactions: { [emoji: string]: string[] }
  currentUserId: string
  onAddReaction: (emoji: string) => void
  themeColors: {
    secondary: string
    text: string
    accent: string
  }
}

const quickReactions = ["👍", "❤️", "😂", "😮", "😢", "😡"]

export function MessageReactions({ reactions, currentUserId, onAddReaction, themeColors }: MessageReactionsProps) {
  const [showQuickReactions, setShowQuickReactions] = useState(false)

  const handleReactionClick = (emoji: string) => {
    onAddReaction(emoji)
    setShowQuickReactions(false)
  }

  return (
    <div className="relative">
      {/* Existing Reactions - More compact */}
      <div className="flex flex-wrap gap-0.5">
        {Object.entries(reactions || {}).map(
          ([emoji, userIds]) =>
            userIds.length > 0 && (
              <button
                key={emoji}
                onClick={() => onAddReaction(emoji)}
                className={`flex items-center gap-0.5 px-1 py-0.5 rounded-full text-xs transition-all hover:scale-105 ${
                  userIds.includes(currentUserId) ? "ring-1" : ""
                }`}
                style={{
                  backgroundColor: themeColors.secondary,
                  color: themeColors.text,
                  ringColor: userIds.includes(currentUserId) ? themeColors.accent : "transparent",
                }}
              >
                <span className="text-xs">{emoji}</span>
                <span className="text-xs">{userIds.length}</span>
              </button>
            ),
        )}

        {/* Add Reaction Button - Smaller */}
        <button
          onClick={() => setShowQuickReactions(!showQuickReactions)}
          className="flex items-center justify-center w-4 h-4 rounded-full text-xs hover:scale-110 transition-transform"
          style={{ backgroundColor: themeColors.secondary, color: themeColors.text }}
        >
          <Plus className="w-2 h-2" />
        </button>
      </div>

      {/* Quick Reactions Popup */}
      {showQuickReactions && (
        <div
          className="absolute bottom-6 left-0 z-50 flex gap-1 p-1 rounded-lg shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-200"
          style={{ backgroundColor: themeColors.secondary }}
        >
          {quickReactions.map((emoji) => (
            <button
              key={emoji}
              onClick={() => handleReactionClick(emoji)}
              className="text-base p-1 rounded hover:scale-125 transition-transform"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
