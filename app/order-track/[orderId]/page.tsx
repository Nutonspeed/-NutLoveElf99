"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { OrderTimeline } from "@/components/order/OrderTimeline"
import { getOrders } from "@/core/mock/store"
import Link from "next/link"
import { CheckCircle, Hammer, Package, Truck, MapPin, CreditCard } from "lucide-react"

export default function OrderTrackPage({ params }: { params: { orderId: string } }) {
  const { orderId } = params
  const order = getOrders().find((o) => o.id === orderId)

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <p className="font-semibold">ไม่พบคำสั่งซื้อ</p>
            <Link href="/">
              <span className="text-blue-600">กลับหน้าหลัก</span>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const steps = [
    { key: "depositPaid", label: "จ่ายมัดจำ", icon: CreditCard },
    { key: "paid", label: "ชำระครบ", icon: CheckCircle },
    { key: "producing", label: "กำลังผลิต", icon: Hammer },
    { key: "done", label: "ผลิตเสร็จ", icon: CheckCircle },
    { key: "packed", label: "แพ็กสินค้า", icon: Package },
    { key: "shipped", label: "จัดส่ง", icon: Truck },
    { key: "delivered", label: "ส่งมอบแล้ว", icon: MapPin },
  ]

  const currentStepIndex = steps.findIndex((s) => s.key === order.status)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">ติดตามคำสั่งซื้อ {order.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between relative">
              {steps.map((step, index) => {
                const StepIcon = step.icon
                const isCompleted = index <= currentStepIndex
                const isCurrent = index === currentStepIndex
                return (
                  <div key={step.key} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isCurrent
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <StepIcon className="h-5 w-5" />
                    </div>
                    <span
                      className={`text-xs text-center ${
                        isCompleted || isCurrent ? "text-gray-900 font-medium" : "text-gray-400"
                      }`}
                    >
                      {step.label}
                    </span>
                    {index < steps.length - 1 && (
                      <div
                        className={`absolute h-0.5 w-full mt-5 ${
                          index < currentStepIndex ? "bg-green-500" : "bg-gray-200"
                        }`}
                        style={{
                          left: `${(100 / steps.length) * (index + 0.5)}%`,
                          width: `${100 / steps.length}%`,
                          zIndex: -1,
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </div>
            <div className="flex justify-center my-8">
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center">
                QR {order.id}
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">ไทม์ไลน์การผลิต</h4>
              <OrderTimeline timeline={order.timeline} />
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
