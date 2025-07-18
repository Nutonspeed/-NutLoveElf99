"use client"
import { useState } from "react"
import { shippingOrders, addTrackingNumber } from "@/mock/shipping"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { CopyToClipboardButton } from "@/components/CopyToClipboardButton"

export default function AddTrackingPage() {
  const [orderId, setOrderId] = useState(shippingOrders[0]?.id || "")
  const [tracking, setTracking] = useState("")
  const [added, setAdded] = useState<string | null>(null)

  const handleAdd = () => {
    const order = addTrackingNumber(orderId, tracking)
    if (order) {
      setAdded(order.tracking)
      setTracking("")
    }
  }

  return (
    <div className="container mx-auto max-w-md space-y-4 py-8">
      <h1 className="text-2xl font-bold">เพิ่มเลขพัสดุ</h1>
      <select value={orderId} onChange={e=>setOrderId(e.target.value)} className="border rounded p-2 w-full">
        {shippingOrders.map(o=> (
          <option key={o.id} value={o.id}>{o.id} - {o.name}</option>
        ))}
      </select>
      <Input placeholder="Tracking number" value={tracking} onChange={e=>setTracking(e.target.value)} />
      <Button onClick={handleAdd}>บันทึก</Button>
      {added && (
        <div className="flex items-center gap-2">
          <span className="text-sm">{added}</span>
          <CopyToClipboardButton text={added} />
        </div>
      )}
    </div>
  )
}
