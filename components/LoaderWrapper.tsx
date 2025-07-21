"use client"

import { useState, useEffect } from "react"
import { Loader } from "./Loader"
import { getDeviceCapabilities } from "@/lib/performance-utils"

export function LoaderWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get device capabilities for performance optimization (only on client side)
    let loadingTime = 1500; // Default loading time
    
    if (typeof window !== 'undefined') {
      const deviceCaps = getDeviceCapabilities()
      loadingTime = deviceCaps.isMobile ? 800 : 1500
    }
    
    // Simulate loading time (you can adjust or remove this timeout)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, loadingTime)

    // Optional: Hide loader when all assets are loaded
    if (typeof window !== 'undefined') {
      const handleLoad = () => {
        clearTimeout(timer)
        setIsLoading(false)
      }
      
      if (document.readyState === 'complete') {
        handleLoad()
      } else {
        window.addEventListener('load', handleLoad)
        return () => window.removeEventListener('load', handleLoad)
      }
    }

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {children}
      <Loader show={isLoading} />
    </>
  )
}
