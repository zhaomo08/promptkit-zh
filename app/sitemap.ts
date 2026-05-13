import { MetadataRoute } from 'next'
import { getAllPrompts } from '@/lib/prompts'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://promptkit.cn'
  const prompts = getAllPrompts()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/prompts`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/generate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const promptPages: MetadataRoute.Sitemap = prompts.map(p => ({
    url: `${baseUrl}/prompts/${p.slug}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...promptPages]
}
