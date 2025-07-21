"use client"
import { useState } from 'react'
import ModalWrapper from '@/components/ui/ModalWrapper'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'

export default function PaymentConfirmModal({ billId, open, onClose }: { billId: string; open: boolean; onClose: () => void }) {
  const [datetime, setDatetime] = useState('')
  const [method, setMethod] = useState('')
  const [slip, setSlip] = useState<File | null>(null)

  const submit = async () => {
    await fetch(`/api/receipt/${billId}/payment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ datetime, method, slip: slip?.name })
    })
    onClose()
  }

  if (!open) return null
  return (
    <ModalWrapper open={open} onClose={onClose}>
      <div className="space-y-2 w-72">
        <Input type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} />
        <Input placeholder="ช่องทางโอน" value={method} onChange={e => setMethod(e.target.value)} />
        <Input type="file" onChange={e => setSlip(e.target.files?.[0] || null)} />
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="outline" onClick={onClose}>ยกเลิก</Button>
          <Button onClick={submit}>บันทึก</Button>
        </div>
      </div>
    </ModalWrapper>
  )
}
