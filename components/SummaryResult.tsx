'use client'

import { useState, useEffect } from 'react'
import { bookmarkUtils } from '@/utils/bookmarkUtils'

interface SummaryResultProps {
  text: string | {
    title: string
    date: string
    press: string
    summary: string
  }
  url?: string
}

export default function SummaryResult({ text, url }: SummaryResultProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [showBookmarkAnimation, setShowBookmarkAnimation] = useState(false)

  useEffect(() => {
    if (typeof text === 'object') {
      // URL이 있든 없든 북마크 상태 확인
      const checkUrl = url || `bookmark-${text.title}-${Date.now()}`
      setIsBookmarked(bookmarkUtils.isBookmarked(checkUrl))
    }
  }, [url, text])

  const handleBookmark = () => {
    if (typeof text === 'string') return

    if (isBookmarked) {
      // 북마크 해제 로직은 복잡하므로 일단 알림만
      alert('북마크를 해제하려면 북마크 목록에서 삭제해주세요.')
      return
    }

    // 북마크 저장 (URL이 없어도 저장)
    bookmarkUtils.saveBookmark({
      url: url || window.location.href, // URL이 없으면 현재 페이지 URL 사용
      title: text.title,
      summary: text.summary,
      press: text.press,
      date: text.date
    })

    setIsBookmarked(true)
    setShowBookmarkAnimation(true)
    
    // 애니메이션 초기화
    setTimeout(() => setShowBookmarkAnimation(false), 1000)
  }

  if (typeof text === 'string') {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8">
        <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-400 
                        rounded-xl p-6 shadow-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-red-800">오류가 발생했습니다</h3>
              <p className="text-red-700 mt-1">{text}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="bg-white shadow-2xl rounded-3xl overflow-hidden border border-gray-100">
        {/* 헤더 섹션 */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white leading-tight mb-3">
                {text.title}
              </h2>
              <div className="flex flex-wrap gap-4 text-blue-100">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🏢</span>
                  <span className="font-medium">{text.press}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">📅</span>
                  <span className="font-medium">{text.date}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 ml-4">
              {/* 북마크 버튼 - 항상 표시 */}
              {(
                <button
                  onClick={handleBookmark}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl font-bold
                            transition-all duration-300 border-2 ${
                    isBookmarked 
                      ? 'bg-yellow-400 text-yellow-900 hover:bg-yellow-300 border-yellow-500' 
                      : 'bg-white text-blue-600 hover:bg-blue-50 border-white shadow-lg'
                  } ${showBookmarkAnimation ? 'animate-bounce' : ''}`}
                  title={isBookmarked ? '북마크됨' : '북마크에 저장'}
                >
                  <span className={`text-lg transition-transform duration-300 ${
                    showBookmarkAnimation ? 'scale-125' : ''
                  }`}>
                    {isBookmarked ? '⭐' : '🔖'}
                  </span>
                  <span className="text-sm font-bold">
                    {isBookmarked ? '저장됨' : '저장'}
                  </span>
                  
                  {/* 북마크 성공 알림 */}
                  {showBookmarkAnimation && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                                  bg-green-500 text-white text-xs px-2 py-1 rounded 
                                  animate-fade-in-up">
                      저장됨!
                    </div>
                  )}
                </button>
              )}
              
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3">
                <span className="text-2xl">📰</span>
              </div>
            </div>
          </div>
        </div>

        {/* 요약 섹션 */}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-full p-2">
              <span className="text-white text-lg">✨</span>
            </div>
            <h3 className="text-xl font-bold text-gray-800">핵심 요약</h3>
            <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-6 
                          border border-gray-200 shadow-inner">
            <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">
              {text.summary}
            </p>
          </div>
          
          {/* 푸터 */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <span>🤖</span>
              <span>AI가 요약한 내용입니다</span>
              <span>•</span>
              <span>정확성을 위해 원문을 확인해주세요</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}