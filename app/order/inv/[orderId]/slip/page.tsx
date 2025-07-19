"use client"
import { useState } from "react"
import { getOrders, updateOrder } from "@/core/mock/store"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/inputs/input"

export default function OrderSlipPage({ params }: { params: { orderId: string } }) {
  const order = getOrders().find(o => o.id === params.orderId)
  const [file, setFile] = useState<File | null>(null)

  if (!order) return <div className="p-8">ไม่พบออเดอร์</div>

  const upload = () => {
    updateOrder(order.id, { paymentSlip: file?.name, status: "waiting_confirm" as any })
    alert("อัปโหลดแล้ว")
  }

  return (
    <div className="p-4 space-y-2 max-w-md mx-auto">
      <Input type="file" onChange={e=>setFile(e.target.files?.[0] ?? null)} />
      <Button onClick={upload} disabled={!file}>ส่งสลิป</Button>
    </div>
  )
}
