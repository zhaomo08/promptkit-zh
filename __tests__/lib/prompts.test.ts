import { getAllPrompts, getPromptBySlug, searchPrompts, getAllCategories, getPromptsByCategory } from '@/lib/prompts'

describe('prompts library', () => {
  test('getAllPrompts 返回非空数组', () => {
    const prompts = getAllPrompts()
    expect(Array.isArray(prompts)).toBe(true)
    expect(prompts.length).toBeGreaterThan(0)
  })

  test('每个 prompt 包含必要字段', () => {
    getAllPrompts().forEach(p => {
      expect(p).toHaveProperty('id')
      expect(p).toHaveProperty('slug')
      expect(p).toHaveProperty('title')
      expect(p).toHaveProperty('prompt')
      expect(p).toHaveProperty('category')
    })
  })

  test('getPromptBySlug 根据 slug 返回正确的 prompt', () => {
    const all = getAllPrompts()
    const target = all[0]
    const found = getPromptBySlug(target.slug)
    expect(found).toBeDefined()
    expect(found?.id).toBe(target.id)
  })

  test('getPromptBySlug 对不存在的 slug 返回 undefined', () => {
    expect(getPromptBySlug('nonexistent-404')).toBeUndefined()
  })

  test('searchPrompts 按标题搜索', () => {
    const all = getAllPrompts()
    const keyword = all[0].title.substring(0, 4)
    const results = searchPrompts(keyword)
    expect(results.length).toBeGreaterThan(0)
    expect(results.some(p => p.id === all[0].id)).toBe(true)
  })

  test('searchPrompts 对空字符串返回全部', () => {
    const all = getAllPrompts()
    expect(searchPrompts('').length).toBe(all.length)
  })

  test('getAllCategories 返回无重复分类', () => {
    const cats = getAllCategories()
    expect(new Set(cats).size).toBe(cats.length)
    expect(cats.length).toBeGreaterThan(0)
  })

  test('getPromptsByCategory 只返回对应分类', () => {
    const cats = getAllCategories()
    const cat = cats[0]
    const results = getPromptsByCategory(cat)
    expect(results.every(p => p.category === cat)).toBe(true)
  })
})
