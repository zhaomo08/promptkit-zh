import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const client = new OpenAI({
  apiKey: process.env.LLM_API_KEY,
  baseURL: process.env.LLM_BASE_URL,
})

const MODEL = process.env.LLM_MODEL || 'gpt-4o-mini'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const { scenario } = body

  if (!scenario || typeof scenario !== 'string' || !scenario.trim()) {
    return NextResponse.json({ error: '请输入使用场景' }, { status: 400 })
  }

  if (scenario.trim().length > 200) {
    return NextResponse.json({ error: '场景描述不能超过200字' }, { status: 400 })
  }

  const completion = await client.chat.completions.create({
    model: MODEL,
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `你是专业的AI提示词工程师。用户的写作场景：${scenario.trim()}

请生成3个不同风格的高质量Prompt：

**变体1（直接指令型）**
[适合直接告诉AI做什么，简洁明确]

**变体2（角色扮演型）**
[让AI扮演专业角色，输出更有专业感]

**变体3（结构化型）**
[用编号/步骤约束输出格式，适合需要规范化内容的场景]

每个Prompt可直接复制使用，包含必要的上下文、约束条件和输出格式要求。`,
      },
    ],
  })

  const text = completion.choices[0]?.message?.content
  if (!text) {
    return NextResponse.json({ error: '生成失败，请重试' }, { status: 500 })
  }

  return NextResponse.json({ result: text })
}
