"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/modals/dialog'

interface Message {
  from: 'user' | 'assistant'
  text: string
}

export default function AdminAssistantPage() {
  const [command, setCommand] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [pending, setPending] = useState<string | null>(null)
  const [history, setHistory] = useState<string[]>([])

  const handleSend = () => {
    const text = command.trim()
    if (!text) return
    setMessages((m) => [...m, { from: 'user', text }])
    if (text.includes('ผ้ากลุ่มเทา')) {
      setPending(text)
    } else {
      setMessages((m) => [
        ...m,
        { from: 'assistant', text: 'ขออภัย ไม่เข้าใจคำสั่ง' },
      ])
      setHistory((h) => [text, ...h].slice(0, 5))
    }
    setCommand('')
  }

  const confirm = () => {
    if (!pending) return
    setMessages((m) => [
      ...m,
      { from: 'assistant', text: `ยืนยันคำสั่ง \"${pending}\"` },
    ])
    setHistory((h) => [pending, ...h].slice(0, 5))
    setPending(null)
  }

  const cancel = () => {
    setPending(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ผู้ช่วยแอดมิน (Mock)</h1>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/3 space-y-2">
            <h2 className="font-semibold">ประวัติล่าสุด</h2>
            <ul className="space-y-1 text-sm">
              {history.map((h, i) => (
                <li key={i} className="border rounded p-2 bg-white">
                  {h}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 flex flex-col border rounded bg-white p-4">
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={m.from === 'user' ? 'text-right' : 'text-left'}
                >
                  <div className="inline-block bg-gray-100 p-2 rounded">
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                placeholder="พิมพ์คำสั่ง..."
              />
              <Button onClick={handleSend}>ส่ง</Button>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={!!pending} onOpenChange={cancel}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ยืนยันคำสั่ง</DialogTitle>
          </DialogHeader>
          <p className="py-2">ต้องการดำเนินการคำสั่ง: "{pending}" หรือไม่?</p>
          <DialogFooter>
            <Button variant="secondary" onClick={cancel}>
              ยกเลิกคำสั่ง
            </Button>
            <Button onClick={confirm}>ยืนยันคำสั่ง</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
