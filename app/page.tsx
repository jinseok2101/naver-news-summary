'use client'

import { useState } from 'react'
import NewsForm from '@/components/NewsForm'
import SummaryResult from '@/components/SummaryResult'

export default function HomePage() {
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (url: string) => {
    setLoading(true)
    const res = await fetch('/api/summarize', {
      method: 'POST',
      body: JSON.stringify({ url }),
      headers: { 'Content-Type': 'application/json' },
    })

    const data = await res.json()
    setSummary(data || '요약 실패')
    setLoading(false)
  }

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">📰 네이버 뉴스 요약기</h1>
      <NewsForm onSubmit={handleSubmit} />
      {loading ? <p className="mt-6">요약 중...</p> : summary && <SummaryResult text={summary} />}
    </main>
  )
}
