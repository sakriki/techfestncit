"use client"

import { useState, useEffect, ReactNode } from "react"
import { getDeviceCapabilities } from "@/lib/performance-utils"

interface LazyLoaderProps {
  children: ReactNode
  fallback?: ReactNode
  condition?: () => boolean
  delay?: number
}

export function LazyLoader({ 
  children, 
  fallback = null, 
  condition,
  delay = 0 
}: LazyLoaderProps) {
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isLowEnd, setIsLowEnd] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const caps = getDeviceCapabilities()
    setIsLowEnd(caps.isLowEnd)

    // Check if we should load based on condition or device capabilities
    const shouldLoadContent = condition ? condition() : !caps.isLowEnd

    if (shouldLoadContent) {
      const timer = setTimeout(() => {
        setShouldLoad(true)
      }, delay)

      return () => clearTimeout(timer)
    }
  }, [condition, delay])

  // Don't load heavy content on low-end devices
  if (isLowEnd && !condition) {
    return <>{fallback}</>
  }

  return <>{shouldLoad ? children : fallback}</>
}

// Specific lazy loaders for common use cases
export function LazyAnimation({ children, fallback }: { children: ReactNode, fallback?: ReactNode }) {
  return (
    <LazyLoader 
      condition={() => {
        if (typeof window === 'undefined') return false
        const caps = getDeviceCapabilities()
        return caps.enableHeavyAnimations !== false
      }}
      fallback={fallback}
    >
      {children}
    </LazyLoader>
  )
}

export function LazyHeavyLibrary({ children, fallback }: { children: ReactNode, fallback?: ReactNode }) {
  return (
    <LazyLoader 
      condition={() => {
        if (typeof window === 'undefined') return false
        const caps = getDeviceCapabilities()
        return !caps.isLowEnd
      }}
      fallback={fallback}
      delay={1000} // Delay loading of heavy libraries
    >
      {children}
    </LazyLoader>
  )
} 