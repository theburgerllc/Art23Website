'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
import TextModeToggle from './TextModeToggle'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/exhibitions', label: 'Exhibitions' },
  { href: '/artists', label: 'Artists' },
  { href: '/blog', label: 'Blog' },
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

interface EnhancedHeaderProps {
  variant?: 'default' | 'minimal' | 'rounded'
  showCircularLogo?: boolean
}

export default function EnhancedHeader({
  variant = 'rounded',
  showCircularLogo = true
}: EnhancedHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`
        sticky top-0 z-40 transition-all duration-300
        ${scrolled
          ? 'backdrop-blur-xl bg-[var(--background)]/95 shadow-lg border-b border-[var(--border)]/30'
          : 'backdrop-blur-lg bg-[var(--background)]/90 border-b border-[var(--border)]/20'
        }
      `}
    >
      <nav className="container py-4 flex items-center justify-between">
        {/* Logo Section with Circular Design */}
        <Link href="/" className="flex items-center gap-4 group">
          {showCircularLogo && (
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="
                w-12 h-12 rounded-full flex items-center justify-center
                bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/80
                shadow-lg border-2 border-white/20 backdrop-blur-sm
                group-hover:shadow-xl group-hover:shadow-[var(--accent)]/20
                transition-all duration-300
              "
            >
              <span className="text-white text-lg font-bold">🎨</span>
            </motion.div>
          )}

          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col"
          >
            {/* Brand Text */}
            <div className="hidden sm:block">
              <div className="text-xl font-bold text-[var(--foreground)] tracking-tight">
                Gallery<span className="text-[var(--accent)]">23</span>
              </div>
              <div className="text-xs text-[var(--muted)] font-medium tracking-wider">
                CONTEMPORARY ART SPACE
              </div>
            </div>

            {/* Mobile Brand */}
            <div className="sm:hidden text-lg font-bold text-[var(--foreground)]">
              G<span className="text-[var(--accent)]">23</span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Navigation with Rounded Pills */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link, index) => {
            const isActive = pathname === link.href

            return (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link
                  href={link.href}
                  className={`
                    relative px-4 py-2 rounded-full font-medium text-sm tracking-wide
                    transition-all duration-300 overflow-hidden
                    ${isActive
                      ? 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/30'
                      : 'text-[var(--foreground)] hover:text-white hover:bg-[var(--accent)]/90'
                    }
                  `}
                >
                  <motion.span
                    className="relative z-10"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.label}
                  </motion.span>

                  {/* Hover background effect */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 bg-[var(--accent)] opacity-0"
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </Link>
              </motion.div>
            )
          })}

          {/* Settings Section */}
          <motion.div
            className="flex items-center gap-3 ml-6 pl-6 border-l border-[var(--border)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div className="flex items-center gap-2 p-2 rounded-full bg-[var(--card)]/50 backdrop-blur-sm">
              <TextModeToggle />
              <ThemeToggle />
            </div>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden p-3 hover:bg-[var(--card)] rounded-full transition-all duration-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.span
              className="block h-0.5 bg-current rounded-full"
              animate={{
                rotate: mobileMenuOpen ? 45 : 0,
                y: mobileMenuOpen ? 8 : 0,
                originX: 0.5,
                originY: 0.5
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
            <motion.span
              className="block h-0.5 bg-current rounded-full"
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-0.5 bg-current rounded-full"
              animate={{
                rotate: mobileMenuOpen ? -45 : 0,
                y: mobileMenuOpen ? -8 : 0,
                originX: 0.5,
                originY: 0.5
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          </div>
        </motion.button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 bg-[var(--background)]/98 backdrop-blur-xl border-b border-[var(--border)]/30 lg:hidden shadow-2xl"
          >
            <div className="container py-6 space-y-2">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href

                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={`
                        block py-3 px-4 font-medium rounded-xl transition-all duration-300
                        ${isActive
                          ? 'bg-[var(--accent)] text-white shadow-lg'
                          : 'text-[var(--foreground)] hover:text-white hover:bg-[var(--accent)]/90 hover:shadow-md'
                        }
                      `}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <motion.span
                        whileHover={{ scale: 1.02, x: 5 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-3"
                      >
                        <span className="w-2 h-2 rounded-full bg-current opacity-60" />
                        {link.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                )
              })}

              {/* Mobile Settings */}
              <motion.div
                className="flex gap-4 pt-6 mt-6 border-t border-[var(--border)]/30 justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[var(--card)]/50 backdrop-blur-sm">
                  <TextModeToggle />
                  <ThemeToggle />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  )
}