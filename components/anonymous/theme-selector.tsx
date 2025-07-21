"use client"

import { useState } from "react"
import { Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { themes } from "@/lib/themes"

interface ThemeSelectorProps {
  currentTheme: string
  onThemeChange: (themeId: string) => void
}

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleThemeSelector = () => {
    setIsOpen(!isOpen)
  }

  const handleThemeSelect = (themeId: string) => {
    onThemeChange(themeId)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        onClick={toggleThemeSelector}
        className="fixed right-4 top-4 z-40 bg-opacity-80 backdrop-blur-sm p-2 lg:z-50"
        style={{ backgroundColor: themes.find((t) => t.id === currentTheme)?.colors.accent }}
      >
        <Palette
          className="w-5 h-5"
          style={{
            color: themes.find((t) => t.id === currentTheme)?.colors.accent === "#f7b731" ? "#000000" : "#ffffff",
          }}
        />
      </Button>

      {isOpen && (
        <div
          className="fixed right-4 top-16 z-40 rounded-lg shadow-lg p-3 w-64 backdrop-blur-md animate-in slide-in-from-top-5 duration-200 lg:z-50"
          style={{
            backgroundColor: themes.find((t) => t.id === currentTheme)?.colors.primary,
            borderColor: themes.find((t) => t.id === currentTheme)?.colors.accent,
            borderWidth: "1px",
          }}
        >
          <h3
            className="font-medium mb-2 text-center"
            style={{ color: themes.find((t) => t.id === currentTheme)?.colors.text }}
          >
            Choose Theme
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                className={`p-2 rounded-md transition-all duration-200 flex flex-col items-center ${
                  currentTheme === theme.id ? "ring-2 scale-105" : "hover:scale-105"
                }`}
                style={{
                  backgroundColor: theme.colors.secondary,
                  color: theme.colors.text,
                  ringColor: theme.colors.accent,
                }}
              >
                <div className="w-full h-12 rounded-md mb-1 flex overflow-hidden">
                  <div className="w-1/2 h-full" style={{ backgroundColor: theme.colors.messageBackground }}></div>
                  <div className="w-1/2 h-full" style={{ backgroundColor: theme.colors.userMessageBackground }}></div>
                </div>
                <span className="text-xs font-medium">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
