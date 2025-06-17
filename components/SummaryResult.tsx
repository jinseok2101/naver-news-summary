interface SummaryResultProps {
  text: string | {
    title: string
    date: string
    press: string
    summary: string
  }
}

export default function SummaryResult({ text }: SummaryResultProps) {
  if (typeof text === 'string') {
    return <div className="mt-6 whitespace-pre-wrap">{text}</div>
  }

  return (
    <div className="mt-6 space-y-2">
      <p><strong>📰 제목:</strong> {text.title}</p>
      <p><strong>🗓 날짜:</strong> {text.date}</p>
      <p><strong>🏢 언론사:</strong> {text.press}</p>
      <p className="mt-4 whitespace-pre-wrap"><strong>📝 요약:</strong> {text.summary}</p>
    </div>
  )
}
