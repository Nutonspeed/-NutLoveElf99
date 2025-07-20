'use client'
import { useState } from 'react'
import type { Bill } from '@/libs/schema/bill'
import { BillSchema } from '@/libs/schema/bill'
import { createBill } from '@/libs/api/bill'

export default function BillForm() {
  const [data, setData] = useState<Bill>({
    customerName: '',
    customerPhone: '',
    note: '',
    paymentMethod: 'cash',
    total: 0,
    items: [{ name: '', quantity: 1, price: 0 }],
  })

  async function handleSubmit() {
    const validated = BillSchema.safeParse(data)
    if (!validated.success) return alert('Invalid')
    const res = await createBill(data)
    alert('บันทึกบิลสำเร็จ')
    console.log(res)
  }

  return (
    <div className="space-y-4">
      <input
        value={data.customerName}
        onChange={e => setData({ ...data, customerName: e.target.value })}
        placeholder="ชื่อลูกค้า"
        className="border px-2 py-1"
      />
      <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2">
        สร้างบิล
      </button>
    </div>
  )
}
