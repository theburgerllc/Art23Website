'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface MotionFadeProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function MotionFade({ 
  children, 
  delay = 0,
  className = ''
}: MotionFadeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}