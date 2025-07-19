"use client"
import { useState } from 'react'
import { orders } from '@/mock/orders'
import { addPayment } from '@/lib/mock/payment'
import { Input } from '@/components/ui/inputs/input'
import { Button } from '@/components/ui/buttons/button'

export default function PaymentUpload() {
  const [orderId, setOrderId] = useState('')
  const [amount, setAmount] = useState('')
  const [slip, setSlip] = useState('')

  const submit = () => {
    if (!orderId) return
    addPayment(orderId, {
      date: new Date().toISOString(),
      amount: parseFloat(amount) || 0,
      method: 'bank',
      slip,
    })
    alert('ส่งข้อมูลแล้ว')
    setOrderId('')
    setAmount('')
    setSlip('')
  }

  return (
    <div className="container mx-auto max-w-md space-y-4 py-8">
      <h1 className="text-2xl font-bold">แจ้งชำระเงิน</h1>
      <select className="border rounded p-2 w-full" value={orderId} onChange={e=>setOrderId(e.target.value)}>
        <option value="">เลือกออเดอร์</option>
        {orders.map(o=> (
          <option key={o.id} value={o.id}>{o.id} - {o.customer}</option>
        ))}
      </select>
      <Input type="number" placeholder="จำนวน" value={amount} onChange={e=>setAmount(e.target.value)} />
      <Input placeholder="ลิงก์สลิป" value={slip} onChange={e=>setSlip(e.target.value)} />
      <Button onClick={submit}>ส่งข้อมูล</Button>
    </div>
  )
}
