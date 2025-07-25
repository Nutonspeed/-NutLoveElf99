"use client"
import { useEffect, useState } from 'react'
import BillQRSection from '@/components/bill/BillQRSection'

export default function ThankYouPage({ params }: { params: { billId: string } }) {
  const { billId } = params
  const [bill, setBill] = useState<any | null>(null)

  useEffect(() => {
    fetch(`/api/bill/${billId}`)
      .then(r => r.json())
      .then(setBill)
      .catch(() => setBill(null))
  }, [billId])

  if (!bill) return <div className="p-4 text-center">ไม่พบบิลนี้</div>

  const sum = bill.items?.reduce((s: number, it: any) => s + it.price * it.quantity, 0) || 0
  const total = sum + (bill.shipping || 0)

  return (
    <div className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-xl font-bold text-center">ขอบคุณสำหรับการชำระเงิน</h1>
      <ul className="divide-y">
        {bill.items?.map((it: any, i: number) => (
          <li key={i} className="flex justify-between py-1 text-sm">
            <span>{it.name} × {it.quantity}</span>
            <span>฿{(it.price * it.quantity).toLocaleString()}</span>
          </li>
        ))}
        <li className="flex justify-between py-1 text-sm">
          <span>ค่าจัดส่ง</span>
          <span>฿{(bill.shipping || 0).toLocaleString()}</span>
        </li>
        <li className="flex justify-between font-bold py-1">
          <span>ยอดรวม</span>
          <span>฿{total.toLocaleString()}</span>
        </li>
      </ul>
      <div className="space-y-1 text-sm">
        <p className="font-semibold">จัดส่งถึง</p>
        <p>{bill.customerAddress}</p>
      </div>
      <BillQRSection total={total} />
    </div>
  )
}
