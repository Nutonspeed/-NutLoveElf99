"use client"
import { useEffect, useState } from 'react'
import { Noto_Sans_Thai } from 'next/font/google'
import PrintToolbar from '@/components/bill/PrintToolbar'
import BillTimeline from '@/components/bill/BillTimeline'
import type { FakeBill } from '@/core/mock/fakeBillDB'
import { getBillById } from '@/core/mock/fakeBillDB'
import { formatDateThai } from '@/lib/formatDateThai'

const thaiFont = Noto_Sans_Thai({ subsets: ['thai'], weight: ['400', '700'] })

export default function BillPrintPage({ params }: { params: { billId: string } }) {
  const { billId } = params
  const [bill, setBill] = useState<FakeBill | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBillById(billId).then(b => {
      setBill(b)
      setLoading(false)
    })
  }, [billId])

  if (loading) {
    return <div className="p-8">Loading…</div>
  }

  if (!bill) {
    return <div className="p-8">ไม่พบบิลนี้</div>
  }

  const subtotal = bill.items.reduce((s, it) => s + it.unitPrice * it.quantity, 0)

  return (
    <div className={`print-page relative space-y-6 p-4 print:p-6 print:w-[210mm] print:mx-auto ${thaiFont.className}`}>
      <PrintToolbar />
      <h1 className="text-xl font-bold">บิล {bill.id}</h1>
      <p className="font-medium">{bill.customerName}</p>
      <p className="whitespace-pre-line text-sm">{bill.customerAddress}</p>
      <p className="text-sm">โทร: {bill.customerPhone}</p>
      <table className="w-full text-sm border-collapse mt-4">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">สินค้า</th>
            <th className="text-center py-2">จำนวน</th>
            <th className="text-right py-2">ราคา</th>
            <th className="text-right py-2">รวม</th>
          </tr>
        </thead>
        <tbody>
          {bill.items.map((it, i) => (
            <tr key={i} className="border-b last:border-none">
              <td className="py-1">{it.fabricName} {it.sofaType}</td>
              <td className="text-center py-1">{it.quantity}</td>
              <td className="text-right py-1">{it.unitPrice.toLocaleString()}</td>
              <td className="text-right py-1">{(it.unitPrice * it.quantity).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-sm space-y-1 w-48 ml-auto">
        <div className="flex justify-between">
          <span>รวม</span>
          <span>{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between font-semibold border-t pt-1">
          <span>ยอดสุทธิ</span>
          <span>{subtotal.toLocaleString()}</span>
        </div>
      </div>
      <BillTimeline status={bill.status} />
      {(bill.trackingNo || bill.deliveryDate || bill.deliveredAt) && (
        <div className="text-sm space-y-1">
          {bill.trackingNo && <p>Tracking: {bill.trackingNo}</p>}
          {bill.deliveryDate && <p>Delivered: {formatDateThai(bill.deliveryDate)}</p>}
          {bill.deliveredAt && <p>🗓 จัดส่งเมื่อ: {formatDateThai(bill.deliveredAt)}</p>}
        </div>
      )}
      <style jsx>{`
        @media print {
          .print-page {
            padding: 0;
          }
        }
      `}</style>
    </div>
  )
}
