import LiveFeedClient from './LiveFeedClient'
import { headers } from 'next/headers'
import type { Metadata } from 'next'

export function generateMetadata(): Metadata {
  const lang = headers().get('accept-language') || ''
  const th = lang.includes('th')
  return {
    title: th ? 'การสั่งซื้อแบบเรียลไทม์' : 'Live Order Feed',
    description: th ? 'ออเดอร์ใหม่กำลังเข้ามา' : 'Recent orders streaming',
  }
}

export default function LiveFeedPage() {
  return <LiveFeedClient />
}
