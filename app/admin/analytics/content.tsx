"use client"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import { mockOrders } from "@/lib/mock/orders"
import type { Order } from "@/types/order"

export default function AnalyticsContent() {
  const [orders] = useState<Order[]>(mockOrders)
  let todayCount = 0
  let todayIncome = 0
  let unpaid = 0
  let ready = 0
  if (Array.isArray(orders)) {
    const today = new Date().toDateString()
    for (const o of orders) {
      if (new Date(o.createdAt).toDateString() === today) {
        todayCount += 1
        todayIncome += o.total
      }
      if (o.status === "pendingPayment") unpaid += 1
      if (o.status === "paid" && o.shipping_status === "pending") ready += 1
    }
  }
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">สถิติร้าน</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">ออเดอร์วันนี้</p>
            <p className="text-2xl font-bold">{todayCount}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">รายได้วันนี้</p>
            <p className="text-2xl font-bold">฿{todayIncome.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">ยังไม่โอน</p>
            <p className="text-2xl font-bold">{unpaid}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">รอจัดส่ง</p>
            <p className="text-2xl font-bold">{ready}</p>
          </CardContent>
        </Card>
      </div>
      <Link href="/admin/analytics/store-kpi">
        <Button variant="outline">ดู Store KPI</Button>
      </Link>
    </div>
  )
}
