"use client"
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export default function BillFeedbackPage({ params }: { params: { billId: string } }) {
  const { billId } = params
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const { toast } = useToast()

  const submit = async () => {
    if (!message || sent) return
    const res = await fetch('/api/feedback/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ billId, message }),
    })
    if (res.ok) {
      toast({ title: 'ส่งคำร้องแล้ว' })
      setSent(true)
    } else {
      toast({ title: 'ส่งไม่สำเร็จ', variant: 'destructive' })
    }
  }

  return (
    <div className="p-4 max-w-md mx-auto space-y-3">
      <h1 className="text-xl font-bold text-center">แจ้งปัญหาบิล {billId}</h1>
      {sent ? (
        <p className="text-center text-green-600">บันทึกคำร้องแล้ว</p>
      ) : (
        <>
          <textarea
            className="border p-2 w-full"
            rows={4}
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="แจ้งปัญหา หรือต้องการแก้ไขออเดอร์"
          />
          <button onClick={submit} className="border px-4 py-1">ส่งข้อความ</button>
        </>
      )}
    </div>
  )
}
