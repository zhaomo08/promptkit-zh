import promptsData from '@/data/prompts.json'

export interface Prompt {
  id: string
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  prompt: string
  createdAt: string
}

export function getAllPrompts(): Prompt[] {
  return promptsData.prompts as Prompt[]
}

export function getPromptBySlug(slug: string): Prompt | undefined {
  return getAllPrompts().find(p => p.slug === slug)
}

export function getPromptsByCategory(category: string): Prompt[] {
  return getAllPrompts().filter(p => p.category === category)
}

export function getAllCategories(): string[] {
  return [...new Set(getAllPrompts().map(p => p.category))]
}

export function searchPrompts(query: string): Prompt[] {
  if (!query.trim()) return getAllPrompts()
  const q = query.toLowerCase()
  return getAllPrompts().filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.tags.some(t => t.toLowerCase().includes(q))
  )
}
