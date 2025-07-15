"use client"
import { useParams } from 'next/navigation'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { loadConversations, getConversation } from '@/lib/mock-conversations'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function ChatHistoryPage() {
  const params = useParams<{ id: string }>()
  const id = params.id
  const [conv, setConv] = useState(() => getConversation(id))

  useEffect(() => {
    loadConversations()
    setConv(getConversation(id))
  }, [id])

  if (!conv) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>ไม่พบข้อมูล</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 space-y-4">
        <h1 className="text-xl font-bold">ประวัติการส่งบิล</h1>
        {conv.bills.length > 0 ? (
          <ul className="space-y-2">
            {conv.bills.map((b) => (
              <li key={b} className="border p-2 rounded">
                <Link href={`/chat-bill/${b}`}>บิล {b}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">ยังไม่เคยส่งบิล</p>
        )}
      </div>
      <Footer />
    </div>
  )
}
