'use client'
import { useState } from 'react'

export default function NewsForm({ onSubmit }: { onSubmit: (url: string) => void }) {
  const [url, setUrl] = useState('')

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            📰 네이버 뉴스 요약기
          </h1>
          <p className="text-gray-600 text-lg">
            네이버 뉴스 링크를 입력하면 핵심 내용을 요약해드려요
          </p>
        </div>
        
        <form
          onSubmit={(e) => {
            e.preventDefault()
            onSubmit(url)
          }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="https://n.news.naver.com/... 뉴스 URL을 입력하세요"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full px-6 py-4 pl-12 text-lg border-2 border-gray-200 rounded-xl 
                         focus:border-blue-500 focus:ring-4 focus:ring-blue-50 
                         outline-none transition-all duration-200 
                         placeholder-gray-400 bg-gray-50 focus:bg-white"
            />
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-400 text-xl">🔗</span>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!url.trim()}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 
                       text-white font-bold text-lg rounded-xl
                       hover:from-blue-700 hover:to-blue-800 
                       focus:ring-4 focus:ring-blue-200
                       disabled:from-gray-300 disabled:to-gray-400
                       disabled:cursor-not-allowed
                       transform transition-all duration-200 
                       hover:scale-105 active:scale-95
                       shadow-lg hover:shadow-xl
                       whitespace-nowrap min-w-[120px]"
          >
            ✨ 요약하기
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            💡 TIP: 네이버 뉴스 기사 URL만 지원됩니다
          </p>
        </div>
      </div>
    </div>
  )
}