"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface JumpToLatestProps {
  onJumpToLatest: () => void
  themeColors: {
    accent: string
    text: string
    primary: string
  }
}

export function JumpToLatest({ onJumpToLatest, themeColors }: JumpToLatestProps) {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const messageContainer = document.querySelector('.message-container')
      if (messageContainer) {
        const { scrollTop, scrollHeight, clientHeight } = messageContainer as HTMLElement
        const isScrolledUp = scrollHeight - scrollTop - clientHeight > 200
        setShowButton(isScrolledUp)
      }
    }

    const messageContainer = document.querySelector('.message-container')
    if (messageContainer) {
      messageContainer.addEventListener('scroll', handleScroll)
      return () => messageContainer.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (!showButton) return null

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
      <Button
        onClick={onJumpToLatest}
        className="flex items-center gap-2 px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-all duration-200"
        style={{
          backgroundColor: themeColors.accent,
          color: themeColors.text,
        }}
      >
        <ChevronDown className="w-4 h-4" />
        <span className="text-sm font-medium">Jump to Latest</span>
      </Button>
    </div>
  )
} 