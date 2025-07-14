"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Copy, Gift, Percent, Truck, Calendar, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { db } from "@/lib/database"
import { DevelopmentNotice } from "@/components/development-notice"

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const [showNotice, setShowNotice] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadCoupons()
  }, [])

  const loadCoupons = async () => {
    try {
      const data = await db.getCoupons()
      // Add mock coupon data
      const mockCoupons = [
        ...data,
        {
          id: "4",
          code: "NEWUSER50",
          title: "ส่วนลดสมาชิกใหม่",
          description: "ลด 50% สำหรับการสั่งซื้อครั้งแรก",
          discount: 0.5,
          type: "percentage",
          minOrder: 1000,
          maxDiscount: 500,
          active: true,
          expiryDate: "2024-12-31",
          usageLimit: 100,
          usedCount: 23,
        },
        {
          id: "5",
          code: "SUMMER2024",
          title: "โปรโมชั่นฤดูร้อน",
          description: "ลด 300 บาท สำหรับการสั่งซื้อขั้นต่ำ 2,000 บาท",
          discount: 300,
          type: "fixed",
          minOrder: 2000,
          active: true,
          expiryDate: "2024-08-31",
          usageLimit: 500,
          usedCount: 156,
        },
        {
          id: "6",
          code: "WEEKEND20",
          title: "ส่วนลดวันหยุด",
          description: "ลด 20% ทุกวันเสาร์-อาทิตย์",
          discount: 0.2,
          type: "percentage",
          minOrder: 500,
          maxDiscount: 1000,
          active: true,
          expiryDate: "2024-12-31",
          usageLimit: null,
          usedCount: 89,
        },
      ]
      setCoupons(mockCoupons)
    } catch (error) {
      console.error("Error loading coupons:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast({
      title: "คัดลอกแล้ว!",
      description: `รหัสคูปอง ${code} ถูกคัดลอกไปยังคลิปบอร์ดแล้ว`,
    })

    setTimeout(() => setCopiedCode(null), 2000)
  }

  const getDiscountText = (coupon: any) => {
    if (coupon.type === "percentage") {
      return `ลด ${(coupon.discount * 100).toFixed(0)}%`
    } else {
      return `ลด ฿${coupon.discount.toLocaleString()}`
    }
  }

  const getIcon = (coupon: any) => {
    if (coupon.code.includes("SHIP")) return Truck
    if (coupon.type === "percentage") return Percent
    return Gift
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดคูปอง...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center">
            <Gift className="mr-3 h-8 w-8 text-primary" />
            คูปองส่วนลด
          </h1>
          <p className="text-gray-600">รวบรวมคูปองส่วนลดและโปรโมชั่นพิเศษสำหรับคุณ</p>
        </div>

        {showNotice && (
          <div className="mb-6">
            <DevelopmentNotice
              feature="ระบบคูปองขั้นสูง"
              description="ระบบคูปองส่วนตัว การแจกคูปองตามเงื่อนไข และการติดตามการใช้งาน ยังอยู่ระหว่างการพัฒนา"
              onClose={() => setShowNotice(false)}
            />
          </div>
        )}

        {/* Active Coupons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {coupons
            .filter((coupon) => coupon.active)
            .map((coupon) => {
              const IconComponent = getIcon(coupon)
              const isExpiringSoon = new Date(coupon.expiryDate) < new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
              const usagePercentage = coupon.usageLimit ? (coupon.usedCount / coupon.usageLimit) * 100 : 0

              return (
                <Card key={coupon.id} className="relative overflow-hidden">
                  {isExpiringSoon && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg">
                      ใกล้หมดอายุ
                    </div>
                  )}

                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{coupon.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {getDiscountText(coupon)}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-gray-600 text-sm">{coupon.description}</p>

                    {/* Coupon Code */}
                    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">รหัสคูปอง</p>
                          <p className="font-mono font-bold text-lg">{coupon.code}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(coupon.code)}
                          className="ml-2"
                        >
                          {copiedCode === coupon.code ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    {/* Conditions */}
                    <div className="space-y-2 text-sm text-gray-600">
                      {coupon.minOrder && <p>• ใช้ได้กับการสั่งซื้อขั้นต่ำ ฿{coupon.minOrder.toLocaleString()}</p>}
                      {coupon.maxDiscount && <p>• ส่วนลดสูงสุด ฿{coupon.maxDiscount.toLocaleString()}</p>}
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>หมดอายุ: {new Date(coupon.expiryDate).toLocaleDateString("th-TH")}</span>
                      </div>
                    </div>

                    {/* Usage Progress */}
                    {coupon.usageLimit && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>ใช้งานแล้ว</span>
                          <span>
                            {coupon.usedCount}/{coupon.usageLimit}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all duration-300"
                            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <Separator />

                    <Button className="w-full" onClick={() => copyToClipboard(coupon.code)}>
                      {copiedCode === coupon.code ? "คัดลอกแล้ว!" : "คัดลอกรหัส"}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
        </div>

        {/* How to Use */}
        <Card>
          <CardHeader>
            <CardTitle>วิธีใช้คูปอง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold">คัดลอกรหัส</h3>
                <p className="text-sm text-gray-600">คลิกปุ่มคัดลอกรหัสคูปองที่ต้องการ</p>
              </div>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold">เลือกสินค้า</h3>
                <p className="text-sm text-gray-600">เพิ่มสินค้าที่ต้องการลงในตะกร้า</p>
              </div>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold">ใส่รหัสคูปอง</h3>
                <p className="text-sm text-gray-600">ใส่รหัสในหน้าชำระเงินเพื่อรับส่วนลด</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  )
}
