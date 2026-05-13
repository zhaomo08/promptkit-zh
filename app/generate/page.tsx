import PromptGenerator from '@/components/PromptGenerator'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Prompt生成器 - PromptKit | 输入场景自动生成提示词',
  description: '输入你的写作场景，AI自动生成3个不同风格的高质量Prompt，每天免费5次',
}

export default function GeneratePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Prompt 生成器</h1>
      <p className="text-gray-500 text-sm mb-8">
        描述你的写作场景，AI自动生成3个可直接使用的Prompt变体
      </p>
      <PromptGenerator />
    </main>
  )
}
