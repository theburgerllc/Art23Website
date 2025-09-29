import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import { Inter } from 'next/font/google'
import './globals.css'
import EnhancedHeader from '@/components/EnhancedHeader'
import CircularNavbar from '@/components/CircularNavbar'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

// Note: Onest font would need to be added via a font service or local files
// For now, using Inter as the primary font which covers both sans and display use cases

export const metadata: Metadata = {
  title: {
    default: 'gallerytwentythree',
    template: '%s · gallerytwentythree'
  },
  description: 'Contemporary art exhibition space. Feel your art beat.',
  keywords: 'art, gallery, contemporary, exhibitions, artists',
  authors: [{ name: 'gallerytwentythree' }],
  openGraph: {
    type: 'website',
    title: 'gallerytwentythree',
    description: 'Contemporary art exhibition space',
    images: ['/og-image.jpg']
  },
  twitter: {
    card: 'summary_large_image',
    title: 'gallerytwentythree',
    description: 'Contemporary art exhibition space',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#01010f' }
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`min-h-screen flex flex-col ${inter.variable}`}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <EnhancedHeader />
            <CircularNavbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}