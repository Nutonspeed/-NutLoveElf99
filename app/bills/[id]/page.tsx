"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/buttons/button'
import { getBill } from '@/lib/mock-bills'
import { addAdminLog } from '@/lib/mock-admin-logs'
import { addBillEditRequest } from '@/lib/mock-bill-edit-requests'
import { useToast } from '@/hooks/use-toast'

export default function BillChatPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const { toast } = useToast()
  const [bill] = useState(() => getBill(id))
  const [duplicate, setDuplicate] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [note, setNote] = useState('')

  useEffect(() => {
    const key = `billSeen-${id}`
    const today = new Date().toDateString()
    const val = typeof window !== 'undefined' ? localStorage.getItem(key) : null
    if (val === today) setDuplicate(true)
    if (typeof window !== 'undefined') localStorage.setItem(key, today)
  }, [id])

  if (!bill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        ไม่พบบิลนี้
      </div>
    )
  }

  const chatRef = `bill:${id}:${bill.items.map((i) => i.productName || i.name).join(',')}`

  const redirect = () => router.push(`/chat?ref=${encodeURIComponent(chatRef)}`)

  const handleOk = () => {
    addAdminLog(`confirm bill ${id}`, 'customer')
    toast({ title: 'รับทราบแล้วครับ แอดมินจะติดต่อกลับทันที' })
    setTimeout(redirect, 2000)
  }

  const handleSend = () => {
    if (!note.trim()) return
    addBillEditRequest({ billId: id, text: note.trim(), createdAt: new Date().toISOString() })
    toast({ title: 'ส่งคำขอแล้วครับ' })
    setTimeout(() => router.push('/chat?ref=edit-request'), 2000)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 space-y-4">
        {duplicate && (
          <div className="bg-yellow-100 text-yellow-700 p-2 rounded">
            ไม่ต้องกดซ้ำครับพี่ แอดมินได้รับข้อมูลแล้ว และกำลังจัดการให้อยู่
          </div>
        )}
        <h1 className="text-2xl font-bold text-center">บิล {bill.id}</h1>
        <div className="border rounded-lg p-4 space-y-2 max-w-xl mx-auto">
          {bill.items.map((it) => (
            <div key={it.productId} className="flex justify-between">
              <span>{it.productName || it.name}</span>
              <span>฿{it.price.toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between font-bold border-t pt-2">
            <span>ยอดรวม</span>
            <span>฿{bill.items.reduce((s,i)=>s+i.price,0).toLocaleString()}</span>
          </div>
        </div>
        <div className="flex justify-center space-x-2">
          <Button onClick={handleOk}>บิลนี้โอเคครับ/ค่ะ</Button>
          <Button variant="outline" onClick={() => setShowEdit(true)}>
            มีจุดอยากแก้
          </Button>
        </div>
        {showEdit && (
          <div className="space-y-2 max-w-xl mx-auto">
            <textarea
              className="w-full border rounded p-2"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <Button onClick={handleSend}>ส่งคำขอแก้ไข</Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
