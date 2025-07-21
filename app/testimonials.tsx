"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface TestimonialsProps {
  quotes: string[]
}

export default function Testimonials({ quotes }: TestimonialsProps) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [quotes.length])

  return (
    <div className="relative h-32">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center text-center"
        >
          <p className="text-xl md:text-2xl font-light italic text-gray-300">"{quotes[current]}"</p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
