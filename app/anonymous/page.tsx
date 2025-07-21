"use client"

import { useState, useEffect } from "react"
import { NavigationProvider } from "@/components/anonymous/navigation/navigation-provider"
import { ChatLayout } from "@/components/anonymous/chat/chat-layout"

export default function TrinityChat() {
  // Set default theme to "gafadi" which uses the logo colors
  const [initialTheme] = useState("gafadi")

  // Preload the logo image
  useEffect(() => {
    const preloadImage = new Image()
    preloadImage.src = "/images/gafadi-logo.webp"
  }, [])

  return (
    <NavigationProvider>
      <ChatLayout defaultTheme={initialTheme} />
    </NavigationProvider>
  )
}
