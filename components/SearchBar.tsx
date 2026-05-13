'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar({ defaultValue = '' }: { defaultValue?: string }) {
  const [value, setValue] = useState(defaultValue)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      router.push(`/prompts?q=${encodeURIComponent(value.trim())}`)
    } else {
      router.push('/prompts')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="搜索提示词，如：小红书文案、简历优化..."
        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-400 text-sm bg-white"
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600"
        aria-label="搜索"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  )
}
