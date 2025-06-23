'use client'

import { useState, useEffect } from 'react'
import { Bookmark } from '@/types/bookmark'
import { bookmarkUtils } from '@/utils/bookmarkUtils'

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setBookmarks(bookmarkUtils.getBookmarks())
    setIsLoading(false)
  }, [])

  const handleDelete = (id: string) => {
    if (confirm('이 북마크를 삭제하시겠습니까?')) {
      bookmarkUtils.deleteBookmark(id)
      setBookmarks(bookmarkUtils.getBookmarks())
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📖</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          저장된 북마크가 없습니다
        </h3>
        <p className="text-gray-500">
          뉴스를 요약한 후 북마크 버튼을 눌러 저장해보세요!
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          📚 북마크 목록 ({bookmarks.length})
        </h2>
      </div>

      <div className="grid gap-6">
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id} 
               className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden
                          hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {bookmark.title}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <span>🏢</span>
                      <span>{bookmark.press}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>📅</span>
                      <span>{bookmark.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>💾</span>
                      <span>{formatDate(bookmark.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(bookmark.id)}
                  className="flex-shrink-0 ml-4 p-2 text-gray-400 hover:text-red-500 
                           hover:bg-red-50 rounded-full transition-all duration-200"
                  title="북마크 삭제"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-600">✨</span>
                  <span className="text-sm font-semibold text-blue-800">요약</span>
                </div>
                <p className="text-gray-700 leading-relaxed text-sm">
                  {bookmark.summary}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white 
                           text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <span>📰</span>
                  <span>원문 보기</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <div className="text-xs text-gray-400">
                  ID: {bookmark.id}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}