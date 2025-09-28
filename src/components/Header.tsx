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
  { href: '/visit', label: 'Visit' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-[var(--background)]/80 border-b border-[var(--muted)]/20">
      <nav className="container py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/wordmark-dark.svg"
            alt="gallerytwentythree"
            width={200}
            height={32}
            className="h-8 w-auto hidden dark:block"
            priority
          />
          <Image
            src="/wordmark-light.svg"
            alt="gallerytwentythree"
            width={200}
            height={32}
            className="h-8 w-auto dark:hidden"
            priority
          />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-medium hover:text-[var(--accent)] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-3 ml-4">
            <TextModeToggle />
            <ThemeToggle />
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.span
              className="block h-0.5 bg-current"
              animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 8 : 0 }}
            />
            <motion.span
              className="block h-0.5 bg-current"
              animate={{ opacity: mobileMenuOpen ? 0 : 1 }}
            />
            <motion.span
              className="block h-0.5 bg-current"
              animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -8 : 0 }}
            />
          </div>
        </button>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 right-0 bg-[var(--background)] border-b border-[var(--muted)]/20 md:hidden"
          >
            <div className="container py-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-2 font-medium hover:text-[var(--accent)]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-3 pt-4 border-t border-[var(--muted)]/20">
                <TextModeToggle />
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  )
}