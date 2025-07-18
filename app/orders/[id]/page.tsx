"use client"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { mockOrders } from "@/lib/mock-orders"

export default function OrderSummaryPage({ params }: { params: { id: string } }) {
  const order = mockOrders.find((o) => o.id === params.id)
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p>ไม่พบคำสั่งซื้อ</p>
        <Link href="/orders">
          <Button>กลับ</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 space-y-4">
      <h1 className="text-xl font-bold text-center">คำสั่งซื้อ {order.id}</h1>
      <div className="max-w-md mx-auto border rounded-lg p-4 space-y-2">
        {order.items.map((item, i) => (
          <div key={i} className="flex justify-between">
            <span>
              {item.productName} × {item.quantity}
            </span>
            <span>฿{(item.price * item.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="flex justify-between border-t pt-2 font-bold">
          <span>ยอดรวม</span>
          <span>฿{order.total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )
}
