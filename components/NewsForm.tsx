'use client'
import { useState } from 'react'

export default function NewsForm({ onSubmit }: { onSubmit: (url: string) => void }) {
  const [url, setUrl] = useState('')

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(url)
      }}
      className="flex gap-2 items-center"
    >
      <input
        type="text"
        placeholder="네이버 뉴스 URL 입력"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        요약
      </button>
    </form>
  )
}
