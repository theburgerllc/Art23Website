import AmbiLightDemo from '@/components/examples/AmbiLightExamples'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AmbiLight Demo · gallerytwentythree',
  description: 'Demonstration of the AmbiLight video component with ambient glow effects',
  robots: {
    index: false, // Don't index demo pages
    follow: false
  }
}

export default function AmbiLightDemoPage() {
  return <AmbiLightDemo />
}