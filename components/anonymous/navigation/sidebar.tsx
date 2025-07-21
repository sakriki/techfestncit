"use client"

import { useState } from "react"
import { Home, MessageCircle, Lock, Mic, Info, User, Menu, X, Bell, BellOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface SidebarProps {
  currentTheme: string
  themeColors: {
    primary: string
    secondary: string
    text: string
    accent: string
    secondaryText: string
    background: string
  }
  user: any
  isSoundEnabled: boolean
  toggleSound: () => void
}

const navigationItems = [
  { id: "home", label: "Home", icon: Home, active: false },
  { id: "anonymous", label: "Anonymous Chat", icon: MessageCircle, active: true },
  { id: "private", label: "Private Chat", icon: Lock, active: false, disabled: true },
  { id: "voice", label: "Voice Chat", icon: Mic, active: false },
  { id: "about", label: "About", icon: Info, active: false },
]

export function Sidebar({ currentTheme, themeColors, user, isSoundEnabled, toggleSound }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState("anonymous")
  const router = useRouter()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId)
    // Close mobile menu after selection
    if (window.innerWidth < 1024) {
      setIsOpen(false)
    }
    
    // Handle navigation for different buttons
    if (itemId === "home") {
      window.location.href = "https://gafadichat.com"
    } else if (itemId === "about") {
      router.push("/anonymous/aboutanonymous")
    } else if (itemId === "voice") {
      router.push("/voice")
    }
  }

  return (
    <>
      {/* Mobile Hamburger Button - Only shows when sidebar is closed */}
      {!isOpen && (
        <Button
          onClick={toggleSidebar}
          className="fixed left-4 top-4 z-50 lg:hidden touch-target p-2 rounded-full transition-all duration-500 ease-out hover:scale-110 active:scale-95 shadow-lg"
          style={{ backgroundColor: themeColors.accent }}
        >
          <Menu className="w-6 h-6 text-white transition-all duration-300 ease-out" />
        </Button>
      )}

      {/* Mobile Overlay with Backdrop Blur */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ease-out ${
            isOpen ? "backdrop-blur-md bg-black/50" : "backdrop-blur-none bg-black/0"
          }`}
          onClick={toggleSidebar}
          style={{
            backdropFilter: isOpen ? "blur(8px) saturate(180%)" : "none",
            WebkitBackdropFilter: isOpen ? "blur(8px) saturate(180%)" : "none",
          }}
        />
      )}

      {/* Sidebar with Enhanced Animations */}
      <div
        className={`fixed left-0 top-0 h-full w-80 z-50 lg:translate-x-0 lg:static lg:z-auto transition-all duration-500 ease-out shadow-2xl ${
          isOpen
            ? "translate-x-0 scale-100 opacity-100"
            : "-translate-x-full scale-95 opacity-90 lg:scale-100 lg:opacity-100"
        }`}
        style={{
          backgroundColor: themeColors.primary,
          boxShadow: isOpen ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "none",
        }}
      >
        {/* Sidebar Header with Slide Animation */}
        <div
          className={`p-6 border-b flex items-center justify-between transition-all duration-700 ease-out ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0 lg:translate-y-0 lg:opacity-100"
          }`}
          style={{
            borderColor: themeColors.secondary,
            transitionDelay: isOpen ? "200ms" : "0ms",
          }}
        >
          <div className="flex items-center gap-3">
            <img
              src="/images/gafadi-logo.webp"
              alt="Gafadi Chat Logo"
              className={`w-10 h-10 rounded-full transition-all duration-500 ease-out ${
                isOpen ? "scale-100 rotate-0" : "scale-75 rotate-12 lg:scale-100 lg:rotate-0"
              }`}
              style={{ transitionDelay: isOpen ? "300ms" : "0ms" }}
            />
            <div
              className={`transition-all duration-500 ease-out ${
                isOpen ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0 lg:translate-x-0 lg:opacity-100"
              }`}
              style={{ transitionDelay: isOpen ? "400ms" : "0ms" }}
            >
              <h2 className="text-lg font-bold" style={{ color: themeColors.accent }}>
                Gafadi Chat
              </h2>
              <p className="text-sm" style={{ color: themeColors.secondaryText }}>
                Trinity Community
              </p>
            </div>
          </div>

          {/* Close Button with Rotation Animation */}
          <Button
            onClick={toggleSidebar}
            className={`lg:hidden touch-target p-2 rounded-full transition-all duration-500 ease-out hover:scale-110 active:scale-95 ${
              isOpen ? "rotate-0 scale-100 opacity-100" : "rotate-180 scale-75 opacity-0"
            }`}
            style={{
              backgroundColor: themeColors.secondary,
              color: themeColors.text,
              transitionDelay: isOpen ? "500ms" : "0ms",
            }}
          >
            <X className="w-5 h-5 transition-all duration-300 ease-out" />
          </Button>
        </div>

        {/* Navigation Items with Staggered Animation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              const isActive = activeItem === item.id

              return (
                <li
                  key={item.id}
                  className={`transition-all duration-500 ease-out ${
                    isOpen ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0 lg:translate-x-0 lg:opacity-100"
                  }`}
                  style={{
                    transitionDelay: isOpen ? `${600 + index * 100}ms` : "0ms",
                  }}
                >
                  <button
                    onClick={() => !item.disabled && handleItemClick(item.id)}
                    disabled={item.disabled}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-out ${
                      item.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'
                    } transform ${
                      isActive ? "shadow-lg scale-105" : "hover:shadow-md"
                    }`}
                    style={{
                      backgroundColor: isActive ? themeColors.accent : "transparent",
                      color: isActive ? (themeColors.accent === "#f7b731" ? "#000000" : "#ffffff") : themeColors.text,
                      transform: isActive ? "translateX(4px)" : "translateX(0px)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive && !item.disabled) {
                        e.currentTarget.style.backgroundColor = `${themeColors.secondary}`
                        e.currentTarget.style.transform = "translateX(2px) scale(1.02)"
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive && !item.disabled) {
                        e.currentTarget.style.backgroundColor = "transparent"
                        e.currentTarget.style.transform = "translateX(0px) scale(1)"
                      }
                    }}
                  >
                    <Icon
                      className={`w-5 h-5 transition-all duration-300 ease-out ${isActive ? "scale-110" : "scale-100"}`}
                    />
                    <span className="font-medium">{item.label}</span>
                    {item.disabled && (
                      <span className="ml-auto text-xs font-bold" style={{ color: "#FFD700" }}>
                        COMING SOON
                      </span>
                    )}
                    {isActive && !item.disabled && (
                      <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse transition-all duration-300 ease-out" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* User Profile Section with Slide-up Animation */}
        <div
          className={`p-4 border-t transition-all duration-700 ease-out ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 lg:translate-y-0 lg:opacity-100"
          }`}
          style={{
            borderColor: themeColors.secondary,
            transitionDelay: isOpen ? "1000ms" : "0ms",
          }}
        >
          <div
            className="flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ease-out hover:scale-105"
            style={{ backgroundColor: themeColors.secondary }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ease-out hover:scale-110"
              style={{ backgroundColor: themeColors.accent }}
            >
              <User className="w-5 h-5" style={{ color: themeColors.accent === "#f7b731" ? "#000000" : "#ffffff" }} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate" style={{ color: themeColors.text }}>
                {user?.anonymousId || 'Anonymous User'}
              </p>
            </div>
            <Button
              onClick={toggleSound}
              className="p-2 rounded-full touch-target transition-all duration-300 ease-out hover:scale-110 active:scale-95"
              style={{
                backgroundColor: isSoundEnabled ? themeColors.accent : themeColors.secondary,
                color: isSoundEnabled ? (themeColors.accent === "#f7b731" ? "#000000" : "#ffffff") : themeColors.text,
              }}
              title={isSoundEnabled ? "Turn sound off" : "Turn sound on"}
            >
              {isSoundEnabled ? (
                <Bell className="w-5 h-5" />
              ) : (
                <BellOff className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
