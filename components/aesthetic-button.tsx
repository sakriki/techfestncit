"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import "./aesthetic-button.css"

interface AestheticButtonProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export default function AestheticButton({ onClick, children, className = "" }: AestheticButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.button
      className={`aesthetic-button ${className}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.1, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.1, ease: [0.1, 0, 0.2, 1] }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1, ease: [0.1, 0, 0.2, 1] }
      }}
    >
      <span className="button-content">{children}</span>
      <div className={`button-glow ${isHovered ? "active" : ""}`}></div>
      <div className={`button-border ${isHovered ? "active" : ""}`}></div>
    </motion.button>
  )
}
