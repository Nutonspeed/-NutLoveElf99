"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { loadConversations, listConversations, addTag } from '@/lib/mock-conversations'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'

export default function AdminChatPage() {
  const [filter, setFilter] = useState('')
  const [convs, setConvs] = useState(listConversations())

  useEffect(() => {
    loadConversations()
    setConvs(listConversations(filter || undefined))
  }, [filter])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-bold">แชทลูกค้า</h1>
        <div className="flex space-x-2">
          <Input
            placeholder="ค้นหาด้วยแท็ก"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <ul className="space-y-2">
          {convs.map((c) => (
            <li key={c.id} className="border p-2 rounded flex justify-between">
              <div>
                <p>Conversation {c.id}</p>
                {c.tags.length > 0 && (
                  <p className="text-sm text-gray-500">{c.tags.join(', ')}</p>
                )}
              </div>
              <div className="space-x-2">
                <Link href={`/chat/history/${c.id}`}>ดูบิล</Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const tag = prompt('เพิ่มแท็ก')
                    if (tag) {
                      addTag(c.id, tag)
                      setConvs(listConversations(filter || undefined))
                    }
                  }}
                >
                  เพิ่มแท็ก
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  )
}
