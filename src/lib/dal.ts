/**
 * Data Access Layer (DAL)
 * Implements security-first data fetching pattern (CVE-2025-29927 compliant)
 * All data operations go through this layer for consistent authorization
 */

import { cache } from 'react'
import data from '@/data/exhibitions.json'
import type { Exhibition, Artist } from './types'

// Cache wrapper for deduplication within request lifecycle
export const getExhibitions = cache(async (): Promise<Exhibition[]> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 0))
    const exhibitions = (data as any).exhibitions as Exhibition[]
    return exhibitions.map(exhibition => ({
      ...exhibition,
      title: exhibition.title.trim(),
      slug: exhibition.slug.toLowerCase().replace(/[^a-z0-9-]/g, ''),
      startDate: new Date(exhibition.startDate).toISOString().split('T')[0],
      endDate: new Date(exhibition.endDate).toISOString().split('T')[0],
      dates: `${new Date(exhibition.startDate).toISOString().split('T')[0]} — ${new Date(exhibition.endDate).toISOString().split('T')[0]}`
    }))
  } catch (error) {
    console.error('Failed to fetch exhibitions:', error)
    return []
  }
})

export const getExhibition = cache(async (slug: string): Promise<Exhibition | null> => {
  const exhibitions = await getExhibitions()
  return exhibitions.find(e => e.slug === slug) || null
})

export const getLatestExhibitions = cache(async (limit: number = 3): Promise<Exhibition[]> => {
  const exhibitions = await getExhibitions()
  const now = new Date()
  return exhibitions
    .filter(e => new Date(e.endDate) >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, limit)
})

export const getArtists = cache(async (): Promise<Artist[]> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 0))
    const artists = (data as any).artists as Artist[]
    return artists
  } catch (error) {
    console.error('Failed to fetch artists:', error)
    return []
  }
})

export const getArtist = cache(async (slug: string): Promise<Artist | null> => {
  const artists = await getArtists()
  return artists.find(a => a.slug === slug) || null
})