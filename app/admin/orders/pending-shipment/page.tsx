"use client"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { ArrowLeft } from "lucide-react"
import { mockOrders } from "@/core/mock/orders"

export default function PendingShipmentPage() {
  const orders = mockOrders.filter(o => o.status === "packed")
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ออเดอร์ที่รอจัดส่ง</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>รายการ ({orders.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {orders.map(o => (
              <div key={o.id} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                <div>
                  <p className="font-medium">{o.id}</p>
                  <p className="text-sm text-gray-500">{o.customerName}</p>
                </div>
                <Link href={`/admin/orders/${o.id}/delivery`}>
                  <Button variant="outline">จัดส่ง</Button>
                </Link>
              </div>
            ))}
            {orders.length === 0 && (
              <p className="text-center text-sm text-gray-500">ไม่มีรายการ</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
