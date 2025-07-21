"use client"

import { useState } from "react"
import { Smile, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CustomEmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  themeColors: {
    primary: string
    secondary: string
    text: string
    accent: string
  }
}

const emojiCategories = {
  Smileys: [
    "😀",
    "😃",
    "😄",
    "😁",
    "😆",
    "😅",
    "😂",
    "🤣",
    "😊",
    "😇",
    "🙂",
    "🙃",
    "😉",
    "😌",
    "😍",
    "🥰",
    "😘",
    "😗",
    "😙",
    "😚",
  ],
  Gestures: [
    "👍",
    "👎",
    "👌",
    "✌️",
    "🤞",
    "🤟",
    "🤘",
    "🤙",
    "👈",
    "👉",
    "👆",
    "🖕",
    "👇",
    "☝️",
    "👋",
    "🤚",
    "🖐️",
    "✋",
    "🖖",
    "👏",
  ],
  Hearts: [
    "❤️",
    "🧡",
    "💛",
    "💚",
    "💙",
    "💜",
    "🖤",
    "🤍",
    "🤎",
    "💔",
    "❣️",
    "💕",
    "💞",
    "💓",
    "💗",
    "💖",
    "💘",
    "💝",
    "💟",
  ],
  Objects: [
    "🎉",
    "🎊",
    "🎈",
    "🎁",
    "🏆",
    "🥇",
    "🥈",
    "🥉",
    "⚽",
    "🏀",
    "🏈",
    "⚾",
    "🎾",
    "🏐",
    "🏉",
    "🎱",
    "🏓",
    "🏸",
    "🥅",
    "🎯",
  ],
  Food: [
    "🍎",
    "🍊",
    "🍋",
    "🍌",
    "🍉",
    "🍇",
    "🍓",
    "🍈",
    "🍒",
    "🍑",
    "🥭",
    "🍍",
    "🥥",
    "🥝",
    "🍅",
    "🍆",
    "🥑",
    "🥦",
    "🥬",
    "🥒",
  ],
}

export function CustomEmojiPicker({ onEmojiSelect, themeColors }: CustomEmojiPickerProps) {
  const [showPicker, setShowPicker] = useState(false)
  const [activeCategory, setActiveCategory] = useState("Smileys")

  const togglePicker = () => {
    setShowPicker(!showPicker)
  }

  const handleEmojiSelect = (emoji: string) => {
    onEmojiSelect(emoji)
    setShowPicker(false)
  }

  return (
    <div className="relative">
      <Button
        onClick={togglePicker}
        className="touch-target p-2 md:p-3 rounded-full hover:scale-105 transition-transform active:scale-95"
        style={{ backgroundColor: themeColors.secondary, color: themeColors.text }}
      >
        <Smile className="w-5 h-5 md:w-6 md:h-6" />
      </Button>

      {showPicker && (
        <div
          className="absolute bottom-12 left-0 z-50 w-72 md:w-80 rounded-lg shadow-xl animate-in fade-in slide-in-from-bottom-5 duration-200 overflow-hidden"
          style={{
            backgroundColor: themeColors.primary,
            border: `1px solid ${themeColors.accent}`,
          }}
        >
          {/* Category Tabs */}
          <div className="flex border-b" style={{ borderColor: themeColors.secondary }}>
            {Object.keys(emojiCategories).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-1 p-2 text-xs font-medium transition-colors ${
                  activeCategory === category ? "border-b-2" : ""
                }`}
                style={{
                  color: activeCategory === category ? themeColors.accent : themeColors.text,
                  borderColor: activeCategory === category ? themeColors.accent : "transparent",
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Emoji Grid - Fixed height, no scrolling */}
          <div className="p-3 h-48 flex flex-col justify-center">
            <div className="grid grid-cols-5 gap-2 place-items-center">
              {emojiCategories[activeCategory as keyof typeof emojiCategories].slice(0, 20).map((emoji, index) => (
                <button
                  key={index}
                  onClick={() => handleEmojiSelect(emoji)}
                  className="text-xl md:text-2xl p-2 rounded-full hover:scale-125 transition-transform duration-150 touch-target flex items-center justify-center"
                  style={{ backgroundColor: "transparent", width: "40px", height: "40px" }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Close button - Moved to bottom left */}
          <div className="absolute bottom-2 left-2">
            <button
              onClick={() => setShowPicker(false)}
              className="text-lg font-bold w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                color: themeColors.text,
                backgroundColor: themeColors.secondary,
                boxShadow: `0 2px 8px rgba(0,0,0,0.2)`,
              }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
