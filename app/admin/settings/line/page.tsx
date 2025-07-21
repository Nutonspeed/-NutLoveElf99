"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import { Textarea } from '@/components/ui/textarea'

export default function LineSettingsPage() {
  const [to, setTo] = useState('')
  const [message, setMessage] = useState('ทดสอบการส่งข้อความ')

  const handleSend = async () => {
    const res = await fetch('/api/dev/send-line-test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, message }),
    })
    const data = await res.json()
    alert(data.success ? 'sent' : 'failed')
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">ทดสอบ LINE OA</h1>
      <Input placeholder="Recipient ID" value={to} onChange={e => setTo(e.target.value)} />
      <Textarea value={message} onChange={e => setMessage(e.target.value)} />
      <Button onClick={handleSend}>Send</Button>
    </div>
  )
}
