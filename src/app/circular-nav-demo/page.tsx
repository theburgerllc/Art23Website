'use client'

import { motion } from 'framer-motion'
import MotionFade from '@/components/MotionFade'

export default function CircularNavDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--card)] to-[var(--background)]">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[var(--accent)] blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[var(--accent)]/50 blur-3xl" />
        </div>

        <div className="container relative z-10 text-center">
          <MotionFade>
            <motion.h1
              className="text-6xl md:text-8xl font-light tracking-tight text-[var(--foreground)] mb-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Circular Navigation
              <span className="block text-[var(--accent)] font-normal">Demo</span>
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl text-[var(--muted)] max-w-3xl mx-auto mb-12 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Experience our innovative circular navigation system with rounded tabs,
              directional arrows, and smooth animations. Click the circular button in
              the top-right corner to explore the navigation menu.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div
                className="flex items-center gap-4 px-6 py-4 bg-[var(--card)]/80 backdrop-blur-sm rounded-2xl border border-[var(--border)]/30"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-3 h-3 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="text-[var(--foreground)] font-medium">
                  Circular Logo Navigation
                </span>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 px-6 py-4 bg-[var(--card)]/80 backdrop-blur-sm rounded-2xl border border-[var(--border)]/30"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[var(--foreground)] font-medium">
                  Rounded Navigation Tabs
                </span>
              </motion.div>

              <motion.div
                className="flex items-center gap-4 px-6 py-4 bg-[var(--card)]/80 backdrop-blur-sm rounded-2xl border border-[var(--border)]/30"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[var(--foreground)] font-medium">
                  Directional Arrows
                </span>
              </motion.div>
            </motion.div>
          </MotionFade>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex flex-col items-center space-y-3 text-[var(--muted)]">
            <span className="text-sm font-medium">Scroll to explore features</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-6"
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 border-t border-[var(--border)]/20">
        <div className="container">
          <MotionFade>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[var(--foreground)] mb-6">
                Navigation Features
              </h2>
              <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto">
                Our circular navigation system combines aesthetics with functionality
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: '🎯',
                  title: 'Circular Logo Design',
                  description: 'Eye-catching circular logo with gradient background and hover animations'
                },
                {
                  icon: '🔘',
                  title: 'Rounded Navigation Tabs',
                  description: 'Smooth, pill-shaped navigation buttons with elegant hover effects'
                },
                {
                  icon: '➡️',
                  title: 'Directional Arrows',
                  description: 'Intuitive directional indicators and smooth transition animations'
                },
                {
                  icon: '📱',
                  title: 'Mobile Responsive',
                  description: 'Perfectly adapted for all screen sizes and touch interactions'
                },
                {
                  icon: '⚡',
                  title: 'Performance Optimized',
                  description: 'Lightweight and fast with smooth 60fps animations'
                },
                {
                  icon: '♿',
                  title: 'Accessibility Ready',
                  description: 'Full keyboard navigation and screen reader support'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="group p-8 bg-[var(--card)]/50 backdrop-blur-sm rounded-2xl border border-[var(--border)]/30 hover:border-[var(--accent)]/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--muted)] leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </MotionFade>
        </div>
      </section>

      {/* Usage Instructions */}
      <section className="py-20 border-t border-[var(--border)]/20">
        <div className="container">
          <MotionFade>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[var(--foreground)] mb-8">
                How to Use
              </h2>

              <div className="space-y-8">
                <motion.div
                  className="flex items-center justify-center gap-6 p-8 bg-[var(--card)]/50 backdrop-blur-sm rounded-2xl border border-[var(--border)]/30"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/80 flex items-center justify-center text-white text-2xl">
                    1
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                      Click the Circular Button
                    </h3>
                    <p className="text-[var(--muted)]">
                      Find the floating circular button in the top-right corner of the screen
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center justify-center gap-6 p-8 bg-[var(--card)]/50 backdrop-blur-sm rounded-2xl border border-[var(--border)]/30"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/80 flex items-center justify-center text-white text-2xl">
                    2
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                      Navigate with Style
                    </h3>
                    <p className="text-[var(--muted)]">
                      Watch as navigation items appear in a beautiful circular pattern
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center justify-center gap-6 p-8 bg-[var(--card)]/50 backdrop-blur-sm rounded-2xl border border-[var(--border)]/30"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent)]/80 flex items-center justify-center text-white text-2xl">
                    3
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-[var(--foreground)] mb-2">
                      Enjoy the Experience
                    </h3>
                    <p className="text-[var(--muted)]">
                      Experience smooth animations and intuitive navigation flow
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </MotionFade>
        </div>
      </section>
    </div>
  )
}