"use client"

import { useState } from "react"
import { Search, X, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface MessageSearchProps {
  messages: any[]
  onSearchResults: (results: any[], currentIndex?: number) => void
  onNavigateToMessage: (messageId: string) => void
  themeColors: {
    primary: string
    secondary: string
    text: string
    accent: string
  }
}

export function MessageSearch({ messages, onSearchResults, onNavigateToMessage, themeColors }: MessageSearchProps) {
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentResultIndex, setCurrentResultIndex] = useState(0)
  const [searchResults, setSearchResults] = useState<any[]>([])

  const handleSearch = (query: string) => {
    setSearchQuery(query)

    if (!query.trim()) {
      setSearchResults([])
      onSearchResults(messages)
      return
    }

    const filteredMessages = messages.filter(
      (message) =>
        message.text.toLowerCase().includes(query.toLowerCase()) ||
        message.sender.toLowerCase().includes(query.toLowerCase()),
    )

    setSearchResults(filteredMessages)
    setCurrentResultIndex(0)
    onSearchResults(filteredMessages, 0)

    // Navigate to first result if available
    if (filteredMessages.length > 0) {
      onNavigateToMessage(filteredMessages[0].id)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    setSearchResults([])
    onSearchResults(messages)
    setShowSearch(false)
  }

  const navigateToResult = (direction: "up" | "down") => {
    if (searchResults.length === 0) return

    let newIndex = currentResultIndex
    if (direction === "up") {
      newIndex = (currentResultIndex - 1 + searchResults.length) % searchResults.length
    } else {
      newIndex = (currentResultIndex + 1) % searchResults.length
    }

    setCurrentResultIndex(newIndex)
    onSearchResults(searchResults, newIndex)
    onNavigateToMessage(searchResults[newIndex].id)
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setShowSearch(!showSearch)}
        className="touch-target p-2 md:p-3 rounded-full hover:scale-105 transition-transform active:scale-95"
        style={{ backgroundColor: themeColors.secondary, color: themeColors.text }}
      >
        <Search className="w-5 h-5 md:w-6 md:h-6" />
      </Button>

      {showSearch && (
        <div
          className="absolute top-12 right-0 z-50 w-72 md:w-80 p-3 rounded-lg shadow-xl animate-in fade-in slide-in-from-top-5 duration-200"
          style={{ backgroundColor: themeColors.primary, border: `1px solid ${themeColors.accent}` }}
        >
          <div className="flex items-center gap-2">
            <Input
              type="text"
              placeholder="Search messages..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 border-none"
              style={{
                backgroundColor: themeColors.secondary,
                color: themeColors.text,
              }}
              autoFocus
            />
            <Button
              onClick={clearSearch}
              className="p-2 rounded-full"
              style={{ backgroundColor: themeColors.secondary, color: themeColors.text }}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {searchQuery && (
            <div className="mt-2 flex items-center justify-between">
              <div className="text-sm" style={{ color: themeColors.text }}>
                {searchResults.length > 0
                  ? `${currentResultIndex + 1} of ${searchResults.length} results`
                  : "No results found"}
              </div>

              {searchResults.length > 1 && (
                <div className="flex gap-1">
                  <Button
                    onClick={() => navigateToResult("up")}
                    className="touch-target p-2 rounded-full"
                    style={{ backgroundColor: themeColors.secondary, color: themeColors.text }}
                  >
                    <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
                  </Button>
                  <Button
                    onClick={() => navigateToResult("down")}
                    className="p-1 rounded-full"
                    style={{ backgroundColor: themeColors.secondary, color: themeColors.text }}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
