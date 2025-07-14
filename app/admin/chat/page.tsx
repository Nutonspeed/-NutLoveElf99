"use client"

import { useEffect, useState } from 'react'
import CreateChatBillDialog from '@/components/admin/chat/CreateChatBillDialog'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'

export default function AdminChatPage() {
  const chatwootUrl = process.env.NEXT_PUBLIC_CHATWOOT_URL || 'http://localhost:3000'
  const [newBillId, setNewBillId] = useState<string | null>(null)
  useEffect(() => {
    window.open(chatwootUrl, '_blank')
  }, [chatwootUrl])

  const origin = typeof window !== 'undefined' ? window.location.origin : ''

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4">
      <p>กำลังเปิดหน้าต่างแชท...</p>
      <CreateChatBillDialog onCreated={setNewBillId} />
      {newBillId && (
        <div className="space-y-2 text-center">
          <p>บิลสร้างแล้ว:</p>
          <Link href={`/chat-bill/${newBillId}`} className="text-blue-600 underline">
            {`${origin}/chat-bill/${newBillId}`}
          </Link>
          <div>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(`${origin}/chat-bill/${newBillId}`)
                alert('คัดลอกลิงก์แล้ว')
              }}
            >
              คัดลอกลิงก์เพื่อส่งในแชท
            </Button>
          </div>
          <p className="text-sm border rounded-md p-2 bg-gray-50">
            {`สวัสดีค่ะ นี่คือบิลของคุณ ${origin}/chat-bill/${newBillId}`}
          </p>
        </div>
      )}
    </div>
  )
}
