import { NextRequest, NextResponse } from 'next/server'
import { extractArticle } from '@/lib/extractArticle'
import { summarizeWithGemini } from '@/utils/summarizeWithGemini'

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json()
    const { title, content, date, press } = await extractArticle(url)

    const summary = await summarizeWithGemini(content)

    return NextResponse.json({
      title,
      date,
      press,
      summary
    })
  } catch (error) {
    console.error('요약 실패:', error)
    return NextResponse.json({ error: '요약 처리 중 오류 발생' }, { status: 500 })
  }
}
