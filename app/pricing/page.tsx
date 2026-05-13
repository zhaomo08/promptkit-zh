import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '升级会员 - PromptKit | 无限AI生成次数',
  description: '升级PromptKit会员，解锁无限AI Prompt生成次数和高级功能',
}

export default function PricingPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">选择套餐</h1>
      <p className="text-center text-gray-500 mb-10 text-sm">
        免费版够用，会员版更高效
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-2xl p-6 bg-white">
          <h2 className="font-semibold text-lg text-gray-900 mb-1">免费版</h2>
          <p className="text-3xl font-bold text-gray-900 mb-6">¥0</p>
          <ul className="space-y-3 text-sm text-gray-600 mb-8">
            <li className="flex items-center gap-2"><span className="text-green-500">✓</span> 浏览全部提示词库</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✓</span> AI生成 5次/天</li>
            <li className="flex items-center gap-2"><span className="text-green-500">✓</span> 复制所有Prompt</li>
            <li className="flex items-center gap-2"><span className="text-gray-300">✗</span><span className="text-gray-400">无限AI生成</span></li>
            <li className="flex items-center gap-2"><span className="text-gray-300">✗</span><span className="text-gray-400">批量导出</span></li>
          </ul>
          <Link
            href="/generate"
            className="block text-center border border-indigo-600 text-indigo-600 py-2.5 rounded-xl text-sm font-medium hover:bg-indigo-50 transition-colors"
          >
            开始免费使用
          </Link>
        </div>

        <div className="border-2 border-indigo-500 rounded-2xl p-6 bg-indigo-50 relative">
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
            推荐
          </span>
          <h2 className="font-semibold text-lg text-gray-900 mb-1">会员版</h2>
          <p className="text-3xl font-bold text-gray-900 mb-1">¥9.9<span className="text-base font-normal text-gray-500"> /月</span></p>
          <p className="text-xs text-gray-400 mb-6">≈ 一杯奶茶的价格</p>
          <ul className="space-y-3 text-sm text-gray-700 mb-8">
            <li className="flex items-center gap-2"><span className="text-indigo-600">✓</span> 浏览全部提示词库</li>
            <li className="flex items-center gap-2"><span className="text-indigo-600">✓</span> AI生成 无限次</li>
            <li className="flex items-center gap-2"><span className="text-indigo-600">✓</span> 复制所有Prompt</li>
            <li className="flex items-center gap-2"><span className="text-indigo-600">✓</span> 批量导出（TXT/JSON）</li>
          </ul>
          <button
            disabled
            className="w-full bg-indigo-300 text-white py-2.5 rounded-xl text-sm font-medium cursor-not-allowed"
          >
            即将开放 · 敬请期待
          </button>
        </div>
      </div>
    </main>
  )
}
