"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CustomEmojiPicker } from "./custom-emoji-picker"

interface MobileOptimizedInputProps {
  messageText: string
  onMessageChange: (value: string) => void
  onSendMessage: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  onEmojiSelect: (emoji: string) => void
  charCount: number
  maxLength: number
  disabled?: boolean
  cooldownTime?: number
  messageCooldown?: number
  themeColors: {
    primary: string
    secondary: string
    text: string
    accent: string
    secondaryText: string
  }
}

export function MobileOptimizedInput({
  messageText,
  onMessageChange,
  onSendMessage,
  onKeyDown,
  onEmojiSelect,
  charCount,
  maxLength,
  disabled,
  cooldownTime = 0,
  messageCooldown = 5,
  themeColors,
}: MobileOptimizedInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [messageText])

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <div
      className={`relative p-2 md:p-3 rounded-lg flex items-end gap-2 transition-all duration-200 ${
        isFocused ? "ring-1" : ""
      }`}
      style={{
        backgroundColor: themeColors.secondary,
        ringColor: isFocused ? themeColors.accent : "transparent",
      }}
    >
      {/* Emoji Picker */}
      <div className="flex-shrink-0">
        <CustomEmojiPicker
          onEmojiSelect={onEmojiSelect}
          themeColors={{
            primary: themeColors.primary,
            secondary: themeColors.secondary,
            text: themeColors.text,
            accent: themeColors.accent,
          }}
        />
      </div>

      {/* Text Input */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={messageText}
          onChange={(e) => onMessageChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Type a message..."
          className="w-full border-none resize-none bg-transparent outline-none text-sm md:text-base leading-tight py-2 px-1"
          style={{
            color: themeColors.text,
            minHeight: "40px",
            maxHeight: "120px",
          }}
          rows={1}
        />

        {/* Character Count */}
        <span
          className="absolute bottom-0 right-1 text-xs pointer-events-none"
          style={{
            color: charCount < 100 ? (charCount < 0 ? "red" : "orange") : themeColors.secondaryText,
          }}
        >
          {charCount}
        </span>
      </div>

      {/* Send Button */}
      <div className="flex-shrink-0">
        <Button
          onClick={onSendMessage}
          disabled={disabled}
          className="touch-target p-2 md:p-3 rounded-full hover:scale-105 transition-transform active:scale-95 relative"
          style={{ 
            backgroundColor: cooldownTime > 0 ? themeColors.secondaryText : themeColors.accent,
            opacity: cooldownTime > 0 ? 0.6 : 1
          }}
        >
          {cooldownTime > 0 ? (
            <span 
              className="text-xs font-bold"
              style={{ color: themeColors.text }}
            >
              {cooldownTime}
            </span>
          ) : (
            <Send className="w-4 h-4 md:w-5 md:h-5" />
          )}
        </Button>
      </div>
    </div>
  )
}
