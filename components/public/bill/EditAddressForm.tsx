'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/inputs/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/buttons/button'
import { toast } from 'sonner'

export default function EditAddressForm({
  billId,
  name: initName,
  phone: initPhone,
  address: initAddress,
}: {
  billId: string
  name: string
  phone: string
  address: string
}) {
  const [name, setName] = useState(initName)
  const [phone, setPhone] = useState(initPhone)
  const [address, setAddress] = useState(initAddress)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch(`/api/bill/${billId}/edit-address`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, phone, address }),
    })
    setLoading(false)
    if (res.ok) {
      toast.success('บันทึกที่อยู่แล้ว')
    } else {
      toast.error('เกิดข้อผิดพลาด')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <Input value={name} onChange={e => setName(e.target.value)} placeholder="ชื่อ-นามสกุล" />
      <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="เบอร์โทร" />
      <Textarea
        value={address}
        onChange={e => setAddress(e.target.value)}
        rows={3}
        placeholder="ที่อยู่จัดส่ง"
      />
      <Button type="submit" size="sm" disabled={loading} className="w-full">
        บันทึกที่อยู่
      </Button>
    </form>
  )
}
