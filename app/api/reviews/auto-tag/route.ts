import { NextResponse } from 'next/server'
import { listFeedback, updateFeedback } from '@/lib/feedbackStore'

const keywords = ['good', 'great', 'love', 'awesome', 'excellent', 'ดีที่สุด']

export async function POST() {
  const list = await listFeedback()
  let updated = 0
  await Promise.all(
    list.map(async (fb) => {
      if (
        fb.rating === 5 &&
        fb.message &&
        keywords.some((k) => fb.message!.toLowerCase().includes(k))
      ) {
        const tags = fb.tags || []
        if (!tags.includes('👍 featured')) {
          tags.push('👍 featured')
          updated++
          await updateFeedback(fb.id, { tags })
        }
      }
    }),
  )
  return NextResponse.json({ success: true, updated })
}
