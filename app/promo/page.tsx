import PromoClient from './PromoClient'
import { headers } from 'next/headers'
import type { Metadata } from 'next'

export function generateMetadata(): Metadata {
  const lang = headers().get('accept-language') || ''
  const th = lang.includes('th')
  return { title: th ? 'โปรโมชันพิเศษ' : 'Limited Promotion', description: th ? 'ข้อเสนอเวลาจำกัด รีบเลย' : 'Limited time deals, hurry!' }
}

export default function PromoPage() { return <PromoClient /> }
