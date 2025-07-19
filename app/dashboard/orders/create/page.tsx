"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { orders as mockOrders } from '@/core/mock/orders'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import { Textarea } from '@/components/ui/textarea'

export default function CreateOrderPage() {
  const router = useRouter()
  const [product, setProduct] = useState('')
  const [customer, setCustomer] = useState('')
  const [address, setAddress] = useState('')
  const [note, setNote] = useState('')
  const [discount, setDiscount] = useState(0)
  const [payment, setPayment] = useState('โอน')
  const [error, setError] = useState('')

  const handleCreate = () => {
    if (!product.trim() || !customer.trim()) {
      setError('กรุณากรอกข้อมูลที่จำเป็น')
      return
    }
    mockOrders.unshift({
      id: `ORD-${String(mockOrders.length + 1).padStart(3, '0')}`,
      customer,
      status: 'pendingPayment',
      total: Math.max(0, 1000 - discount),
      date: new Date().toISOString(),
    })
    router.push('/dashboard/orders')
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">เปิดบิลใหม่</h1>
      <div className="space-y-2 max-w-md">
        <Input placeholder="สินค้า" value={product} onChange={e => setProduct(e.target.value)} />
        <Input placeholder="ชื่อลูกค้า" value={customer} onChange={e => setCustomer(e.target.value)} />
        <Textarea placeholder="ที่อยู่" value={address} onChange={e => setAddress(e.target.value)} />
        <Textarea placeholder="หมายเหตุ" value={note} onChange={e => setNote(e.target.value)} />
        <Input type="number" placeholder="ส่วนลด" value={discount} onChange={e => setDiscount(Number(e.target.value) || 0)} />
        <select className="border rounded p-2 w-full" value={payment} onChange={e => setPayment(e.target.value)}>
          <option value="โอน">โอน</option>
          <option value="เงินสด">เงินสด</option>
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button onClick={handleCreate}>สร้างบิล</Button>
      </div>
    </div>
  )
}
