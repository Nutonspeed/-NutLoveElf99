'use client'
import { useState } from 'react'

export default function EditAddressForm({
  billId,
  name,
  phone,
  address,
}: {
  billId: string
  name: string
  phone: string
  address: string
}) {
  const [customerName, setCustomerName] = useState(name)
  const [customerPhone, setCustomerPhone] = useState(phone)
  const [customerAddress, setCustomerAddress] = useState(address)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await fetch(`/api/bill/${billId}/edit-address`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: customerName,
        phone: customerPhone,
        address: customerAddress,
      }),
    })
    setLoading(false)
    alert('บันทึกแล้ว')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <input
        className="border p-2 w-full"
        value={customerName}
        onChange={e => setCustomerName(e.target.value)}
        placeholder="ชื่อลูกค้า"
      />
      <input
        className="border p-2 w-full"
        value={customerPhone}
        onChange={e => setCustomerPhone(e.target.value)}
        placeholder="เบอร์โทร"
      />
      <textarea
        className="border p-2 w-full"
        rows={3}
        value={customerAddress}
        onChange={e => setCustomerAddress(e.target.value)}
        placeholder="ที่อยู่จัดส่ง"
      />
      <button type="submit" disabled={loading} className="border px-3 py-1">
        {loading ? 'saving...' : 'บันทึกที่อยู่'}
      </button>
    </form>
  )
}
