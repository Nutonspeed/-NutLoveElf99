"use client"
import { useSearchParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useToast } from '@/hooks/use-toast'

export default function CustomerEditAddressPage() {
  const search = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const billId = search.get('billId') || ''
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')

  useEffect(() => {
    if (!billId) return
    fetch(`/api/bill/${billId}`)
      .then(r => r.json())
      .then(b => {
        setName(b.customerName || b.customer || '')
        setPhone(b.customerPhone || b.phone || '')
        setAddress(b.customerAddress || b.address || '')
      })
      .finally(() => setLoading(false))
  }, [billId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/bill/update-address', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ billId, name, phone, address }),
    })
    if (res.ok) {
      toast({ title: 'บันทึกข้อมูลแล้ว' })
      router.back()
    } else {
      toast({ title: 'บันทึกไม่สำเร็จ', variant: 'destructive' })
    }
  }

  if (!billId) return <div className="p-4 text-center">ไม่พบบิล</div>

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold text-center mb-4">แก้ไขที่อยู่จัดส่ง</h1>
      {!loading && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm mb-1">ชื่อ</label>
            <input className="border p-2 w-full" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">โทรศัพท์</label>
            <input className="border p-2 w-full" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">ที่อยู่</label>
            <textarea className="border p-2 w-full" value={address} onChange={e => setAddress(e.target.value)} />
          </div>
          <button type="submit" className="border px-4 py-1">บันทึก</button>
        </form>
      )}
    </div>
  )
}
