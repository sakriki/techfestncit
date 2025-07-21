"use client"

import { useRef, useEffect, useState, useCallback } from "react"

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const lastMousePositionRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>(0)
  const particlesRef = useRef<any[]>([])
  const hoverIntensityRef = useRef(0)
  const cursorActiveRef = useRef(false)

  // Handle mouse movement without causing re-renders
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mousePositionRef.current = { x: e.clientX, y: e.clientY }
    lastMousePositionRef.current = { x: e.clientX, y: e.clientY }
    cursorActiveRef.current = true
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      e.preventDefault()
      mousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      lastMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      cursorActiveRef.current = true
    }
  }, [])

  const handleMouseLeaveCanvas = useCallback(() => {
    // Don't set cursorActiveRef to false immediately
    // This allows particles to maintain their positions
    // We'll just keep the last mouse position
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setIsMobile(window.innerWidth < 768)
    }

    updateCanvasSize()

    // Enhanced particle properties
    let particles: {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      originalSize: number
      color: string
      scatteredColor: string
      velocity: { x: number; y: number }
      life: number
      isRightSide: boolean
      opacity: number
      targetOpacity: number
      rotation: number
      rotationSpeed: number
      hueShift: number
      lastPosition: { x: number; y: number }
      returning: boolean
      returnDelay: number
    }[] = []

    particlesRef.current = particles

    let textImageData: ImageData | null = null

    function createTextImage() {
      if (!ctx || !canvas) return 0

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "white"
      ctx.save()

      const logoHeight = isMobile ? 80 : 160 // Increased text size

      // Draw GAFADI CHAT text centered
      ctx.font = `bold ${logoHeight}px Arial`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      const fullText = "GAFADI CHAT"
      const textWidth = ctx.measureText(fullText).width

      ctx.fillText(fullText, canvas.width / 2, canvas.height / 2)

      ctx.restore()

      textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      return textWidth / logoHeight
    }

    function createParticle() {
      if (!ctx || !canvas || !textImageData) return null

      const data = textImageData.data

      for (let attempt = 0; attempt < 100; attempt++) {
        const x = Math.floor(Math.random() * canvas.width)
        const y = Math.floor(Math.random() * canvas.height)

        if (data[(y * canvas.width + x) * 4 + 3] > 128) {
          // Determine if particle is in left half (GAFADI) or right half (CHAT)
          const isRightSide = x > canvas.width / 2
          const size = Math.random() * 2 + 0.8

          return {
            x: x,
            y: y,
            baseX: x,
            baseY: y,
            size: size,
            originalSize: size,
            color: "white",
            scatteredColor: isRightSide ? "#FF5500" : "#4CAF50",
            velocity: { x: 0, y: 0 },
            life: Math.random() * 100 + 50,
            isRightSide,
            opacity: 1,
            targetOpacity: 1,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            hueShift: Math.random() * 20 - 10,
            lastPosition: { x, y },
            returning: false,
            returnDelay: 0,
          }
        }
      }

      return null
    }

    function createInitialParticles() {
      const baseParticleCount = 7000
      const particleCount = Math.floor(baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)))
      for (let i = 0; i < particleCount; i++) {
        const particle = createParticle()
        if (particle) particles.push(particle)
      }
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Smoothly transition hover intensity
      const targetIntensity = isHovering ? 1 : 0
      hoverIntensityRef.current += (targetIntensity - hoverIntensityRef.current) * 0.05
      const hoverIntensity = hoverIntensityRef.current

      // Instead of using cursorActiveRef, we'll always use the last known position
      // and only update positions when there's actual hover interaction
      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const isInteracting = isHovering && hoverIntensity > 0.1

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (isInteracting) {
          // Only apply hover effects when actively interacting
          const dx = p.x - mouseX
          const dy = p.y - mouseY
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 70 // Reduced from 100px to 70px for more precise interaction

          if (distance < maxDistance) {
            // Reduced force for more subtle effect
            const force = (1 - distance / maxDistance) * 8 * hoverIntensity // Reduced from 12 to 8
            const angle = Math.atan2(dy, dx)

            // Reduced acceleration values for more controlled movement
            p.velocity.x += Math.cos(angle) * force * 0.1 // Reduced from 0.12
            p.velocity.y += Math.sin(angle) * force * 0.1

            // Size variation based on velocity (minimal)
            const speed = Math.sqrt(p.velocity.x * p.velocity.x + p.velocity.y * p.velocity.y)
            p.size = p.originalSize * (1 + speed * 0.01) // Reduced from 0.02

            p.targetOpacity = 0.8 + (distance / maxDistance) * 0.2
            p.color = p.scatteredColor

            // Reduced rotation for subtler effect
            p.rotationSpeed = force * 0.0005 * (Math.random() - 0.5) // Reduced from 0.0008
          } else {
            // Particles far from mouse maintain their current state
            // but slowly reduce velocity
            p.velocity.x *= 0.98
            p.velocity.y *= 0.98
            p.size += (p.originalSize - p.size) * 0.05
            p.color = "white"
          }
        } else {
          // When not hovering, particles maintain their current positions
          // with very minimal movement back toward base position
          if (!p.returning) {
            // Only start returning if we're not already
            p.returning = true
            p.returnDelay = Math.random() * 100 // Stagger the return
          }

          if (p.returnDelay > 0) {
            p.returnDelay--
          } else {
            // Very gentle return to original position
            const dx = p.baseX - p.x
            const dy = p.baseY - p.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist > 1) {
              p.velocity.x += dx * 0.002 // Very slow return
              p.velocity.y += dy * 0.002
            } else {
              // If we're close enough, just stop
              p.velocity.x *= 0.9
              p.velocity.y *= 0.9
            }
          }

          p.velocity.x *= 0.95
          p.velocity.y *= 0.95
          p.size += (p.originalSize - p.size) * 0.05
          p.targetOpacity = 1
          p.color = "white"
          p.rotationSpeed *= 0.95
        }

        // Apply velocity with damping
        p.x += p.velocity.x
        p.y += p.velocity.y

        // Apply rotation
        p.rotation += p.rotationSpeed

        // Smooth opacity transition
        p.opacity += (p.targetOpacity - p.opacity) * 0.1

        // Draw particle with rotation and enhanced visual effects
        ctx.save()
        ctx.globalAlpha = p.opacity

        // Use different rendering techniques based on hover state
        if (hoverIntensity > 0.3 && p.color !== "white") {
          // Enhanced rendering for scattered particles
          ctx.shadowColor = p.color
          ctx.shadowBlur = 2 * hoverIntensity // Reduced from 3

          // Apply color variations
          if (p.isRightSide) {
            ctx.fillStyle = `hsl(25, 100%, ${50 + p.hueShift}%)`
          } else {
            ctx.fillStyle = `hsl(120, 100%, ${40 + p.hueShift}%)`
          }

          // Draw rotated rectangle for more interesting shape
          ctx.translate(p.x + p.size / 2, p.y + p.size / 2)
          ctx.rotate(p.rotation)
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        } else {
          // Simple rendering for default state
          ctx.fillStyle = p.color
          ctx.fillRect(p.x, p.y, p.size, p.size)
        }

        ctx.restore()

        // Particle lifecycle with smoother transitions
        p.life--
        if (p.life <= 0) {
          const newParticle = createParticle()
          if (newParticle) {
            // Smooth transition for new particles
            newParticle.opacity = 0
            particles[i] = newParticle
          } else {
            particles.splice(i, 1)
            i--
          }
        }
      }

      // Maintain particle count with improved distribution
      const baseParticleCount = 8000
      const targetParticleCount = Math.floor(
        baseParticleCount * Math.sqrt((canvas.width * canvas.height) / (1920 * 1080)),
      )

      while (particles.length < targetParticleCount) {
        const newParticle = createParticle()
        if (newParticle) {
          newParticle.opacity = 0 // Start invisible for smooth appearance
          particles.push(newParticle)
        }
      }

      // Draw glowing text overlay
      drawGlowingText()

      animationRef.current = requestAnimationFrame(animate)
    }

    // Function to draw glowing text overlay
    function drawGlowingText() {
      if (!ctx || !canvas) return

      const fontSize = isMobile ? 80 : 160 // Larger text size

      // Draw glowing text
      ctx.save()

      // First draw the glow
      ctx.font = `bold ${fontSize}px Arial`
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      // Create gradient for the glow
      const gradient = ctx.createLinearGradient(
        canvas.width / 2 - 200,
        canvas.height / 2,
        canvas.width / 2 + 200,
        canvas.height / 2,
      )

      gradient.addColorStop(0, "#4CAF50")
      gradient.addColorStop(0.5, "#FFFFFF")
      gradient.addColorStop(1, "#FF5500")

      // Draw multiple layers of text for glow effect
      for (let i = 8; i > 0; i--) {
        ctx.shadowColor = i < 4 ? "#4CAF50" : "#FF5500"
        ctx.shadowBlur = 20 - i * 2
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0
        ctx.fillStyle = i === 1 ? gradient : `rgba(255, 255, 255, ${0.1 * i})`
        ctx.fillText("GAFADI CHAT", canvas.width / 2, canvas.height / 2)
      }

      // Draw the main text
      ctx.shadowBlur = 0
      ctx.fillStyle = gradient
      ctx.fillText("GAFADI CHAT", canvas.width / 2, canvas.height / 2)

      ctx.restore()
    }

    const scale = createTextImage()
    createInitialParticles()
    animate()

    const handleResize = () => {
      updateCanvasSize()
      const newScale = createTextImage()
      particles = []
      createInitialParticles()
    }

    // Add event listeners using the memoized handlers
    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("mouseleave", handleMouseLeaveCanvas)

    return () => {
      window.removeEventListener("resize", handleResize)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("touchmove", handleTouchMove)
      canvas.removeEventListener("mouseleave", handleMouseLeaveCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [isHovering, handleMouseMove, handleTouchMove, handleMouseLeaveCanvas])

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-dvh flex flex-col items-center justify-center bg-black"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full absolute top-0 left-0 touch-none"
        aria-label="Interactive particle effect with GAFADI CHAT text"
      />
      <div className="absolute bottom-[100px] text-center z-10">
        <p className="font-mono text-gray-400 text-xs sm:text-base md:text-sm">
          Explore GAFADI CHAT
          <br />
          <span className="text-gray-500 text-xs mt-4 inline-block relative">
            (Scroll down)
            <span className="bounce-arrow absolute left-1/2 -translate-x-1/2 mt-2">↓</span>
          </span>
        </p>
        <style jsx>{`
          .bounce-arrow {
            animation: bounce 1.5s infinite;
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0) translateX(-50%);
            }
            40% {
              transform: translateY(5px) translateX(-50%);
            }
            60% {
              transform: translateY(3px) translateX(-50%);
            }
          }
        `}</style>
      </div>
    </div>
  )
}
