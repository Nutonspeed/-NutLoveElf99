"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addOrder } from '@/core/mock/store'
import { getCustomers } from '@/core/mock/store'
import { mockProducts } from '@/lib/mock-products'
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
    if (!product || !customer) {
      setError('กรุณากรอกข้อมูลที่จำเป็น')
      return
    }
    const prod = mockProducts.find(p => p.id === product)!
    const cust = getCustomers().find(c => c.id === customer)!
    addOrder({
      id: `ORD-${Date.now()}`,
      customerId: cust.id,
      customerName: cust.name,
      customerEmail: cust.email,
      items: [{ productId: prod.id, productName: prod.name, quantity: 1, price: prod.price }],
      total: Math.max(0, prod.price - discount),
      status: 'pending',
      createdAt: new Date().toISOString(),
      shippingAddress: { name: cust.name, address, city: '', postalCode: '', phone: cust.phone || '' },
      delivery_method: '',
      tracking_number: '',
      shipping_fee: 0,
      shipping_status: 'pending',
      packingStatus: 'packing',
      shipping_date: '',
      delivery_note: note,
      timeline: []
    })
    router.push('/dashboard/orders')
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">เปิดบิลใหม่</h1>
      <div className="space-y-2 max-w-md">
        <select className="border rounded p-2 w-full" value={product} onChange={e=>setProduct(e.target.value)}>
          <option value="">เลือกสินค้า</option>
          {mockProducts.map(p=> (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <select className="border rounded p-2 w-full" value={customer} onChange={e=>setCustomer(e.target.value)}>
          <option value="">เลือกลูกค้า</option>
          {getCustomers().map(c=> (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
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
