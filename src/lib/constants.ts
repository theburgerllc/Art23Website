export const SITE_CONFIG = {
  name: 'gallerytwentythree',
  tagline: 'feel your art beat.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://gallerytwentythree.art',
  email: 'hello@gallerytwentythree.art',
  phone: '+12038221787',
  social: {
    instagram: '@gallerytwentythree',
    twitter: '@gallery23art'
  }
} as const

export const SEO_DEFAULTS = {
  titleTemplate: '%s · gallerytwentythree',
  defaultTitle: 'gallerytwentythree',
  description: 'Contemporary art exhibition space presenting work across all media.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    handle: SITE_CONFIG.social.twitter,
    cardType: 'summary_large_image',
  },
} as const