"use client"
import { useState } from 'react'
import bills from '@/mock/store/bills.json'
import BillQRSection from '@/components/bill/BillQRSection'
import TransferConfirmForm from '@/components/bill/TransferConfirmForm'
import BillStatusTracker from '@/components/bill/BillStatusTracker'

export default function BillViewPage({ params }: { params: { billId: string } }) {
  const bill = (bills as any[]).find(b => b.id === params.billId)
  const [editAddr, setEditAddr] = useState(false)
  const [address, setAddress] = useState(bill?.address || '')

  if (!bill) {
    return (
      <div className="p-8 text-center text-red-600">ไม่พบบิลนี้</div>
    )
  }

  const sum = bill.items.reduce(
    (s: number, it: any) => s + it.price * it.quantity,
    0,
  )
  const total = sum + bill.shipping

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href)
      alert('คัดลอกลิงก์แล้ว')
    }
  }

  return (
    <div className="p-4 space-y-4 max-w-xl mx-auto">
      <h1 className="text-xl font-bold text-center">บิล {bill.id}</h1>
      <BillStatusTracker status={bill.status} />
      <div className="space-y-1">
        <p className="font-medium">{bill.customer}</p>
        {editAddr ? (
          <div className="space-y-2">
            <textarea
              className="border p-2 w-full"
              value={address}
              onChange={e => setAddress(e.target.value)}
            />
            <button
              className="border px-3 py-1"
              onClick={() => setEditAddr(false)}
            >
              บันทึก
            </button>
          </div>
        ) : (
          <p>{address}</p>
        )}
        <button
          className="text-sm underline text-blue-600"
          onClick={() => setEditAddr(v => !v)}
        >
          แก้ไขที่อยู่
        </button>
      </div>
      <ul className="divide-y">
        {bill.items.map((it: any, i: number) => (
          <li key={i} className="flex justify-between py-1 text-sm">
            <span>{it.name} × {it.quantity}</span>
            <span>฿{(it.price * it.quantity).toLocaleString()}</span>
          </li>
        ))}
        <li className="flex justify-between py-1 text-sm">
          <span>ค่าจัดส่ง</span>
          <span>฿{bill.shipping.toLocaleString()}</span>
        </li>
        <li className="flex justify-between font-bold py-1">
          <span>ยอดรวม</span>
          <span>฿{total.toLocaleString()}</span>
        </li>
      </ul>
      {bill.note && <p className="text-sm">หมายเหตุ: {bill.note}</p>}
      <BillQRSection total={total} />
      <TransferConfirmForm billId={bill.id} existing={bill.transferConfirmation} />
      <button className="border px-3 py-1" onClick={handleShare}>คัดลอกลิงก์</button>
    </div>
  )
}
