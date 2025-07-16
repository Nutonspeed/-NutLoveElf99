import { mockBills } from './mock-bills'
import { getMockNow } from './mock-date'

const DAILY_MESSAGES = [
  'วันนี้ยอดเบา ๆ แอดมินอย่าลืมพักนะคะ \u2615',
  'มีบิลค้างอยู่นะคะ ลองทักลูกค้าอีกที \uD83D\uDCAC',
  'ยอดขายดีมากเลย! เก็บแต้มไว้เลยนะคะ \uD83C\uDF89',
]

const FALLBACK = 'AI กำลังพักผ่อนวันนี้ ลองใหม่พรุ่งนี้นะคะ \uD83D\uDE0A'

export function getDailyAiMessage(): string {
  try {
    const now = getMockNow ? getMockNow() : new Date()
    const pending = mockBills.filter((b) => b.status === 'pending' || b.status === 'unpaid').length
    if (pending > 0) return DAILY_MESSAGES[1]
    const idx = now.getDate() % DAILY_MESSAGES.length
    return DAILY_MESSAGES[idx] || FALLBACK
  } catch {
    return FALLBACK
  }
}
