'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'
import TextModeToggle from './TextModeToggle'

const navLinks = [
  { href: '/exhibitions', label: 'Exhibitions' },
  { href: '/artists', label: 'Artists' },
  { href: '/blog', label: 'Blog' },
  { href: '/shop', label: 'Shop' },
  { href: '/visit', label: 'Visit' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--background)]/90 border-b border-[var(--border)]/20">
      <nav className="container py-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/wordmark-dark.svg"
              alt="gallerytwentythree"
              width={200}
              height={32}
              className="h-10 w-auto hidden dark:block transition-opacity duration-300"
              priority
            />
            <Image
              src="/wordmark-light.svg"
              alt="gallerytwentythree"
              width={200}
              height={32}
              className="h-10 w-auto dark:hidden transition-opacity duration-300"
              priority
            />
          </motion.div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link
                href={link.href}
                className="nav-link text-[var(--foreground)] hover:text-[var(--accent)] font-medium tracking-tight"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <motion.div
            className="flex items-center gap-4 ml-6 pl-6 border-l border-[var(--border)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            <TextModeToggle />
            <ThemeToggle />
          </motion.div>
        </div>
        
        {/* Mobile Menu Button */}
        <motion.button
          className="md:hidden p-3 hover:bg-[var(--card)] rounded-lg transition-colors"
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
            className="absolute top-full left-0 right-0 bg-[var(--background)]/95 backdrop-blur-xl border-b border-[var(--border)]/30 md:hidden shadow-lg"
          >
            <div className="container py-6 space-y-1">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 px-4 font-medium text-[var(--foreground)] hover:text-[var(--accent)] hover:bg-[var(--card)] rounded-lg transition-all duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="flex gap-4 pt-6 mt-6 border-t border-[var(--border)]/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <TextModeToggle />
                <ThemeToggle />
              </motion.div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}