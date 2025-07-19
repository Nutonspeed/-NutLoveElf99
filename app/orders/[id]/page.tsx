"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, MessageCircle, Package, Truck, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useOrder } from "@/lib/hooks/useOrder"
import { OrderTimeline } from "@/components/order/OrderTimeline"
import type { OrderStatus } from "@/types/order"
import {
  getOrderStatusBadgeVariant,
  getOrderStatusText,
} from "@/lib/order-status"

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { order } = useOrder(id)

  if (!order) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบคำสั่งซื้อ</h1>
          <p className="text-gray-600 mb-8">คำสั่งซื้อที่คุณค้นหาไม่มีในระบบ</p>
          <Link href="/orders">
            <Button>กลับไปหน้าคำสั่งซื้อ</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }


  const orderSteps = [
    { status: "pendingPayment", label: "รอชำระเงิน", icon: Package },
    { status: "depositPaid", label: "มัดจำแล้ว", icon: Package },
    { status: "paid", label: "ชำระแล้ว", icon: CheckCircle },
  ]

  const currentStepIndex = orderSteps.findIndex((step) => step.status === order.status)

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">คำสั่งซื้อ {order.id}</h1>
            <p className="text-gray-600">สั่งซื้อเมื่อ {new Date(order.createdAt).toLocaleDateString("th-TH")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>สถานะคำสั่งซื้อ</CardTitle>
                  <Badge variant={getOrderStatusBadgeVariant(order.status)}>
                    {getOrderStatusText(order.status)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderSteps.map((step, index) => {
                    const StepIcon = step.icon
                    const isCompleted = index <= currentStepIndex
                    const isCurrent = index === currentStepIndex

                    return (
                      <div key={step.status} className="flex items-center space-x-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isCompleted
                              ? "bg-green-100 text-green-600"
                              : isCurrent
                                ? "bg-blue-100 text-blue-600"
                                : "bg-gray-100 text-gray-400"
                          }`}
                        >
                          <StepIcon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              isCompleted ? "text-green-600" : isCurrent ? "text-blue-600" : "text-gray-400"
                            }`}
                          >
                            {step.label}
                          </p>
                          {isCurrent && <p className="text-sm text-gray-600">กำลังดำเนินการ</p>}
                        </div>
                        {isCompleted && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>รายการสินค้า</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-4 border-b last:border-b-0">
                      <div>
                        <h3 className="font-semibold">{item.productName}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          {item.size && <p>ขนาด: {item.size}</p>}
                          {item.color && <p>สี: {item.color}</p>}
                          <p>จำนวน: {item.quantity}</p>
                          <p>ราคาต่อชิ้น: ฿{item.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg">฿{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}

                  <Separator />

                  <div className="flex justify-between items-center pt-4">
                    <span className="text-xl font-bold">ยอดรวมทั้งสิ้น:</span>
                    <span className="text-2xl font-bold text-primary">฿{order.total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle>ที่อยู่จัดส่ง</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
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
                <CardTitle>ไทม์ไลน์การจัดส่ง</CardTitle>
              </CardHeader>
              <CardContent>
                <OrderTimeline timeline={order.timeline} />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>การดำเนินการ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.status === "paid" && (
                  <Link href={`/invoice/${order.id}`}>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      ดาวน์โหลดใบเสร็จ
                    </Button>
                  </Link>
                )}

                <Link href="/chat">
                  <Button className="w-full bg-transparent" variant="outline">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    ติดต่อฝ่ายบริการลูกค้า
                  </Button>
                </Link>

                <Link href="/products">
                  <Button className="w-full">ช้อปปิ้งต่อ</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>สรุปคำสั่งซื้อ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>รหัสคำสั่งซื้อ:</span>
                  <span className="font-medium">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span>วันที่สั่งซื้อ:</span>
                  <span>{new Date(order.createdAt).toLocaleDateString("th-TH")}</span>
                </div>
                <div className="flex justify-between">
                  <span>สถานะ:</span>
                  <Badge variant={getOrderStatusBadgeVariant(order.status)}>
                    {getOrderStatusText(order.status)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>จำนวนสินค้า:</span>
                  <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} ชิ้น</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>ยอดรวม:</span>
                  <span>฿{order.total.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
