import React, { useState, useRef } from 'react'
import { Menu, Home } from 'lucide-react'

export function Sidebar({
  currentTheme,
  themeColors,
  user,
  isSoundEnabled,
  toggleSound,
}: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, 300)
  }

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 rounded-full lg:hidden"
        style={{ backgroundColor: themeColors.accent }}
        aria-label="Toggle menu"
      >
        <Menu className="w-6 h-6" style={{ color: themeColors.text }} />
      </button>

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isClosing ? "animate-slide-out" : ""}`}
        style={{ backgroundColor: themeColors.primary }}
      >
        <div className="flex flex-col h-full">
          {/* Logo and Title */}
          <div className="p-4 border-b" style={{ borderColor: themeColors.secondary }}>
            <div className="flex items-center space-x-2">
              <img src="/images/gafadi-logo.webp" alt="Gafadi Chat Logo" className="w-8 h-8" />
              <span className="text-lg font-bold" style={{ color: themeColors.text }}>
                Gafadi Chat
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="https://gafadichat.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-opacity-10 transition-colors"
                  style={{ color: themeColors.text, backgroundColor: `${themeColors.accent}20` }}
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </a>
              </li>
              {/* ... rest of the navigation items ... */}
            </ul>
          </nav>

          {/* ... rest of the sidebar content ... */}
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={handleClose}
        />
      )}
    </>
  )
} 