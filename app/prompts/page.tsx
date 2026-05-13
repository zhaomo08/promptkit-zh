import { getAllPrompts, getAllCategories, searchPrompts, getPromptsByCategory } from '@/lib/prompts'
import PromptCard from '@/components/PromptCard'
import SearchBar from '@/components/SearchBar'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '提示词库 - PromptKit | 全部AI提示词模板',
  description: '浏览200+精选AI提示词模板，按营销文案、小红书、简历、邮件等分类筛选',
}

interface Props {
  searchParams: Promise<{ q?: string; category?: string }>
}

export default async function PromptsPage({ searchParams }: Props) {
  const { q, category } = await searchParams
  const categories = getAllCategories()

  let prompts = getAllPrompts()
  if (q) prompts = searchPrompts(q)
  else if (category) prompts = getPromptsByCategory(category)

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-6">
        <SearchBar defaultValue={q} />
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        <Link
          href="/prompts"
          className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
            !category && !q
              ? 'bg-indigo-600 text-white'
              : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-400'
          }`}
        >
          全部
        </Link>
        {categories.map(cat => (
          <Link
            key={cat}
            href={`/prompts?category=${encodeURIComponent(cat)}`}
            className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
              category === cat
                ? 'bg-indigo-600 text-white'
                : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-400'
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      <p className="text-sm text-gray-500 mb-5">
        {q ? `"${q}" 相关结果` : category ? `${category}` : '全部提示词'}
        ：共 {prompts.length} 个
      </p>

      {prompts.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-lg mb-2">没找到相关提示词</p>
          <Link href="/generate" className="text-indigo-600 text-sm hover:underline">
            试试 AI 生成 →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {prompts.map(p => (
            <PromptCard key={p.id} prompt={p} />
          ))}
        </div>
      )}
    </main>
  )
}
