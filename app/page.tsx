import { getAllPrompts, getAllCategories } from '@/lib/prompts'
import SearchBar from '@/components/SearchBar'
import PromptCard from '@/components/PromptCard'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PromptKit - 找到最好用的AI提示词',
  description: '200+精选AI提示词模板，小红书文案、简历优化、邮件撰写、营销文案，帮你高效使用ChatGPT和Claude',
}

export default function HomePage() {
  const categories = getAllCategories()
  const featured = getAllPrompts().slice(0, 6)

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          找到最好用的 AI 提示词
        </h1>
        <p className="text-gray-500 mb-6 text-sm">
          200+ 精选模板，覆盖营销、写作、办公等场景，直接复制使用
        </p>
        <div className="max-w-xl mx-auto">
          <SearchBar />
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-8 justify-center">
        {categories.map(cat => (
          <Link
            key={cat}
            href={`/prompts?category=${encodeURIComponent(cat)}`}
            className="px-3 py-1.5 rounded-full text-sm bg-white border border-gray-200 text-gray-600 hover:border-indigo-400 hover:text-indigo-600 transition-colors"
          >
            {cat}
          </Link>
        ))}
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800">热门提示词</h2>
        <Link href="/prompts" className="text-sm text-indigo-600 hover:underline">
          查看全部 →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {featured.map(p => (
          <PromptCard key={p.id} prompt={p} />
        ))}
      </div>

      <div className="p-8 bg-indigo-50 rounded-2xl text-center">
        <h2 className="font-semibold text-gray-900 mb-2">没找到合适的？</h2>
        <p className="text-gray-500 text-sm mb-5">
          告诉AI你的场景，30秒自动生成专属Prompt
        </p>
        <Link
          href="/generate"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          立即生成 →
        </Link>
      </div>
    </main>
  )
}
