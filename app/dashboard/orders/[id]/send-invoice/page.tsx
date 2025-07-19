"use client"
import { sendEmail, loadEmailData } from "@/lib/mock-email"
import { mockOrders, type SimpleOrder } from "@/mock/orders"
import { useEffect } from "react"
import { Button } from "@/components/ui/buttons/button"

export default function SendInvoice({ params }: { params: { id: string } }) {
  const { id } = params
  const order = mockOrders.find((o: SimpleOrder) => o.id === id)

  useEffect(() => {
    loadEmailData()
  }, [])

  if (!order) return <div className="p-8">ไม่พบออเดอร์</div>

  const handleSend = () => {
    sendEmail(order.customer, {
      "customer.name": order.customer,
      "order.id": order.id,
      "order.total": order.total.toString(),
    })
    alert("ส่งอีเมลแล้ว")
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">ส่งใบเสร็จ {order.id}</h1>
      <iframe src={`/invoice/${id}`} className="w-full h-[600px] border" />
      <Button onClick={handleSend}>ส่งอีเมลพร้อม PDF</Button>
    </div>
  )
}
