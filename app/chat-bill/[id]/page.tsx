"use client"
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getChatBill, loadChatBills } from '@/lib/mock-chat-bills'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function ChatBillPage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const [bill, setBill] = useState(() => getChatBill(id))
  const [responded, setResponded] = useState(false)
  const router = useRouter()
  useEffect(() => {
    loadChatBills()
    setBill(getChatBill(id))
  }, [id])

  useEffect(() => {
    const t = setTimeout(() => {
      if (!responded) {
        alert('หากข้อมูลนี้โอเค กดตอบกลับด้านล่างได้เลยครับพี่')
      }
    }, 15000)
    return () => clearTimeout(t)
  }, [responded])

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
        <div className="border rounded-lg p-4 space-y-4 max-w-xl mx-auto flex flex-col md:flex-col">
          <div className="flex justify-center md:justify-end order-first md:order-none">
            <img src="/placeholder.svg" alt="QR" className="w-40 h-40" />
          </div>
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
          <div className="flex justify-between font-bold bg-yellow-50 border border-yellow-300 rounded px-3 py-2">
            <span>ยอดรวม</span>
            <span>฿{bill.total.toLocaleString()}</span>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
            <button
              className="flex-1 bg-primary text-white rounded py-2"
              onClick={() => {
                setResponded(true)
                router.push(`/chat?bill=${id}&fb=ok`)
              }}
            >
              บิลนี้โอเคครับ/ค่ะ
            </button>
            <button
              className="flex-1 border rounded py-2"
              onClick={() => {
                setResponded(true)
                router.push(`/chat?bill=${id}&fb=fix`)
              }}
            >
              มีจุดอยากแก้
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
