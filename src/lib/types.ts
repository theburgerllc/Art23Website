export interface Exhibition {
  slug: string
  title: string
  description: string
  startDate: string
  endDate: string
  artist?: string
  image?: string
  body?: string
  dates?: string
}

export interface Artist {
  slug: string
  name: string
  bio: string
  website?: string
  works?: Work[]
}

export interface Work {
  title: string
  year?: number
  medium?: string
  dimensions?: string
  image?: string
}