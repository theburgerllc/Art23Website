// Types for ScrollAppearMedia component

export interface ScrollMediaImage {
  /** Image source URL (local or remote) */
  src: string
  /** Alt text for accessibility */
  alt: string
  /** Image width (for Next.js Image optimization) */
  width?: number
  /** Image height (for Next.js Image optimization) */
  height?: number
  /** Priority loading for above-the-fold images */
  priority?: boolean
}

export interface ScrollMediaConfig {
  /** Fade in duration in milliseconds */
  fadeInDuration: number
  /** Fade out duration in milliseconds */
  fadeOutDuration: number
  /** Scroll stop detection delay in milliseconds */
  scrollStopDelay: number
  /** Minimum scroll distance for full opacity */
  minScrollForFullOpacity: number
  /** Maximum scroll distance to track */
  maxScrollTracking: number
}

export type ScrollMediaVariant =
  | 'default'
  | 'hero'
  | 'rounded'
  | 'rounded-xl'
  | 'aspect-video'
  | 'aspect-square'
  | 'aspect-portrait'

export interface ScrollMediaProps {
  /** Image configuration */
  image?: ScrollMediaImage
  /** Video file URL (local or remote) */
  videoSrc?: string
  /** Whether to show image (true) or video (false) */
  showImage?: boolean
  /** Fade in duration in milliseconds */
  fadeInDuration?: number
  /** Fade out duration in milliseconds */
  fadeOutDuration?: number
  /** Blur amount in pixels */
  blur?: number
  /** Component variant for different styles */
  variant?: ScrollMediaVariant
  /** Additional CSS classes */
  className?: string
  /** Custom styles */
  style?: React.CSSProperties
  /** Enable reduced motion for accessibility */
  respectMotionPreference?: boolean
  /** Custom scroll configuration */
  scrollConfig?: Partial<ScrollMediaConfig>
  /** Callback when scroll state changes */
  onScrollStateChange?: (isScrolling: boolean, scrollDistance: number) => void
}

export interface ScrollState {
  isScrolling: boolean
  currentScroll: number
  maxScroll: number
  opacity: number
  lastScrollTime: number
}

// Default configuration values
export const DEFAULT_SCROLL_CONFIG: ScrollMediaConfig = {
  fadeInDuration: 400,
  fadeOutDuration: 400,
  scrollStopDelay: 300,
  minScrollForFullOpacity: 200,
  maxScrollTracking: 2000
}

// Utility type for scroll event handling
export type ScrollEventHandler = (event: Event) => void

// Performance monitoring interface
export interface ScrollPerformanceMetrics {
  totalScrollEvents: number
  averageFrameTime: number
  lastEventTimestamp: number
  isThrottled: boolean
}