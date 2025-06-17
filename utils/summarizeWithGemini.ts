export async function summarizeWithGemini(text: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`

  const body = {
    contents: [
      {
        role: 'user',
        parts: [{ text: `다음 뉴스를 3줄로 요약해줘:\n\n${text}` }]
      }
    ]
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Gemini API 오류 응답:', errorText)
    throw new Error(`Gemini API 요청 실패: ${response.status} ${response.statusText}`)
  }

  const data = await response.json()
  const result = data.candidates?.[0]?.content?.parts?.[0]?.text
  return result || '요약에 실패했습니다.'
}
