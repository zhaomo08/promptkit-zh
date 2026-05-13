const STORAGE_KEY = 'promptkit_usage'
const FREE_DAILY_LIMIT = 5

interface UsageData {
  date: string
  count: number
}

function getToday(): string {
  return new Date().toISOString().split('T')[0]
}

export function getUsageCount(): number {
  if (typeof window === 'undefined') return 0
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 0
    const data: UsageData = JSON.parse(raw)
    if (data.date !== getToday()) return 0
    return data.count
  } catch {
    return 0
  }
}

export function incrementUsage(): void {
  if (typeof window === 'undefined') return
  const data: UsageData = { date: getToday(), count: getUsageCount() + 1 }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function canGenerate(): boolean {
  return getUsageCount() < FREE_DAILY_LIMIT
}

export function getRemainingCount(): number {
  return Math.max(0, FREE_DAILY_LIMIT - getUsageCount())
}
