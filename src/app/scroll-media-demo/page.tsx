import ScrollAppearMediaDemo from '@/components/examples/ScrollAppearMediaExamples'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ScrollAppearMedia Demo · gallerytwentythree',
  description: 'Demonstration of the ScrollAppearMedia component with various usage examples',
  robots: {
    index: false, // Don't index demo pages
    follow: false
  }
}

export default function ScrollMediaDemoPage() {
  return <ScrollAppearMediaDemo />
}