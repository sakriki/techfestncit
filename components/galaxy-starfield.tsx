"use client"

import { useRef, useEffect, useState } from "react"
import "./galaxy-starfield.css"

export default function GalaxyStarfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect mobile device (only on client side)
    const checkMobile = () => {
      if (typeof window !== 'undefined') {
        const isMobileDevice = window.innerWidth <= 768 || 
          ('ontouchstart' in window) || 
          (navigator.maxTouchPoints > 0)
        setIsMobile(isMobileDevice)
      }
    }

    checkMobile()
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkMobile)
    }

    const canvas = canvasRef.current
    if (!canvas || typeof window === 'undefined') return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.scale(dpr, dpr) // Scale all drawing operations by dpr
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    // Star class for perfectly circular stars
    class Star {
      x: number
      y: number
      size: number
      brightness: number
      speed: number
      angle: number
      color: string

      constructor(width: number, height: number) {
        // Random position within canvas
        this.x = Math.random() * width
        this.y = Math.random() * height

        // Vary sizes - small to slightly larger
        this.size = Math.random() * 1.5 + 0.5

        // Vary brightness - dimmer to brighter
        this.brightness = Math.random() * 0.7 + 0.3

        // Slow, consistent movement
        this.speed = Math.random() * 0.02 + 0.01

        // Random angle for movement direction
        this.angle = Math.random() * Math.PI * 2

        // Color variations matching the logo theme
        const colors = [
          "255, 255, 255", // White
          "255, 184, 0", // Gold
          "255, 218, 68", // Yellow
          "196, 30, 58", // Red (very subtle)
        ]

        // Make gold/yellow stars more common, red stars rare
        const colorIndex =
          Math.random() < 0.7
            ? Math.random() < 0.7
              ? 1
              : 2 // 70% chance of gold/yellow
            : Math.random() < 0.9
              ? 0
              : 3 // 90% chance of white, 10% chance of red

        this.color = colors[colorIndex]
      }

      update(deltaTime: number, width: number, height: number) {
        // Move star in its direction
        this.x += Math.cos(this.angle) * this.speed * deltaTime
        this.y += Math.sin(this.angle) * this.speed * deltaTime

        // Wrap around edges
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Define path for perfectly circular star
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        // Drawing is batched outside this method
      }
    }

    // Create stars based on screen size and device type
    const calculateStarCount = () => {
      if (typeof window === 'undefined') return 0;
      const area = window.innerWidth * window.innerHeight
      const baseDensity = 0.0001 // Stars per pixel
      const maxStars = isMobile ? 300 : 800 // Reduce stars on mobile
      return Math.min(Math.floor(area * baseDensity), maxStars)
    }

    const stars: Star[] = []
    const createStars = () => {
      if (typeof window === 'undefined') return;
      stars.length = 0 // Clear existing stars
      const starCount = calculateStarCount()
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star(window.innerWidth, window.innerHeight))
      }
    }

    createStars()

    // Animation variables
    let lastTime = 0

    // Animation loop with mobile optimization
    const animate = (timestamp: number) => {
      // Calculate delta time for smooth animation regardless of frame rate
      const deltaTime = lastTime ? timestamp - lastTime : 16.7
      lastTime = timestamp

      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)
      ctx.fillStyle = "#0A000A" // Very dark purple background to match logo theme
      ctx.fillRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)

      // Group stars by color and brightness for batched drawing
      const starsByStyle = new Map<string, Star[]>();

      // Update stars and collect them by style
      for (const star of stars) {
        star.update(deltaTime, window.innerWidth, window.innerHeight);
        const styleKey = `${star.color}-${star.brightness}`;
        if (!starsByStyle.has(styleKey)) {
          starsByStyle.set(styleKey, []);
        }
        starsByStyle.get(styleKey)!.push(star);
      }

      // Draw stars in batches by style
      for (const [styleKey, starsInStyle] of starsByStyle.entries()) {
        const [color, brightness] = styleKey.split('-');
        ctx.fillStyle = `rgba(${color}, ${brightness})`;
        ctx.beginPath();
        for (const star of starsInStyle) {
          star.draw(ctx); // This now just defines the path
        }
        ctx.fill(); // Fill all paths for this style
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    // Handle resize - recreate stars for new dimensions
    const handleResize = () => {
      updateCanvasSize()
      createStars()
    }

    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize)
    }
    animate(0)

    return () => {
      cancelAnimationFrame(animationRef.current)
      if (typeof window !== 'undefined') {
        window.removeEventListener("resize", updateCanvasSize)
        window.removeEventListener("resize", handleResize)
        window.removeEventListener('resize', checkMobile)
      }
    }
  }, [isMobile])

  return <canvas ref={canvasRef} className="galaxy-starfield" />
}
