import { Bookmark } from '@/types/bookmark'

const BOOKMARK_STORAGE_KEY = 'news_bookmarks'

export const bookmarkUtils = {
  // 모든 북마크 가져오기
  getBookmarks(): Bookmark[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(BOOKMARK_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  },

  // 북마크 저장
  saveBookmark(bookmark: Omit<Bookmark, 'id' | 'createdAt'>): void {
    if (typeof window === 'undefined') return
    
    const bookmarks = this.getBookmarks()
    const newBookmark: Bookmark = {
      ...bookmark,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    
    bookmarks.unshift(newBookmark) // 최신 것을 맨 앞에
    localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(bookmarks))
  },

  // 북마크 삭제
  deleteBookmark(id: string): void {
    if (typeof window === 'undefined') return
    
    const bookmarks = this.getBookmarks()
    const filtered = bookmarks.filter(b => b.id !== id)
    localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(filtered))
  },

  // URL로 북마크 존재 여부 확인
  isBookmarked(url: string): boolean {
    const bookmarks = this.getBookmarks()
    return bookmarks.some(b => b.url === url)
  }
}