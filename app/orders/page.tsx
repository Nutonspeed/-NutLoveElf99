"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Eye, Download, MessageCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { mockOrders } from "@/lib/mock-orders"
import type { OrderStatus } from "@/types/order"

export default function OrdersPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const userOrders = mockOrders.filter((order) => order.customerId === user?.id)

  const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case "paid":
        return "default"
      case "depositPaid":
        return "secondary"
      case "pendingPayment":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case "pendingPayment":
        return "รอชำระเงิน"
      case "depositPaid":
        return "มัดจำแล้ว"
      case "paid":
        return "ชำระแล้ว"
      case "cancelled":
        return "ยกเลิก"
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">ประวัติการสั่งซื้อ</h1>
            <p className="text-gray-600">ตรวจสอบสถานะและรายละเอียดคำสั่งซื้อของคุณ</p>
          </div>
        </div>

        {userOrders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">ยังไม่มีคำสั่งซื้อ</h2>
            <p className="text-gray-600 mb-8">เริ่มช้อปปิ้งเพื่อสร้างคำสั่งซื้อแรกของคุณ</p>
            <Link href="/products">
              <Button size="lg">เริ่มช้อปปิ้ง</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {userOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">คำสั่งซื้อ {order.id}</CardTitle>
                      <p className="text-sm text-gray-600">
                        สั่งซื้อเมื่อ {new Date(order.createdAt).toLocaleDateString("th-TH")}
                      </p>
                    </div>
                    <Badge variant={getStatusBadgeVariant(order.status)}>{getStatusText(order.status)}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                          <div>
                            <p className="font-medium">{item.productName}</p>
                            <p className="text-sm text-gray-600">
                              {item.size && `ขนาด: ${item.size}`}
                              {item.color && ` | สี: ${item.color}`}
                              {` | จำนวน: ${item.quantity}`}
                            </p>
                          </div>
                          <p className="font-semibold">฿{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      ))}
                    </div>

                    {/* Order Total */}
                    <div className="flex justify-between items-center pt-4 border-t">
                      <span className="font-semibold">ยอดรวมทั้งสิ้น:</span>
                      <span className="text-xl font-bold text-primary">฿{order.total.toLocaleString()}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-4">
                      <Link href={`/orders/${order.id}`}>
                        <Button variant="outline" size="sm">
                          <Eye className="mr-2 h-4 w-4" />
                          ดูรายละเอียด
                        </Button>
                      </Link>

                      {order.status === "paid" && (
                        <Link href={`/invoice/${order.id}`}>
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4" />
                            ดาวน์โหลดใบเสร็จ
                          </Button>
                        </Link>
                      )}

                      <Link href="/chat">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          ติดต่อเรา
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
