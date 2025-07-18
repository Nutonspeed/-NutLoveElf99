"use client"
import { shippingOrders } from "@/mock/shipping"
import { CheckCircle, Truck } from "lucide-react"

const statusMap: Record<string, { icon: any; color: string }> = {
  "กำลังจัดส่ง": { icon: Truck, color: "text-orange-600" },
  "ถึงแล้ว": { icon: CheckCircle, color: "text-green-600" },
}

export default function DeliveryStatusPage() {
  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">สถานะการจัดส่ง</h1>
      <div className="space-y-2">
        {shippingOrders.map(o => {
          const Info = statusMap[o.deliveryStatus]
          const Icon = Info.icon
          return (
            <div key={o.id} className="flex items-center gap-2">
              <Icon className={`h-5 w-5 ${Info.color}`} />
              <span>{o.id} – {o.deliveryStatus}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
