import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ErrorBoundary from '@/components/ErrorBoundary'

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
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
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
      <body className="min-h-screen flex flex-col">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ErrorBoundary>
            <Header />
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