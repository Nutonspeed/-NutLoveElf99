"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { OrderTimeline, type TimelineEntry } from "@/components/order/OrderTimeline"
import { getFastBill } from "@/lib/mock-fast-bills"
import { formatThaiDate } from "@/lib/utils"
import { getPayment } from "@/lib/mock/payment"
import { toast } from "sonner"

export default function BillPublicPage({ params }: { params: { billId: string } }) {
  const { billId } = params
  const [bill, setBill] = useState(() => getFastBill(billId))
  const [payment, setPayment] = useState(() => getPayment(billId))

  useEffect(() => {
    setBill(getFastBill(billId))
    setPayment(getPayment(billId))
  }, [billId])

  if (!bill) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p>ไม่พบบิลนี้ กรุณาติดต่อแอดมิน</p>
        <Link href="/" className="underline text-primary">กลับหน้าแรก</Link>
      </div>
    )
  }

  const remaining = bill.total - bill.deposit
  const readyDate = new Date(new Date(bill.createdAt).getTime() + bill.days * 86400000)

  const timeline: TimelineEntry[] = [
    { timestamp: bill.createdAt, status: "pending", note: "Order created", updatedBy: "system" },
  ]
  if (payment) {
    timeline.push({ timestamp: payment.date, status: "depositPaid", note: "Payment submitted", updatedBy: "customer" })
    if (payment.verified) {
      timeline.push({ timestamp: payment.date, status: "paid", note: "Payment verified", updatedBy: "admin" })
    }
  }
  timeline.push({ timestamp: bill.createdAt, status: "producing", note: "In production", updatedBy: "system" })
  timeline.push({ timestamp: readyDate.toISOString(), status: "done", note: "Ready to ship", updatedBy: "system" })

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>บิล {bill.id}</CardTitle>
              {bill.depositPaid && <Badge className="mt-2">ชำระมัดจำแล้ว</Badge>}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (typeof window !== "undefined") {
                  navigator.clipboard.writeText(window.location.href)
                  toast.success("ลิงก์บิลถูกคัดลอกแล้ว")
                }
              }}
            >
              คัดลอกลิงก์
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>ลูกค้า: {bill.customerName}</p>
          <p>รายการ: {bill.items}</p>
          <p>ยอดรวม: {bill.total.toLocaleString()} บาท</p>
          <p>มัดจำ: {bill.deposit.toLocaleString()} บาท</p>
          <p>คงเหลือ: {remaining.toLocaleString()} บาท</p>
          <p>สินค้าพร้อมประมาณ: {formatThaiDate(readyDate)}</p>
          <div className="space-y-2">
            <h4 className="font-semibold">สถานะการโอน</h4>
            {payment ? (
              <div className="space-y-1">
                <p>วันที่: {formatThaiDate(payment.date)}</p>
                <p>จำนวน: {payment.amount.toLocaleString()} บาท</p>
                {payment.slip && <p className="text-sm text-gray-600">{payment.slip}</p>}
              </div>
            ) : (
              <div className="space-y-2">
                <p>Awaiting payment</p>
                <Link href={`/b/${billId}/payment`}>
                  <Button size="sm">แจ้งโอน</Button>
                </Link>
              </div>
            )}
          </div>
          {bill.days > 0 && <OrderTimeline timeline={timeline} />}
        </CardContent>
      </Card>
    </div>
  )
}
