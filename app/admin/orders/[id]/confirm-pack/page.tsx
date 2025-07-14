"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { mockOrders, setOrderStatus } from "@/lib/mock-orders"
import { toast } from "sonner"

export default function ConfirmPackPage({ params }: { params: { id: string } }) {
  const { id } = params
  const idx = mockOrders.findIndex(o => o.id === id)
  const order = mockOrders[idx]
  const [checked, setChecked] = useState<Record<number, boolean>>({})
  const [processing, setProcessing] = useState(false)

  if (!order) {
    return <div className="min-h-screen flex items-center justify-center">ไม่พบออเดอร์</div>
  }

  const validAddress = Object.values(order.shippingAddress).every(v => v)
  const allChecked = order.items.every((_, i) => checked[i])
  const confirmed = order.status === "packed"

  const handleConfirm = () => {
    if (!allChecked || !validAddress || confirmed || processing) return
    setProcessing(true)
    setOrderStatus(order.id, "packed")
    mockOrders[idx].packingStatus = "ready"
    toast.success("ยืนยันแพ็กแล้ว")
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
          <h1 className="text-3xl font-bold">ยืนยันแพ็ค {order.id}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>รายการสินค้า</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                <div>
                  <p className="font-medium">{item.productName}</p>
                  <p className="text-sm text-gray-600">
                    {item.size && `ขนาด: ${item.size}`} {item.color && `| สี: ${item.color}`}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span>จำนวน: {item.quantity}</span>
                  <input
                    type="checkbox"
                    checked={!!checked[i]}
                    onChange={e => setChecked({ ...checked, [i]: e.target.checked })}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ที่อยู่จัดส่ง</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            <p className="font-semibold">{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city} {order.shippingAddress.postalCode}
            </p>
            <p>เบอร์โทร: {order.shippingAddress.phone}</p>
          </CardContent>
        </Card>

        <Button onClick={handleConfirm} disabled={!allChecked || !validAddress || confirmed || processing}>
          ยืนยันแพ็ค
        </Button>
      </div>
    </div>
  )
}
