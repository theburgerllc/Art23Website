'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import TextModeToggle from './TextModeToggle'

const navItems = [
  { href: '/', label: 'HOME', icon: '🏠' },
  { href: '/about', label: 'ABOUT', icon: '👤' },
  { href: '/exhibitions', label: 'PROJECTS', icon: '💼' },
  { href: '/blog', label: 'BLOG', icon: '📝' },
  { href: '/contact', label: 'CONTACT', icon: '✉️' },
]

interface CircularNavbarProps {
  className?: string
}

export default function CircularNavbar({ className = '' }: CircularNavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  const toggleNavigation = () => {
    setIsOpen(!isOpen)
  }

  const closeNavigation = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Fixed Circular Navigation Button */}
      <motion.div
        className={`fixed top-6 right-6 z-[9999] ${className}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <motion.button
          onClick={toggleNavigation}
          className={`
            relative w-16 h-16 rounded-full flex items-center justify-center
            bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/80
            shadow-lg hover:shadow-xl transition-all duration-300
            border-2 border-white/20 backdrop-blur-sm
            ${scrolled ? 'shadow-2xl scale-95' : ''}
            ${isOpen ? 'scale-110' : 'hover:scale-105'}
          `}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
        >
          <motion.div
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="relative"
          >
            {isOpen ? (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="text-white text-lg"
              >
                ⚡
              </motion.div>
            )}
          </motion.div>

          {/* Ripple effect */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-white/30"
            animate={isOpen ? { scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] } : {}}
            transition={{ duration: 1, repeat: isOpen ? Infinity : 0 }}
          />
        </motion.button>
      </motion.div>

      {/* Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998]"
            onClick={closeNavigation}
          />
        )}
      </AnimatePresence>

      {/* Circular Navigation Items */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed top-6 right-6 z-[9999] pointer-events-none">
            {navItems.map((item, index) => {
              const angle = (index * 72) - 90 // 72 degrees between items, starting from top
              const radius = 120
              const x = Math.cos((angle * Math.PI) / 180) * radius
              const y = Math.sin((angle * Math.PI) / 180) * radius
              const isActive = pathname === item.href

              return (
                <motion.div
                  key={item.href}
                  initial={{
                    opacity: 0,
                    scale: 0,
                    x: 32, // Center position (half of button width)
                    y: 32
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: x + 32,
                    y: y + 32
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                    x: 32,
                    y: 32
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    type: 'spring',
                    stiffness: 200,
                    damping: 20
                  }}
                  className="absolute pointer-events-auto"
                  style={{ transformOrigin: 'center' }}
                >
                  <Link href={item.href} onClick={closeNavigation}>
                    <motion.div
                      className={`
                        w-16 h-16 rounded-full flex flex-col items-center justify-center
                        bg-white/95 backdrop-blur-sm shadow-lg hover:shadow-xl
                        border border-gray-200/50 transition-all duration-300
                        ${isActive
                          ? 'bg-[var(--accent)] text-white shadow-[var(--accent)]/30'
                          : 'hover:bg-[var(--accent)] hover:text-white text-gray-700'
                        }
                      `}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <span className="text-lg mb-1">{item.icon}</span>
                      <span className="text-[10px] font-bold tracking-wide">
                        {item.label}
                      </span>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}

            {/* Settings Button */}
            <motion.div
              initial={{
                opacity: 0,
                scale: 0,
                x: 32,
                y: 32
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 32 + 150, // Position to the right
                y: 32
              }}
              exit={{
                opacity: 0,
                scale: 0,
                x: 32,
                y: 32
              }}
              transition={{
                duration: 0.4,
                delay: navItems.length * 0.1,
                type: 'spring',
                stiffness: 200,
                damping: 20
              }}
              className="absolute pointer-events-auto"
            >
              <motion.div
                className="
                  w-20 h-16 rounded-2xl flex items-center justify-center gap-2
                  bg-white/95 backdrop-blur-sm shadow-lg
                  border border-gray-200/50
                "
                whileHover={{ scale: 1.05 }}
              >
                <ThemeToggle />
                <TextModeToggle />
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Logo/Brand in center when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] pointer-events-none"
          >
            <div className="
              w-32 h-32 rounded-full flex items-center justify-center
              bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/80
              shadow-2xl border-4 border-white/30 backdrop-blur-sm
            ">
              <div className="text-center text-white">
                <div className="text-3xl mb-2">🎨</div>
                <div className="text-sm font-bold tracking-wider">
                  GALLERY<br/>23
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}