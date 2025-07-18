"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { mockStock } from '@/lib/mock-stock'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'

export default function EditStockPage() {
  const router = useRouter()
  const [id, setId] = useState(mockStock[0]?.id || '')
  const [qty, setQty] = useState(0)
  const [reason, setReason] = useState('คืนของ')

  const handleSubmit = () => {
    const item = mockStock.find(s => s.id === id)
    if (item) item.currentStock += qty
    alert('บันทึกแล้ว')
    router.push('/dashboard/stock')
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">ปรับสต๊อกสินค้า</h1>
      <div className="space-y-2 max-w-sm">
        <Select value={id} onValueChange={setId}>
          <SelectTrigger>สินค้า</SelectTrigger>
          <SelectContent>
            {mockStock.map(i => (
              <SelectItem key={i.id} value={i.id}>{i.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input type="number" value={qty} onChange={e=>setQty(Number(e.target.value))} placeholder="จำนวน (+/-)" />
        <Select value={reason} onValueChange={setReason}>
          <SelectTrigger>เหตุผล</SelectTrigger>
          <SelectContent>
            <SelectItem value="คืนของ">คืนของ</SelectItem>
            <SelectItem value="ซื้อเพิ่ม">ซื้อเพิ่ม</SelectItem>
            <SelectItem value="เสียหาย">เสียหาย</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSubmit}>บันทึก</Button>
      </div>
    </div>
  )
}
