import { JSDOM } from 'jsdom'

export async function extractNaverNewsText(url: string): Promise<string> {
  const res = await fetch(url)
  const html = await res.text()
  const dom = new JSDOM(html)
  const doc = dom.window.document

  const contentElement = doc.querySelector('article') || doc.querySelector('#dic_area')
  if (!contentElement) throw new Error('본문을 찾을 수 없습니다.')

  return contentElement.textContent?.trim() ?? ''
}
