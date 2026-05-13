import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg text-indigo-600">
          PromptKit
        </Link>
        <nav className="flex gap-6 text-sm text-gray-600">
          <Link href="/prompts" className="hover:text-indigo-600 transition-colors">
            提示词库
          </Link>
          <Link href="/generate" className="hover:text-indigo-600 transition-colors">
            AI生成
          </Link>
          <Link href="/pricing" className="hover:text-indigo-600 transition-colors">
            升级会员
          </Link>
        </nav>
      </div>
    </header>
  )
}
