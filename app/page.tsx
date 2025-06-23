'use client'

import { useState } from 'react'
import NewsForm from '@/components/NewsForm'
import SummaryResult from '@/components/SummaryResult'
import BookmarkList from '@/components/BookmarkList'

export default function HomePage() {
  const [summary, setSummary] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const [activeTab, setActiveTab] = useState<'summary' | 'bookmarks'>('summary')

  const handleSubmit = async (url: string) => {
    setLoading(true)
    setSummary(null)
    setCurrentUrl(url)
    setActiveTab('summary') // 요약 탭으로 전환
    
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
        <NewsForm onSubmit={handleSubmit} />
        
        {/* 탭 네비게이션 */}
        <div className="w-full max-w-4xl mx-auto mt-8">
          <div className="flex border-b border-gray-200 bg-white rounded-t-2xl shadow-sm">
            <button
              onClick={() => setActiveTab('summary')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
                activeTab === 'summary'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span>📰</span>
                <span>뉴스 요약</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 ${
                activeTab === 'bookmarks'
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <span className="inline-flex items-center gap-2">
                <span>📚</span>
                <span>북마크 목록</span>
              </span>
            </button>
          </div>
        </div>

        {/* 탭 내용 */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-b-2xl shadow-lg min-h-[400px]">
            {activeTab === 'summary' ? (
              <div className="p-8">
                {/* 로딩 상태 */}
                {loading && (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center gap-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="text-lg text-gray-700 font-medium">
                        뉴스를 분석하고 요약하는 중...
                      </span>
                    </div>
                    <div className="mt-4 w-full max-w-md mx-auto bg-blue-100 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
                    </div>
                  </div>
                )}
                
                {/* 요약 결과 */}
                {!loading && summary && (
                  <div className="-m-8"> {/* 패딩 제거를 위한 음수 마진 */}
                    <SummaryResult text={summary} url={currentUrl} />
                  </div>
                )}
                
                {/* 초기 상태 */}
                {!loading && !summary && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📰</div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      뉴스 URL을 입력해주세요
                    </h3>
                    <p className="text-gray-500">
                      네이버 뉴스 링크를 입력하면 AI가 핵심 내용을 요약해드려요
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8">
                <BookmarkList />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}