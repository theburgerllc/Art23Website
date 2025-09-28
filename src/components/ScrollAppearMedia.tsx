'use client'

import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  ScrollMediaProps,
  ScrollState,
  DEFAULT_SCROLL_CONFIG
} from '@/lib/types/scroll-media'

/**
 * ScrollAppearMedia - A scroll-reactive media component
 *
 * Displays images or videos that fade in when scrolling starts and fade out when scrolling stops.
 * The opacity intensity is based on scroll distance for dynamic visual feedback.
 *
 * Features:
 * - Scroll-triggered fade animations
 * - Dynamic opacity based on scroll distance
 * - Support for both images and videos
 * - Blur effects
 * - Accessibility support with reduced motion
 * - Integration with project theme system
 */
export default function ScrollAppearMedia({
  image = {
    src: '/api/placeholder/800/600',
    alt: 'Scroll-triggered media',
    width: 800,
    height: 600,
    priority: false
  },
  videoSrc,
  showImage = true,
  fadeInDuration,
  fadeOutDuration,
  blur = 0,
  variant = 'default',
  className = '',
  style,
  respectMotionPreference = true,
  scrollConfig,
  onScrollStateChange
}: ScrollMediaProps) {
  // Merge default config with user config
  const config = useMemo(() => ({
    ...DEFAULT_SCROLL_CONFIG,
    fadeInDuration: fadeInDuration || DEFAULT_SCROLL_CONFIG.fadeInDuration,
    fadeOutDuration: fadeOutDuration || DEFAULT_SCROLL_CONFIG.fadeOutDuration,
    ...scrollConfig
  }), [fadeInDuration, fadeOutDuration, scrollConfig])

  const [scrollState, setScrollState] = useState<ScrollState>({
    isScrolling: false,
    currentScroll: 0,
    maxScroll: 0,
    opacity: 0,
    lastScrollTime: 0
  })

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const animationFrameRef = useRef<number | null>(null)
  const lastUpdateRef = useRef<number>(0)

  // Optimized scroll state callback
  const updateScrollState = useCallback((newState: Partial<ScrollState>) => {
    setScrollState(prev => {
      const updated = { ...prev, ...newState }
      onScrollStateChange?.(updated.isScrolling, updated.currentScroll)
      return updated
    })
  }, [onScrollStateChange])

  // Calculate target opacity based on scroll distance
  const calculateTargetOpacity = useCallback((maxScroll: number): number => {
    if (maxScroll < config.minScrollForFullOpacity) {
      return 0.5 + 0.5 * (maxScroll / config.minScrollForFullOpacity)
    }
    return 1
  }, [config.minScrollForFullOpacity])

  // Check for reduced motion preference
  useEffect(() => {
    if (!respectMotionPreference) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [respectMotionPreference])

  // Enhanced scroll detection with performance optimization
  useEffect(() => {
    // If reduced motion is preferred, show at full opacity
    if (prefersReducedMotion) {
      updateScrollState({
        isScrolling: true,
        opacity: 1,
        currentScroll: 0,
        maxScroll: 0,
        lastScrollTime: performance.now()
      })
      return
    }

    const handleScroll = () => {
      const now = performance.now()
      const currentScroll = window.scrollY || window.pageYOffset || 0

      // Throttle updates to 60fps max
      if (now - lastUpdateRef.current < 16) return
      lastUpdateRef.current = now

      // Update scroll state
      updateScrollState((prev: ScrollState) => ({
        ...prev,
        isScrolling: true,
        currentScroll,
        maxScroll: Math.max(prev.maxScroll, currentScroll),
        lastScrollTime: now
      }))

      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      // Set timeout to detect when scrolling stops
      scrollTimeoutRef.current = setTimeout(() => {
        updateScrollState((prev: ScrollState) => ({
          ...prev,
          isScrolling: false,
          lastScrollTime: performance.now()
        }))
      }, config.scrollStopDelay)
    }

    // Passive scroll listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [prefersReducedMotion, config.scrollStopDelay, updateScrollState])

  // Smooth opacity animation with optimized performance
  useEffect(() => {
    if (prefersReducedMotion) return

    const duration = scrollState.isScrolling ? config.fadeInDuration : config.fadeOutDuration
    const targetOpacity = scrollState.isScrolling ? calculateTargetOpacity(scrollState.maxScroll) : 0

    // Only animate if there's a significant change
    if (Math.abs(targetOpacity - scrollState.opacity) < 0.01) return

    animateOpacity(targetOpacity, duration)
  }, [scrollState.isScrolling, scrollState.maxScroll, scrollState.opacity, config.fadeInDuration, config.fadeOutDuration, prefersReducedMotion, calculateTargetOpacity])

  const animateOpacity = useCallback((target: number, duration: number) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    const startOpacity = scrollState.opacity
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation (ease out cubic)
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      const currentOpacity = startOpacity + (target - startOpacity) * easeProgress

      updateScrollState((prev: ScrollState) => ({ ...prev, opacity: currentOpacity }))

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate)
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate)
  }, [scrollState.opacity, updateScrollState])

  // Generate variant-based classes
  const variantClasses = useMemo(() => {
    const classes = ['scroll-appear-media']

    if (variant !== 'default') {
      classes.push(variant)
    }

    if (className) {
      classes.push(className)
    }

    return classes.join(' ')
  }, [variant, className])

  const containerStyle: React.CSSProperties = {
    ...style,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  }

  const mediaStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: scrollState.opacity,
    transition: prefersReducedMotion ? 'opacity 0.3s ease' : 'none',
    pointerEvents: 'none',
    userSelect: 'none',
    filter: blur > 0 ? `blur(${blur}px)` : undefined
  }

  return (
    <motion.div
      className={variantClasses}
      style={containerStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: prefersReducedMotion ? 1 : scrollState.opacity }}
      transition={{
        duration: prefersReducedMotion ? 0.3 : 0,
        ease: 'easeOut'
      }}
    >
      {showImage ? (
        image.src.startsWith('http') || image.src.startsWith('/api/') ? (
          // External images or placeholder APIs
          <img
            src={image.src}
            alt={image.alt}
            style={mediaStyle}
            loading={image.priority ? 'eager' : 'lazy'}
          />
        ) : (
          // Next.js optimized images for local files
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width || 800}
            height={image.height || 600}
            style={mediaStyle}
            className="object-cover"
            priority={image.priority || false}
            loading={image.priority ? 'eager' : 'lazy'}
          />
        )
      ) : (
        videoSrc && (
          <video
            src={videoSrc}
            style={mediaStyle}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={`Scroll-triggered video: ${videoSrc.split('/').pop()}`}
          />
        )
      )}

      {/* Loading state overlay */}
      {scrollState.opacity === 0 && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 bg-[var(--card)] opacity-30"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: scrollState.opacity > 0 ? 0 : 0.3 }}
          transition={{ duration: 0.3 }}
        />
      )}

      {/* Debug overlay (development only) */}
      {process.env.NODE_ENV === 'development' && onScrollStateChange && (
        <div className="absolute top-2 left-2 bg-black/80 text-white text-xs p-2 rounded font-mono">
          <div>Scrolling: {scrollState.isScrolling ? 'Yes' : 'No'}</div>
          <div>Opacity: {scrollState.opacity.toFixed(2)}</div>
          <div>Max Scroll: {scrollState.maxScroll}px</div>
        </div>
      )}
    </motion.div>
  )
}