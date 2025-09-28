import { MetadataRoute } from 'next'
import { getExhibitions } from '@/lib/dal'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const exhibitions = await getExhibitions()
  
  const exhibitionUrls = exhibitions.map((exhibition) => ({
    url: `https://gallerytwentythree.art/exhibitions/${exhibition.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  return [
    {
      url: 'https://gallerytwentythree.art',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://gallerytwentythree.art/exhibitions',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...exhibitionUrls,
    {
      url: 'https://gallerytwentythree.art/artists',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]
}