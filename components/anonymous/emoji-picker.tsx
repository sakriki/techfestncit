"use client"

import { useEffect, useState } from "react"
import { Smile } from "lucide-react"
import { Button } from "@/components/ui/button"
import data from "@emoji-mart/data"

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void
  themeColors: {
    primary: string
    secondary: string
    text: string
    accent: string
  }
}

export function EmojiPicker({ onEmojiSelect, themeColors }: EmojiPickerProps) {
  const [showPicker, setShowPicker] = useState(false)
  const [pickerLoaded, setPickerLoaded] = useState(false)
  const [EmojiMart, setEmojiMart] = useState<any>(null)

  useEffect(() => {
    // Dynamically import Emoji Mart to avoid SSR issues
    const loadEmojiMart = async () => {
      try {
        const EmojiMartPicker = (await import("@emoji-mart/react")).Picker
        setEmojiMart(() => EmojiMartPicker)
        setPickerLoaded(true)
      } catch (error) {
        console.error("Failed to load emoji picker:", error)
      }
    }

    if (showPicker && !pickerLoaded) {
      loadEmojiMart()
    }
  }, [showPicker, pickerLoaded])

  const togglePicker = () => {
    setShowPicker(!showPicker)
  }

  const handleEmojiSelect = (emoji: any) => {
    onEmojiSelect(emoji.native)
    setShowPicker(false)
  }

  return (
    <div className="relative">
      <Button
        onClick={togglePicker}
        className="p-2 rounded-full"
        style={{ backgroundColor: themeColors.secondary, color: themeColors.text }}
      >
        <Smile className="w-5 h-5" />
      </Button>

      {showPicker && (
        <div className="absolute bottom-12 left-0 z-50 animate-in fade-in duration-200">
          {pickerLoaded && EmojiMart ? (
            <EmojiMart
              data={data}
              onEmojiSelect={handleEmojiSelect}
              theme={themeColors.primary === "#ffffff" ? "light" : "dark"}
              previewPosition="none"
              skinTonePosition="none"
              maxFrequentRows={1}
            />
          ) : (
            <div
              className="w-[348px] h-[435px] flex items-center justify-center rounded-lg"
              style={{ backgroundColor: themeColors.secondary }}
            >
              <div
                className="animate-spin rounded-full h-8 w-8 border-b-2"
                style={{ borderColor: themeColors.accent }}
              ></div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
