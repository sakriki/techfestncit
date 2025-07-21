"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

interface NavigationContextType {
  activeSection: string
  setActiveSection: (section: string) => void
  isSidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] = useState("anonymous")
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <NavigationContext.Provider
      value={{
        activeSection,
        setActiveSection,
        isSidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const context = useContext(NavigationContext)
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider")
  }
  return context
}
