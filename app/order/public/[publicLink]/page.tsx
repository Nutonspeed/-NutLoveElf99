"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, Package, Truck, MapPin, Phone, Mail, Calendar } from "lucide-react"
import type { ManualOrder, OrderStatus } from "@/types/order"
import { orderDb } from "@/lib/order-database"

interface PublicOrderPageProps {
  params: {
    publicLink: string
  }
}

export default function PublicOrderPage({ params }: PublicOrderPageProps) {
  const [order, setOrder] = useState<ManualOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadOrder()
  }, [params.publicLink])

  const loadOrder = async () => {
    try {
      const orderData = await orderDb.getManualOrderByPublicLink(params.publicLink)
      if (!orderData) {
        setError("ไม่พบออเดอร์ที่ระบุ")
        return
      }
      setOrder(orderData)
    } catch (error) {
      setError("ไม่สามารถโหลดข้อมูลออเดอร์ได้")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>กำลังโหลดข้อมูลออเดอร์...</p>
        </div>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 mb-4">
              <Package className="h-12 w-12 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold mb-2">ไม่พบออเดอร์</h2>
            <p className="text-gray-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusInfo = (status: OrderStatus) => {
    switch (status) {
      case "draft":
        return { text: "ร่าง", color: "bg-gray-500", icon: Clock }
      case "pending":
        return { text: "รอยืนยัน", color: "bg-yellow-500", icon: Clock }
      case "confirmed":
        return { text: "ยืนยันแล้ว", color: "bg-blue-500", icon: CheckCircle }
      case "processing":
        return { text: "กำลังดำเนินการ", color: "bg-orange-500", icon: Package }
      case "shipped":
        return { text: "จัดส่งแล้ว", color: "bg-purple-500", icon: Truck }
      case "delivered":
        return { text: "ส่งมอบแล้ว", color: "bg-green-500", icon: CheckCircle }
      case "cancelled":
        return { text: "ยกเลิก", color: "bg-red-500", icon: Clock }
      default:
        return { text: status, color: "bg-gray-500", icon: Clock }
    }
  }

  const getPaymentStatusInfo = (status: ManualOrder["paymentStatus"]) => {
    switch (status) {
      case "unpaid":
        return { text: "ยังไม่ชำระ", color: "bg-red-500" }
      case "partial":
        return { text: "ชำระบางส่วน", color: "bg-yellow-500" }
      case "paid":
        return { text: "ชำระแล้ว", color: "bg-green-500" }
      case "refunded":
        return { text: "คืนเงินแล้ว", color: "bg-blue-500" }
      default:
        return { text: status, color: "bg-gray-500" }
    }
  }

  const statusInfo = getStatusInfo(order.status)
  const paymentInfo = getPaymentStatusInfo(order.paymentStatus)
  const StatusIcon = statusInfo.icon

  const statusSteps = [
    { key: "confirmed", label: "ยืนยันออเดอร์", icon: CheckCircle },
    { key: "processing", label: "กำลังดำเนินการ", icon: Package },
    { key: "shipped", label: "จัดส่งแล้ว", icon: Truck },
    { key: "delivered", label: "ส่งมอบแล้ว", icon: MapPin },
  ]

  const getCurrentStepIndex = () => {
    switch (order.status) {
      case "confirmed":
        return 0
      case "processing":
        return 1
      case "shipped":
        return 2
      case "delivered":
        return 3
      default:
        return -1
    }
  }

  const currentStepIndex = getCurrentStepIndex()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">รายละเอียดออเดอร์</h1>
          <p className="text-gray-600">ติดตามสถานะออเดอร์ของคุณ</p>
        </div>

        {/* Order Status */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <span>ออเดอร์ {order.orderNumber}</span>
                  <Badge className={`${statusInfo.color} text-white`}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusInfo.text}
                  </Badge>
                </CardTitle>
                <p className="text-sm text-gray-600 mt-1">
                  สร้างเมื่อ{" "}
                  {new Date(order.createdAt).toLocaleDateString("th-TH", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">฿{order.total.toLocaleString()}</div>
                <Badge className={`${paymentInfo.color} text-white`}>{paymentInfo.text}</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Status Timeline */}
            {order.status !== "draft" && order.status !== "pending" && order.status !== "cancelled" && (
              <div className="mt-6">
                <h4 className="font-semibold mb-4">สถานะการดำเนินการ</h4>
                <div className="flex items-center justify-between">
                  {statusSteps.map((step, index) => {
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
                        {index < statusSteps.length - 1 && (
                          <div
                            className={`absolute h-0.5 w-full mt-5 ${
                              index < currentStepIndex ? "bg-green-500" : "bg-gray-200"
                            }`}
                            style={{
                              left: `${(100 / statusSteps.length) * (index + 0.5)}%`,
                              width: `${100 / statusSteps.length}%`,
                              zIndex: -1,
                            }}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  ข้อมูลลูกค้า
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <strong>ชื่อ:</strong>
                  <span>{order.customerName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>{order.customerPhone}</span>
                </div>
                {order.customerEmail && (
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>{order.customerEmail}</span>
                  </div>
                )}
                {order.customerAddress && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 mt-0.5" />
                    <span>{order.customerAddress}</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>รายการสินค้า ({order.items.length} รายการ)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                      {item.image && (
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <h4 className="font-medium">{item.productName}</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <div>ขนาด: {item.size}</div>
                          <div>ลาย: {item.pattern}</div>
                          <div>สี: {item.color}</div>
                          {item.notes && <div>หมายเหตุ: {item.notes}</div>}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">จำนวน: {item.quantity}</div>
                        <div className="text-lg font-semibold">฿{(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            {order.notes && (
              <Card>
                <CardHeader>
                  <CardTitle>หมายเหตุ</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{order.notes}</p>
                </CardContent>
              </Card>
            )}

            {/* Attachments */}
            {order.attachments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>รูปภาพประกอบ</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {order.attachments.map((attachment, index) => (
                      <img
                        key={index}
                        src={attachment || "/placeholder.svg"}
                        alt={`รูปภาพ ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => {
                          if (typeof window !== "undefined") {
                            window.open(attachment, "_blank")
                          }
                        }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>สรุปยอดรวม</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>ยอดรวมสินค้า:</span>
                  <span>฿{order.subtotal.toLocaleString()}</span>
                </div>
                {order.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>ส่วนลด:</span>
                    <span>-฿{order.discount.toLocaleString()}</span>
                  </div>
                )}
                {order.shippingCost > 0 && (
                  <div className="flex justify-between">
                    <span>ค่าจัดส่ง:</span>
                    <span>฿{order.shippingCost.toLocaleString()}</span>
                  </div>
                )}
                {order.tax > 0 && (
                  <div className="flex justify-between">
                    <span>ภาษี/ค่าธรรมเนียม:</span>
                    <span>฿{order.tax.toLocaleString()}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>ยอดรวมทั้งสิ้น:</span>
                  <span>฿{order.total.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>

            {/* Order Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  ข้อมูลออเดอร์
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>เลขที่ออเดอร์:</span>
                  <span className="font-mono">{order.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>วันที่สร้าง:</span>
                  <span>{new Date(order.createdAt).toLocaleDateString("th-TH")}</span>
                </div>
                <div className="flex justify-between">
                  <span>อัปเดตล่าสุด:</span>
                  <span>{new Date(order.updatedAt).toLocaleDateString("th-TH")}</span>
                </div>
                <div className="flex justify-between">
                  <span>จำนวนรายการ:</span>
                  <span>{order.items.length} รายการ</span>
                </div>
                <div className="flex justify-between">
                  <span>จำนวนชิ้นรวม:</span>
                  <span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} ชิ้น</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
