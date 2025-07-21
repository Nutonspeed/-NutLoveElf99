"use client"
import FeedbackForm from '@/components/FeedbackForm'
import { getBills } from '@/core/mock/store'
import Link from 'next/link'

export default function BillFeedbackPage({ params }: { params: { billId: string } }) {
  const bill = getBills().find(b => b.id === params.billId)
  if (!bill) return <div className="p-4">ไม่พบใบเสร็จ</div>
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-4">
        <h1 className="text-center font-semibold">ให้คะแนนคำสั่งซื้อ {bill.id}</h1>
        <FeedbackForm billId={bill.id} />
        <div className="text-center">
          <Link href={`/receipt/${bill.id}`}>กลับไปที่ใบเสร็จ</Link>
        </div>
      </div>
    </div>
  )
}
