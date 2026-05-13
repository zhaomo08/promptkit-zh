import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PromptKit - AI写作提示词工具站',
  description: '200+精选AI提示词模板，覆盖营销文案、小红书、简历、邮件等场景，帮你用好ChatGPT和Claude',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.className} bg-gray-50 min-h-screen`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
