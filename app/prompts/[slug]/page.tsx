import { getAllPrompts, getPromptBySlug } from '@/lib/prompts'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import CopyButton from '@/components/CopyButton'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllPrompts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const prompt = getPromptBySlug(slug)
  if (!prompt) return {}
  return {
    title: `${prompt.title} Prompt模板 - PromptKit`,
    description: `${prompt.description}。适用于${prompt.category}场景，可直接复制使用的AI提示词。`,
  }
}

export default async function PromptDetailPage({ params }: Props) {
  const { slug } = await params
  const prompt = getPromptBySlug(slug)
  if (!prompt) notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/prompts" className="text-sm text-gray-400 hover:text-indigo-600 mb-4 inline-block">
        ← 返回提示词库
      </Link>

      <div className="mb-2">
        <span className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
          {prompt.category}
        </span>
      </div>
      <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-2">{prompt.title}</h1>
      <p className="text-gray-500 mb-6">{prompt.description}</p>

      <h2 className="font-semibold text-gray-700 mb-2 text-sm">Prompt 模板</h2>
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-6 relative">
        <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">
          {prompt.prompt}
        </pre>
        <CopyButton text={prompt.prompt} />
      </div>

      <div className="flex gap-2 flex-wrap mb-10">
        {prompt.tags.map(tag => (
          <span key={tag} className="text-xs bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      <div className="bg-indigo-50 rounded-xl p-5 text-center">
        <p className="text-sm text-gray-600 mb-3">想要AI根据你的具体场景生成专属Prompt？</p>
        <Link
          href="/generate"
          className="inline-block bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          免费使用AI生成器
        </Link>
      </div>
    </main>
  )
}
