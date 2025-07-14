"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { mockOrders } from '@/lib/mock-orders'
import {
  loadDeliverySchedule,
  mockDeliverySchedule,
  setDeliverySchedule,
} from '@/lib/mock-delivery-schedule'
import { getMockNow } from '@/lib/mock-date'

export default function SetDeliveryDatePage({ params }: { params: { id: string } }) {
  const { id } = params
  const order = mockOrders.find(o => o.id === id)
  const [date, setDate] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    loadDeliverySchedule()
    const entry = mockDeliverySchedule[id]
    if (entry) {
      setDate(entry.date)
      setNote(entry.note)
    }
  }, [id])

  if (!order) {
    return <div className="min-h-screen flex items-center justify-center">ไม่พบออเดอร์</div>
  }

  const today = getMockNow().toISOString().slice(0, 10)
  const maxDate = new Date(getMockNow().getTime() + 365 * 24 * 60 * 60 * 1000)
    .toISOString()
    .slice(0, 10)

  const handleSave = () => {
    if (date < today || date > maxDate) {
      alert('วันที่ไม่ถูกต้อง')
      return
    }
    setDeliverySchedule(id, date, note)
    alert('บันทึกแล้ว')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <Link href={`/admin/orders/${id}`}>\
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">กำหนดวันส่ง {order.id}</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ตั้งวันส่ง</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="date"
              value={date}
              min={today}
              max={maxDate}
              onChange={e => setDate(e.target.value)}
            />
            <Textarea
              placeholder="หมายเหตุ"
              value={note}
              onChange={e => setNote(e.target.value)}
            />
            <Button onClick={handleSave}>บันทึก</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
