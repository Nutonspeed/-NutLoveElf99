"use client"
import { useEffect, useState } from 'react'
import { getChatBill, loadChatBills } from '@/lib/mock-chat-bills'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useParams } from 'next/navigation'

export default function ChatBillPage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const [bill, setBill] = useState(() => getChatBill(id))
  useEffect(() => {
    loadChatBills()
    setBill(getChatBill(id))
  }, [id])

  if (!bill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>ไม่พบบิลนี้</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold text-center">
          บิลสำหรับคุณ {bill.fbName} จากแชทเพจ
        </h1>
        <div className="border rounded-lg p-4 space-y-2 max-w-xl mx-auto">
          {bill.items.map((it) => (
            <div key={it.productId} className="flex justify-between">
              <span>{it.name}</span>
              <span>฿{it.price.toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between border-t pt-2 font-semibold">
            <span>ส่วนลด</span>
            <span>-฿{bill.discount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>ยอดรวม</span>
            <span>฿{bill.total.toLocaleString()}</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
