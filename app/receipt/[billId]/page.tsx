import ReceiptPageClient from './ReceiptPageClient'
import { getBills } from '@/core/mock/store'
import { headers } from 'next/headers'
import type { Metadata } from 'next'

export function generateMetadata({ params }: { params: { billId: string } }): Metadata {
  const bill = getBills().find(b => b.id === params.billId)
  if (!bill) return {}
  const lang = headers().get('accept-language') || ''
  const th = lang.includes('th')
  const title = th ? `ใบเสร็จ ${bill.id}` : `Receipt ${bill.id}`
  const description = th ? 'ใบเสร็จคำสั่งซื้อของคุณ' : 'Your purchase receipt'
  const image = `/api/og/receipt/${bill.id}`
  return { title, description, openGraph: { title, description, images: [{ url: image }] } }
}

export default function ReceiptPage({ params }: { params: { billId: string } }) {
  const bill = getBills().find(b => b.id === params.billId)
  if (!bill) {
    return <div className="min-h-screen flex items-center justify-center">ไม่พบใบเสร็จ</div>
  }
  const lang = headers().get('accept-language') || ''
  const th = lang.includes('th')
  const meta = {
    title: th ? `ใบเสร็จ ${bill.id}` : `Receipt ${bill.id}`,
    description: th ? 'ใบเสร็จคำสั่งซื้อของคุณ' : 'Your purchase receipt',
    image: `/api/og/receipt/${bill.id}`,
  }
  return <ReceiptPageClient bill={bill} meta={meta} />
}
