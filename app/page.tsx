'use client'

import { useState } from 'react'
import NewsForm from '@/components/NewsForm'
import SummaryResult from '@/components/SummaryResult'

export default function HomePage() {
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (url: string) => {
    setLoading(true)
    setSummary(null) // 이전 결과 초기화
    
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        body: JSON.stringify({ url }),
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await res.json()
      setSummary(data || '요약 실패')
    } catch (error) {
      setSummary('네트워크 오류가 발생했습니다.')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <main className="container mx-auto px-4 py-8">
        {/* NewsForm 컴포넌트에서 제목을 처리하므로 여기서는 제거 */}
        <NewsForm onSubmit={handleSubmit} />
        
        {/* 로딩 상태 */}
        {loading && (
          <div className="w-full max-w-4xl mx-auto mt-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="inline-flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-lg text-gray-700 font-medium">
                  뉴스를 분석하고 요약하는 중...
                </span>
              </div>
              <div className="mt-4 w-full bg-blue-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* 요약 결과 */}
        {!loading && summary && <SummaryResult text={summary} />}
      </main>
    </div>
  )
}