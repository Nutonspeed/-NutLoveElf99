"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { state, dispatch } = useCart()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const applyPromoCode = () => {
    if (promoCode === "SAVE10") {
      setDiscount(state.total * 0.1)
    } else if (promoCode === "WELCOME20") {
      setDiscount(state.total * 0.2)
    } else {
      setDiscount(0)
    }
  }

  const shipping = state.total >= 1500 ? 0 : 100
  const finalTotal = state.total - discount + shipping

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center space-y-6">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto" />
            <h1 className="text-3xl font-bold">ตะกร้าสินค้าว่างเปล่า</h1>
            <p className="text-gray-600 max-w-md mx-auto">ยังไม่มีสินค้าในตะกร้าของคุณ เริ่มช้อปปิ้งเพื่อค้นหาสินค้าที่คุณชื่นชอบ</p>
            <Link href="/products">
              <Button size="lg">
                เริ่มช้อปปิ้ง
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">ตะกร้าสินค้า ({state.itemCount} รายการ)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg line-clamp-2">{item.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                        {item.size && <span>ขนาด: {item.size}</span>}
                        {item.color && <span>สี: {item.color}</span>}
                      </div>
                      <p className="text-lg font-bold text-primary mt-2">฿{item.price.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg">฿{(item.price * item.quantity).toLocaleString()}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-700 mt-2"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        ลบ
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>สรุปคำสั่งซื้อ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>ยอดรวมสินค้า</span>
                  <span>฿{state.total.toLocaleString()}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>ส่วนลด</span>
                    <span>-฿{discount.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>ค่าจัดส่ง</span>
                  <span>{shipping === 0 ? "ฟรี" : `฿${shipping}`}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>ยอดรวมทั้งสิ้น</span>
                  <span>฿{finalTotal.toLocaleString()}</span>
                </div>

                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input placeholder="รหัสส่วนลด" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
                    <Button variant="outline" onClick={applyPromoCode}>
                      ใช้
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600">ลองใช้: SAVE10 (ลด 10%) หรือ WELCOME20 (ลด 20%)</p>
                </div>

                <Link href="/checkout">
                  <Button className="w-full" size="lg">
                    ดำเนินการชำระเงิน
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Button
                  variant="secondary"
                  className="w-full"
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(state.items))
                    toast({ title: "คัดลอกข้อมูลตะกร้าแล้ว" })
                  }}
                >
                  ส่งเข้าร้าน
                </Button>

                <Link href="/admin/bill/create?from=cart">
                  <Button variant="outline" className="w-full bg-transparent">
                    เปิดบิลจากตะกร้า
                  </Button>
                </Link>

                <Link href="/products">
                  <Button variant="outline" className="w-full bg-transparent">
                    ช้อปปิ้งต่อ
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center space-y-2">
                  <p className="font-medium">จัดส่งฟรี!</p>
                  <p className="text-sm text-gray-600">สำหรับคำสั่งซื้อตั้งแต่ ฿1,500 ขึ้นไป</p>
                  {state.total < 1500 && (
                    <p className="text-sm text-blue-600">เพิ่มอีก ฿{(1500 - state.total).toLocaleString()} เพื่อได้จัดส่งฟรี</p>
                  )}
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
