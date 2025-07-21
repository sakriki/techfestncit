"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { getDeviceCapabilities } from "@/lib/performance-utils"

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  placeholder?: "blur" | "empty"
  blurDataURL?: string
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  sizes,
  quality = 75,
  placeholder = "empty",
  blurDataURL
}: OptimizedImageProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [isLowEnd, setIsLowEnd] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const caps = getDeviceCapabilities()
      setIsMobile(caps.isMobile)
      setIsLowEnd(caps.isLowEnd)
    }
  }, [])

  // Optimize quality based on device
  const optimizedQuality = isLowEnd ? 60 : quality
  const optimizedSizes = sizes || (isMobile ? "100vw" : "50vw")

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes={optimizedSizes}
      quality={optimizedQuality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      loading={priority ? "eager" : "lazy"}
    />
  )
} 