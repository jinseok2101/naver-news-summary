import * as cheerio from 'cheerio'
import axios from 'axios'

export async function extractArticle(url: string): Promise<{
  title: string
  content: string
  date: string
  press: string
}> {
  const { data: html } = await axios.get(url)
  const $ = cheerio.load(html)

  const title = $('h2#title_area span').first().text().trim()
  const content = $('#dic_area').text().trim()
  const date = $('span.media_end_head_info_datestamp_time').first().text().trim()
  const press = $('a.media_end_head_top_logo img').attr('alt')?.trim()

  return {
    title: title || '제목 없음',
    content: content || '본문 없음',
    date: date || '날짜 없음',
    press: press || '언론사 없음',
  }
}
