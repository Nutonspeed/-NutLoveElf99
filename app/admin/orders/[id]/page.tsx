"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Share2, Edit, PrinterIcon as Print } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import OrderStatusDropdown from "@/components/admin/orders/OrderStatusDropdown"
import { OrderTimeline, type TimelineEntry } from "@/components/order/OrderTimeline"
import { mockOrders } from "@/lib/mock-orders"
import type { Order } from "@/types/order"
import type { OrderStatus } from "@/types/order"
import { toast } from "sonner"

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const orderIndex = mockOrders.findIndex((o) => o.id === id)
  const order = mockOrders[orderIndex]

  const [status, setStatus] = useState<OrderStatus>(order?.status ?? "pendingPayment")

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>ไม่พบคำสั่งซื้อ</p>
      </div>
    )
  }

  const handleAddEntry = (entry: TimelineEntry) => {
    mockOrders[orderIndex].timeline.push(entry)
    mockOrders[orderIndex].status = entry.status
    setStatus(entry.status)
    toast.success("บันทึกสถานะแล้ว")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">คำสั่งซื้อ {order.id}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>สถานะคำสั่งซื้อ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <OrderStatusDropdown status={status} onChange={setStatus} />
            <div className="flex space-x-2 mt-2">
              <Button variant="outline" onClick={() => window.open(`/admin/orders/${id}/print`, "_blank") }>
                <Share2 className="mr-2 h-4 w-4" />
                แชร์บิล
              </Button>
              <Button variant="outline" onClick={() => window.open(`/admin/orders/${id}/label`, "_blank") }>
                <Print className="mr-2 h-4 w-4" />
                พิมพ์ใบจ่าหน้า
              </Button>
              <Link href={`/admin/orders/edit/${id}`}>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  แก้ไขบิล
                </Button>
              </Link>
            </div>
          </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>ไทม์ไลน์สถานะ</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderTimeline
                timeline={order.timeline}
                editable
                onAddEntry={handleAddEntry}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>รายการสินค้า</CardTitle>
            </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-600">
                      {item.size && `ขนาด: ${item.size}`} {item.color && `| สี: ${item.color}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>จำนวน: {item.quantity}</p>
                    <p className="font-semibold">฿{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-bold">
              <span>ยอดรวมทั้งสิ้น:</span>
              <span>฿{order.total.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ที่อยู่จัดส่ง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="font-semibold">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city} {order.shippingAddress.postalCode}
              </p>
              <p>เบอร์โทร: {order.shippingAddress.phone}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>สถานะการจัดส่ง</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p>วิธีจัดส่ง: {order.delivery_method || "-"}</p>
            <p>เลขติดตามพัสดุ: {order.tracking_number || "-"}</p>
            <p>ค่าจัดส่ง: ฿{order.shipping_fee.toLocaleString()}</p>
            <p>สถานะ: {order.shipping_status}</p>
            <p>วันที่จัดส่ง: {order.shipping_date ? new Date(order.shipping_date).toLocaleDateString("th-TH") : "-"}</p>
            <p>หมายเหตุ: {order.delivery_note || "-"}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
