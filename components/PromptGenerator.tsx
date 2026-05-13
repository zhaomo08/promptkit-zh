'use client'
import { useState, useEffect } from 'react'
import { canGenerate, getRemainingCount, incrementUsage } from '@/lib/usage'
import Link from 'next/link'

export default function PromptGenerator() {
  const [scenario, setScenario] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [remaining, setRemaining] = useState(5)
  const [limitReached, setLimitReached] = useState(false)

  useEffect(() => {
    setRemaining(getRemainingCount())
    setLimitReached(!canGenerate())
  }, [])

  const handleGenerate = async () => {
    if (!canGenerate()) {
      setLimitReached(true)
      return
    }
    if (!scenario.trim()) {
      setError('请输入使用场景')
      return
    }
    setError('')
    setLoading(true)
    incrementUsage()
    setRemaining(getRemainingCount())

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenario }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || '生成失败，请重试')
        return
      }
      setResult(data.result)
    } catch {
      setError('网络错误，请检查连接后重试')
    } finally {
      setLoading(false)
    }
  }

  if (limitReached) {
    return (
      <div className="text-center py-12 bg-white border border-gray-200 rounded-2xl">
        <p className="text-gray-700 font-medium mb-2">今日免费次数已用完</p>
        <p className="text-gray-400 text-sm mb-6">每天5次免费生成，明天自动重置</p>
        <Link
          href="/pricing"
          className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-indigo-700 transition-colors"
        >
          升级会员，无限使用
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <label className="text-sm font-medium text-gray-700">描述你的写作场景</label>
        <span className="text-xs text-gray-400">剩余免费次数：{remaining}/5</span>
      </div>
      <textarea
        value={scenario}
        onChange={e => setScenario(e.target.value)}
        placeholder="例如：我需要为一款儿童益智玩具写小红书种草文案，目标用户是25-35岁宝妈"
        className="w-full h-28 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-indigo-400 text-sm resize-none bg-white"
        maxLength={200}
      />
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs text-gray-400">{scenario.length}/200</p>
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || !scenario.trim()}
        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? '生成中...' : '生成 Prompt（免费）'}
      </button>

      {result && (
        <div className="mt-6 bg-gray-50 border border-gray-200 rounded-xl p-5">
          <h3 className="font-medium text-gray-800 mb-3 text-sm">生成结果</h3>
          <pre className="text-sm text-gray-700 whitespace-pre-wrap font-sans leading-relaxed">
            {result}
          </pre>
        </div>
      )}
    </div>
  )
}
