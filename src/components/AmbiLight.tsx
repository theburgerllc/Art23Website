'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

interface AmbiLightProps {
  /** Video source URL or file path */
  videoSrc: string
  /** YouTube video ID (if using YouTube source) */
  youtubeId?: string
  /** Source type: 'file', 'url', or 'youtube' */
  sourceType?: 'file' | 'url' | 'youtube'
  /** Autoplay video */
  autoplay?: boolean
  /** Mute video */
  muted?: boolean
  /** Loop video */
  loop?: boolean
  /** Show video controls */
  controls?: boolean
  /** Blur intensity for ambient glow (0-40px) */
  blur?: number
  /** Glow spread distance */
  spread?: number
  /** Glow intensity (0-1) */
  intensity?: number
  /** Border radius for video container */
  radius?: number
  /** Shadow opacity */
  shadow?: number
  /** Saturation adjustment for glow */
  saturation?: number
  /** Brightness adjustment for glow */
  brightness?: number
  /** Start time offset in seconds */
  startTime?: number
  /** Container className */
  className?: string
  /** Container styles */
  style?: React.CSSProperties
  /** Video loaded callback */
  onVideoLoad?: () => void
  /** Video error callback */
  onVideoError?: (error: Error) => void
}

/**
 * AmbiLight - Video player with ambient glow effect
 *
 * Creates a video player with a synchronized background glow that matches
 * the video content, providing an immersive ambient lighting experience.
 *
 * Features:
 * - Multiple video sources (local files, URLs, YouTube)
 * - Customizable glow effects (blur, spread, intensity)
 * - Responsive design with theme integration
 * - Performance optimized with lazy loading
 */
export default function AmbiLight({
  videoSrc,
  youtubeId,
  sourceType = 'file',
  autoplay = true,
  muted = true,
  loop = true,
  controls = false,
  blur = 20,
  spread = 20,
  intensity = 0.6,
  radius = 12,
  shadow = 0.3,
  saturation = 1.2,
  brightness = 1.1,
  startTime = 0,
  className = '',
  style,
  onVideoLoad,
  onVideoError
}: AmbiLightProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mainVideoRef = useRef<HTMLVideoElement>(null)
  const glowVideoRef = useRef<HTMLVideoElement>(null)
  const youtubeRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<any>(null)

  // YouTube API loading
  const loadYouTubeAPI = useCallback(() => {
    return new Promise<void>((resolve) => {
      if (window.YT && window.YT.Player) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      script.async = true
      document.head.appendChild(script)

      window.onYouTubeIframeAPIReady = () => resolve()
    })
  }, [])

  // Initialize YouTube player
  const initYouTubePlayer = useCallback(async () => {
    if (!youtubeId || !youtubeRef.current) return

    try {
      await loadYouTubeAPI()

      playerRef.current = new window.YT.Player(youtubeRef.current, {
        videoId: youtubeId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          mute: muted ? 1 : 0,
          loop: loop ? 1 : 0,
          controls: controls ? 1 : 0,
          start: startTime,
          modestbranding: 1,
          rel: 0,
          showinfo: 0
        },
        events: {
          onReady: (event: any) => {
            setIsLoaded(true)
            onVideoLoad?.()
            if (autoplay) {
              event.target.playVideo()
            }
          },
          onStateChange: (event: any) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING)
          },
          onError: (event: any) => {
            const error = new Error(`YouTube Player Error: ${event.data}`)
            setError(error.message)
            onVideoError?.(error)
          }
        }
      })
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to load YouTube player')
      setError(error.message)
      onVideoError?.(error)
    }
  }, [youtubeId, autoplay, muted, loop, controls, startTime, onVideoLoad, onVideoError])

  // Sync glow video with main video
  const syncVideos = useCallback(() => {
    const mainVideo = mainVideoRef.current
    const glowVideo = glowVideoRef.current

    if (!mainVideo || !glowVideo) return

    const syncTime = () => {
      if (Math.abs(mainVideo.currentTime - glowVideo.currentTime) > 0.3) {
        glowVideo.currentTime = mainVideo.currentTime
      }
    }

    const handlePlay = () => {
      glowVideo.play().catch(console.warn)
      setIsPlaying(true)
    }

    const handlePause = () => {
      glowVideo.pause()
      setIsPlaying(false)
    }

    const handleLoadedData = () => {
      setIsLoaded(true)
      onVideoLoad?.()
      if (startTime > 0) {
        mainVideo.currentTime = startTime
        glowVideo.currentTime = startTime
      }
    }

    const handleError = () => {
      const error = new Error('Video failed to load')
      setError(error.message)
      onVideoError?.(error)
    }

    mainVideo.addEventListener('timeupdate', syncTime)
    mainVideo.addEventListener('play', handlePlay)
    mainVideo.addEventListener('pause', handlePause)
    mainVideo.addEventListener('loadeddata', handleLoadedData)
    mainVideo.addEventListener('error', handleError)

    return () => {
      mainVideo.removeEventListener('timeupdate', syncTime)
      mainVideo.removeEventListener('play', handlePlay)
      mainVideo.removeEventListener('pause', handlePause)
      mainVideo.removeEventListener('loadeddata', handleLoadedData)
      mainVideo.removeEventListener('error', handleError)
    }
  }, [startTime, onVideoLoad, onVideoError])

  // Initialize component based on source type
  useEffect(() => {
    if (sourceType === 'youtube') {
      initYouTubePlayer()
    } else {
      syncVideos()
    }
  }, [sourceType, initYouTubePlayer, syncVideos])

  // Styles for the glow effect
  const glowStyles: React.CSSProperties = {
    position: 'absolute',
    top: `-${spread}px`,
    left: `-${spread}px`,
    right: `-${spread}px`,
    bottom: `-${spread}px`,
    filter: `blur(${blur}px) saturate(${saturation}) brightness(${brightness})`,
    opacity: intensity,
    borderRadius: `${radius + spread}px`,
    zIndex: -1,
    transform: 'scale(1.1)',
  }

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    borderRadius: `${radius}px`,
    overflow: 'hidden',
    boxShadow: `0 0 ${blur * 2}px rgba(0, 0, 0, ${shadow})`,
    backgroundColor: 'var(--card)',
    ...style
  }

  const videoStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: `${radius}px`,
    display: 'block'
  }

  return (
    <motion.div
      className={`ambi-light ${className}`}
      style={containerStyles}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isLoaded ? 1 : 0, scale: isLoaded ? 1 : 0.95 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {/* Glow Background Layer */}
      {sourceType !== 'youtube' && (
        <video
          ref={glowVideoRef}
          src={videoSrc}
          style={glowStyles}
          autoPlay={autoplay}
          muted
          loop={loop}
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      )}

      {/* Main Content Layer */}
      {sourceType === 'youtube' ? (
        <div
          ref={youtubeRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: `${radius}px`
          }}
        />
      ) : (
        <video
          ref={mainVideoRef}
          src={videoSrc}
          style={videoStyles}
          autoPlay={autoplay}
          muted={muted}
          loop={loop}
          controls={controls}
          playsInline
          preload="metadata"
          poster={sourceType === 'file' ? undefined : `${videoSrc}#t=0.1`}
        />
      )}

      {/* Loading State */}
      {!isLoaded && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-[var(--card)]"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
          style={{ borderRadius: `${radius}px` }}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            <span className="text-[var(--muted)] text-sm">Loading video...</span>
          </div>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-[var(--card)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ borderRadius: `${radius}px` }}
        >
          <div className="text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-[var(--muted)] text-sm">Failed to load video</p>
          </div>
        </motion.div>
      )}

      {/* Play/Pause Indicator */}
      {isLoaded && !controls && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isPlaying ? 0 : 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

// Type declaration for YouTube API
declare global {
  interface Window {
    YT: {
      Player: any
      PlayerState: {
        PLAYING: number
        PAUSED: number
        ENDED: number
      }
    }
    onYouTubeIframeAPIReady: () => void
  }
}