"use client"
import { mockOrders } from "@/lib/mock-orders"
import { Button } from "@/components/ui/buttons/button"

export default function OrderInvoicePage({ params }: { params: { orderId: string } }) {
  const order = mockOrders.find(o => o.id === params.orderId)
  if (!order) return <div className="p-8 text-center">ไม่พบคำสั่งซื้อ</div>

  const copy = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-center">บิล {order.id}</h1>
      <div className="max-w-md mx-auto space-y-2">
        {order.items.map((it, i) => (
          <div key={i} className="flex justify-between">
            <span>{it.productName} × {it.quantity}</span>
            <span>฿{(it.price * it.quantity).toLocaleString()}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold border-t pt-2">
          <span>ยอดรวม</span>
          <span>฿{order.total.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">QR</div>
      </div>
      <div className="text-center">
        <Button variant="outline" onClick={copy}>คัดลอกลิงก์</Button>
      </div>
    </div>
  )
}
