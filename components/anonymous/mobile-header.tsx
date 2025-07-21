"use client"

import { MessageSearch } from "@/components/anonymous/message-search"

interface MobileHeaderProps {
  typewriterText: string
  activeUsers: number
  totalVisitors: number
  messages: any[]
  onSearchResults: (results: any[], currentIndex?: number) => void
  onNavigateToMessage: (messageId: string) => void
  themeColors: {
    primary: string
    secondary: string
    text: string
    accent: string
    secondaryText: string
  }
  user: any;
}

export function MobileHeader({
  typewriterText,
  activeUsers,
  totalVisitors,
  messages,
  onSearchResults,
  onNavigateToMessage,
  themeColors,
  user
}: MobileHeaderProps) {
  return (
    <div className="flex-shrink-0">
      {/* Header */}
      <header className="p-2 md:p-4 rounded-lg text-center relative" style={{ backgroundColor: themeColors.primary }}>
        {/* Search Button */}
        <div className="absolute top-2 right-12 md:top-4 md:right-24 lg:right-4">
          <MessageSearch
            messages={messages}
            onSearchResults={onSearchResults}
            onNavigateToMessage={onNavigateToMessage}
            themeColors={themeColors}
          />
        </div>

        <div className="flex items-center justify-center gap-2 md:gap-4 lg:ml-16">
          <img
            src="/images/gafadi-logo.webp"
            alt="Gafadi Chat Logo"
            className="w-8 h-8 md:w-12 md:h-12 rounded-full shadow-lg"
          />
          <div>
            <h1 className="text-lg md:text-2xl font-bold" style={{ color: themeColors.accent }}>
              GAFADI CHAT
            </h1>
            <div
              className="border-r-2 inline-block text-xs md:text-sm"
              style={{ color: themeColors.secondaryText, borderColor: themeColors.accent }}
            >
              {user?.anonymousId || 'Anonymous User'}
            </div>
          </div>
        </div>
      </header>

      {/* User Count */}
      <div className="flex justify-center gap-2 md:gap-4 mb-2 text-xs">
        <span className="px-2 py-1 rounded" style={{ backgroundColor: `${themeColors.accent}20` }}>
          <span className="text-green-500 mr-1">●</span>
          Active: {activeUsers}
        </span>
        <span className="px-2 py-1 rounded" style={{ backgroundColor: `${themeColors.accent}20` }}>
          <span className="text-red-500 mr-1">●</span>
          Total: {totalVisitors}
        </span>
      </div>
    </div>
  )
}
