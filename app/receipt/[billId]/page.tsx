import type { Metadata } from 'next'
import ReceiptPageClient from './ReceiptPageClient'
import { getBills } from '@/core/mock/store'

export async function generateMetadata({ params }: { params: { billId: string } }): Promise<Metadata> {
  const bill = getBills().find(b => b.id === params.billId)
  const title = bill ? `ใบเสร็จ ${bill.id}` : 'ไม่พบใบเสร็จ'
  const description = 'ใบเสร็จคำสั่งซื้อของคุณ'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: `/api/receipt/${params.billId}/og` }],
    },
    robots: { index: false },
  }
}

export default function ReceiptPage({ params }: { params: { billId: string } }) {
  const bill = getBills().find(b => b.id === params.billId)
  if (!bill) {
    return <div className="min-h-screen flex items-center justify-center">ไม่พบใบเสร็จ</div>
  }
  return <ReceiptPageClient bill={bill} />
}
