"use client"
import { useEffect, useState } from 'react'
import {
  getChatBill,
  loadChatBills,
  markChatBillSent,
} from '@/lib/mock-chat-bills'
import { addChatMessage } from '@/lib/mock-chat-messages'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/buttons/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/modals/dialog'
import { CopyPageLinkButton } from '@/components/CopyPageLinkButton'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'

export default function ChatBillPage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const [bill, setBill] = useState(() => getChatBill(id))
  const [open, setOpen] = useState(false)
  const [showCopy, setShowCopy] = useState(false)
  useEffect(() => {
    loadChatBills()
    setBill(getChatBill(id))
  }, [id])

  useEffect(() => {
    if (bill && !bill.sessionId) setShowCopy(true)
  }, [bill])

  if (!bill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>ไม่พบบิลนี้</p>
      </div>
    )
  }

  const handleSend = () => {
    if (!bill) return
    if (!bill.sessionId) {
      setShowCopy(true)
      setOpen(false)
      return
    }
    try {
      const chatUrl = `http://localhost:3001/inbox/${bill.sessionId}?msg=/bill/${bill.billId}`
      const w = window.open(chatUrl, '_blank')
      if (!w) throw new Error('no-window')
      const msg = addChatMessage(bill.sessionId, 'bill_created')
      if (msg) {
        msg.text += ` ${window.location.origin}/bill/${bill.billId}`
      }
      markChatBillSent(bill.billId)
      setBill({ ...bill, status: 'sent' })
    } catch (err) {
      toast.error('เปิดแชทไม่ได้')
      setShowCopy(true)
    }
    setOpen(false)
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
        {bill.status === 'sent' ? (
          <p className="text-center text-green-600">ส่งแล้วในแชท</p>
        ) : (
          <div className="text-center">
            <Button onClick={() => setOpen(true)}>แนบบิลเข้าแชท</Button>
          </div>
        )}
        {showCopy && (
          <div className="text-center space-y-2">
            <p>คัดลอกลิงก์บิลส่งให้ลูกค้าแทน</p>
            <CopyPageLinkButton />
          </div>
        )}
      </div>
      <Footer />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>แนบบิลเข้าแชท</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              ยกเลิก
            </Button>
            <Button onClick={handleSend}>ยืนยัน</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
