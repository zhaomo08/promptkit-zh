import Link from 'next/link'
import type { Prompt } from '@/lib/prompts'

export default function PromptCard({ prompt }: { prompt: Prompt }) {
  return (
    <Link
      href={`/prompts/${prompt.slug}`}
      className="block p-4 bg-white border border-gray-200 rounded-xl hover:border-indigo-400 hover:shadow-sm transition-all"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-gray-900 text-sm">{prompt.title}</h3>
        <span className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full shrink-0">
          {prompt.category}
        </span>
      </div>
      <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">{prompt.description}</p>
      <div className="flex gap-1 mt-2 flex-wrap">
        {prompt.tags.map(tag => (
          <span key={tag} className="text-xs text-gray-400">
            #{tag}
          </span>
        ))}
      </div>
    </Link>
  )
}
