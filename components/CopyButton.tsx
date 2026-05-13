'use client'
import { useState } from 'react'

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard access denied or non-HTTPS — fail silently
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 text-xs bg-white border border-gray-200 px-2.5 py-1 rounded-lg text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
    >
      {copied ? '✓ 已复制' : '复制'}
    </button>
  )
}
