"use client"
import { useState } from 'react'
import { Input } from '@/components/ui/inputs/input'
import { Button } from '@/components/ui/buttons/button'
import QRCode from 'react-qr-code'

export default function PromptPayPage() {
  const [val, setVal] = useState('')
  const [show, setShow] = useState(false)

  return (
    <div className="container mx-auto max-w-sm space-y-4 py-8">
      <h1 className="text-2xl font-bold">PromptPay QR</h1>
      <Input placeholder="เบอร์โทร/เลขบัตร" value={val} onChange={e=>setVal(e.target.value)} />
      <Button onClick={()=>setShow(true)}>ดูตัวอย่าง</Button>
      {show && (
        <div className="p-4 border rounded w-fit bg-white">
          <QRCode value={val || 'promptpay'} size={128} />
        </div>
      )}
    </div>
  )
}
