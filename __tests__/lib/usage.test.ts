import { getUsageCount, incrementUsage, canGenerate, getRemainingCount } from '@/lib/usage'

beforeEach(() => {
  localStorage.clear()
})

test('getUsageCount 无数据时返回 0', () => {
  expect(getUsageCount()).toBe(0)
})

test('incrementUsage 使计数+1', () => {
  incrementUsage()
  expect(getUsageCount()).toBe(1)
  incrementUsage()
  expect(getUsageCount()).toBe(2)
})

test('canGenerate 未使用时返回 true', () => {
  expect(canGenerate()).toBe(true)
})

test('canGenerate 使用5次后返回 false', () => {
  for (let i = 0; i < 5; i++) incrementUsage()
  expect(canGenerate()).toBe(false)
})

test('getRemainingCount 正确递减', () => {
  expect(getRemainingCount()).toBe(5)
  incrementUsage()
  expect(getRemainingCount()).toBe(4)
  incrementUsage()
  expect(getRemainingCount()).toBe(3)
})

test('不同日期的数据不会累积（模拟昨天的记录）', () => {
  localStorage.setItem('promptkit_usage', JSON.stringify({ date: '2000-01-01', count: 5 }))
  expect(getUsageCount()).toBe(0)
  expect(canGenerate()).toBe(true)
})
