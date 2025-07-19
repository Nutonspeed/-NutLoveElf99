"use client"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { ArrowLeft } from "lucide-react"
import { mockOrders } from "@/core/mock/orders"
import { getMockNow } from "@/lib/mock-date"

export default function PendingOrderAlerts() {
  const now = getMockNow().getTime()
  const overdue = mockOrders.filter(o => {
    if (o.status !== "packed") return false
    const entry = [...o.timeline].reverse().find(t => t.status === "packed")
    if (!entry) return false
    return now - new Date(entry.timestamp).getTime() > 3 * 24 * 60 * 60 * 1000
  })
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">แจ้งเตือนออเดอร์ค้าง</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ค้างเกิน 3 วัน ({overdue.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {overdue.map(o => (
              <div key={o.id} className="flex justify-between items-center border-b pb-2 last:border-b-0 text-red-600">
                <span>{o.id} - {o.customerName}</span>
                <Link href={`/admin/orders/${o.id}/delivery`}>
                  <Button variant="destructive" size="sm">จัดการ</Button>
                </Link>
              </div>
            ))}
            {overdue.length === 0 && (
              <p className="text-center text-sm text-gray-500">ไม่มีรายการ</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
