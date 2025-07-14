"use client"
import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { OrderTimeline, type TimelineEntry } from "@/components/order/OrderTimeline"
import { getFastBill } from "@/lib/mock-fast-bills"
import { formatThaiDate } from "@/lib/utils"

export default function BillPublicPage({ params }: { params: { billId: string } }) {
  const { billId } = params
  const [bill, setBill] = useState(() => getFastBill(billId))

  useEffect(() => {
    setBill(getFastBill(billId))
  }, [billId])

  if (!bill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>ไม่พบบิลนี้</p>
      </div>
    )
  }

  const remaining = bill.total - bill.deposit
  const readyDate = new Date(new Date(bill.createdAt).getTime() + bill.days * 86400000)

  const timeline: TimelineEntry[] = [
    { timestamp: bill.createdAt, status: "pending", note: "รับออเดอร์แล้ว", updatedBy: "system" },
    { timestamp: bill.createdAt, status: "processing", note: `สั่งผ้า (รอ ${bill.days} วัน)`, updatedBy: "system" },
    { timestamp: bill.createdAt, status: "producing", note: "ตัดเย็บ (รอ 5 วัน)", updatedBy: "system" },
    { timestamp: readyDate.toISOString(), status: "done", note: "พร้อมจัดส่ง", updatedBy: "system" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>บิล {bill.id}</CardTitle>
          {bill.depositPaid && <Badge className="mt-2">ชำระมัดจำแล้ว</Badge>}
        </CardHeader>
        <CardContent className="space-y-4">
          <p>ลูกค้า: {bill.customerName}</p>
          <p>รายการ: {bill.items}</p>
          <p>ยอดรวม: {bill.total.toLocaleString()} บาท</p>
          <p>มัดจำ: {bill.deposit.toLocaleString()} บาท</p>
          <p>คงเหลือ: {remaining.toLocaleString()} บาท</p>
          <p>สินค้าพร้อมประมาณ: {formatThaiDate(readyDate)}</p>
          {bill.days > 0 && <OrderTimeline timeline={timeline} />}
        </CardContent>
      </Card>
    </div>
  )
}
