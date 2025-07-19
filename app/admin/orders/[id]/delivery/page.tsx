"use client"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { mockOrders, setOrderStatus } from "@/core/mock/orders"
import { toast } from "sonner"

export default function DeliveryPage({ params }: { params: { id: string } }) {
  const { id } = params
  const idx = mockOrders.findIndex(o => o.id === id)
  const order = mockOrders[idx]
  const [tracking, setTracking] = useState(order?.tracking_number || "")
  const [provider, setProvider] = useState(order?.delivery_method || "")
  const [img, setImg] = useState(order?.labelImage || "")
  const [processing, setProcessing] = useState(false)

  if (!order) {
    return <div className="min-h-screen flex items-center justify-center">ไม่พบออเดอร์</div>
  }

  const handleFile = (file: File) => {
    if (file.size > 1024 * 1024) {
      toast.error("รูปใหญ่เกิน 1MB")
      return
    }
    const reader = new FileReader()
    reader.onload = e => setImg(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  const canSubmit = tracking.trim() !== "" && provider.trim() !== "" && img && order.shipping_status !== "shipped" && !processing

  const submit = () => {
    if (!canSubmit) return
    setProcessing(true)
    mockOrders[idx].tracking_number = tracking
    mockOrders[idx].delivery_method = provider
    mockOrders[idx].labelImage = img
    mockOrders[idx].shipping_status = "shipped"
    setOrderStatus(order.id, "shipped")
    toast.success("บันทึกการจัดส่งแล้ว")
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
          <h1 className="text-3xl font-bold">บันทึกการจัดส่ง {order.id}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>ข้อมูลจัดส่ง</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <input value={tracking} onChange={e => setTracking(e.target.value)} className="border rounded px-2 py-1 w-full" placeholder="เลข Tracking" />
            <input value={provider} onChange={e => setProvider(e.target.value)} className="border rounded px-2 py-1 w-full" placeholder="ผู้ให้บริการ" />
            <input type="file" accept="image/*" onChange={e => e.target.files && handleFile(e.target.files[0])} />
            {img && <img src={img} alt="label" className="h-32" />}
          </CardContent>
        </Card>

        <Button onClick={submit} disabled={!canSubmit}>
          ส่งของแล้ว
        </Button>
      </div>
    </div>
  )
}
