"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard, Truck, MapPin } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/hooks/use-toast"
import { mockOrders } from "@/lib/mock-orders"
import type { OrderStatus, ShippingStatus } from "@/types/order"
import { db } from "@/lib/database"

export default function CheckoutPage() {
  const { state, dispatch } = useCart()
  const { user, isAuthenticated, guestId } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  })
  const [deliveryDate, setDeliveryDate] = useState("")

  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [cardInfo, setCardInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<any | null>(null)

  const [agreeTerms, setAgreeTerms] = useState(false)
  const [checklist, setChecklist] = useState({ confirmSize: false, confirmColor: false })
  const [isProcessing, setIsProcessing] = useState(false)

  const shipping = state.total >= 1500 ? 0 : 100
  const tax = Math.round(state.total * 0.07)
  const discountAmount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? Math.round(state.total * (appliedCoupon.discount / 100))
      : appliedCoupon.discount
    : 0
  const finalTotal = state.total - discountAmount + shipping + tax

  const handleApplyCoupon = async () => {
    const coupons = await db.getCoupons()
    const found = coupons.find(
      (c) => c.code.toUpperCase() === couponCode.toUpperCase() && c.active,
    )
    if (!found) {
      toast({ title: "รหัสไม่ถูกต้อง", variant: "destructive" })
      setAppliedCoupon(null)
      return
    }
    if (found.minAmount && state.total < found.minAmount) {
      toast({ title: "ยอดซื้อไม่ถึงขั้นต่ำ" , variant: "destructive" })
      return
    }
    setAppliedCoupon(found)
    toast({ title: "ใช้คูปองแล้ว", description: found.code })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!shippingInfo.firstName || !shippingInfo.phone || !shippingInfo.address) {
      toast({ title: "กรุณากรอกข้อมูลให้ครบ", variant: "destructive" })
      return
    }

    if (!checklist.confirmSize || !checklist.confirmColor) {
      toast({ title: "กรุณาทำ checklist ให้ครบ", variant: "destructive" })
      return
    }

    if (!agreeTerms) {
      toast({
        title: "กรุณายอมรับเงื่อนไข",
        description: "โปรดยอมรับเงื่อนไขการใช้งานก่อนดำเนินการต่อ",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      const orderId = `ORD-${Date.now()}`

      mockOrders.push({
        id: orderId,
        customerId: user?.id || guestId || "guest",
        customerName: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        customerEmail: shippingInfo.email,
        items: state.items.map((item) => ({
          productId: item.id,
          productName: item.name,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          color: item.color,
        })),
        total: finalTotal,
        status: "paid",
        depositPercent: 100,
        createdAt: new Date().toISOString(),
        shippingAddress: {
          name: `${shippingInfo.firstName} ${shippingInfo.lastName}`,
          address: shippingInfo.address,
          city: shippingInfo.city,
          postalCode: shippingInfo.postalCode,
          phone: shippingInfo.phone,
        },
        delivery_method: "",
        tracking_number: "",
        shipping_fee: shipping,
        shipping_status: "pending" as ShippingStatus,
        shipping_date: "",
        delivery_note: "",
        scheduledDelivery: deliveryDate || undefined,
        reorderedFromId: sessionStorage.getItem("reorderFromId") || undefined,
        checklist: {
          items: ["confirmSize", "confirmColor"],
          passed: checklist.confirmSize && checklist.confirmColor,
        },
        validated: true,
        guest: !isAuthenticated,
        timeline: [
          {
            timestamp: new Date().toISOString(),
            status: "paid" as OrderStatus,
            updatedBy: user?.email || "customer",
            note: "Order placed",
            flag: "normal",
          },
        ],
      })

      sessionStorage.removeItem("reorderFromId")

      toast({
        title: "สั่งซื้อสำเร็จ!",
        description: `คำสั่งซื้อ ${orderId} ได้รับการยืนยันแล้ว`,
      })

      dispatch({ type: "CLEAR_CART" })
      router.push(`/success/${orderId}`)
    }, 3000)
  }

  if (state.items.length === 0) {
    if (typeof window !== "undefined") {
      router.push("/cart")
    }
    return null
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">ชำระเงิน</h1>

        <div className="py-10 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-center mb-2">
            บิลนี้เป็นของคุณเท่านั้น
          </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    ข้อมูลการจัดส่ง
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">ชื่อ *</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">นามสกุล *</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">อีเมล *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
                      <Input
                        id="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">ที่อยู่ *</Label>
                    <Textarea
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">จังหวัด *</Label>
                      <Select
                        value={shippingInfo.city}
                        onValueChange={(value) => setShippingInfo({ ...shippingInfo, city: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกจังหวัด" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="กรุงเทพฯ">กรุงเทพฯ</SelectItem>
                          <SelectItem value="เชียงใหม่">เชียงใหม่</SelectItem>
                          <SelectItem value="ขอนแก่น">ขอนแก่น</SelectItem>
                          <SelectItem value="สงขลา">สงขลา</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">รหัสไปรษณีย์ *</Label>
                      <Input
                        id="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                  <Label htmlFor="notes">หมายเหตุ (ไม่บังคับ)</Label>
                  <Textarea
                    id="notes"
                    placeholder="หมายเหตุเพิ่มเติมสำหรับการจัดส่ง"
                    value={shippingInfo.notes}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, notes: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deliveryDate">วันนัดจัดส่ง</Label>
                  <Input
                    id="deliveryDate"
                    type="datetime-local"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

              {/* Payment Method */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2 h-5 w-5" />
                    วิธีการชำระเงิน
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="credit-card" id="credit-card" />
                      <Label htmlFor="credit-card">บัตรเครดิต/เดบิต</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                      <Label htmlFor="bank-transfer">โอนเงินผ่านธนาคาร</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="promptpay" id="promptpay" />
                      <Label htmlFor="promptpay">พร้อมเพย์</Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "credit-card" && (
                    <div className="space-y-4 mt-4 p-4 border rounded-lg">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">หมายเลขบัตร *</Label>
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={cardInfo.cardNumber}
                          onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.target.value })}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiryDate">วันหมดอายุ *</Label>
                          <Input
                            id="expiryDate"
                            placeholder="MM/YY"
                            value={cardInfo.expiryDate}
                            onChange={(e) => setCardInfo({ ...cardInfo, expiryDate: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV *</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">ชื่อบนบัตร *</Label>
                        <Input
                          id="cardName"
                          placeholder="ชื่อตามที่ปรากฏบนบัตร"
                          value={cardInfo.cardName}
                          onChange={(e) => setCardInfo({ ...cardInfo, cardName: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>สรุปคำสั่งซื้อ</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-3">
                    {state.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover rounded"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                          <p className="text-xs text-gray-600">
                            {item.size} | {item.color} | จำนวน {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium">฿{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="รหัสคูปอง"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      />
                      <Button type="button" onClick={handleApplyCoupon}>ใช้</Button>
                    </div>
                    {appliedCoupon && (
                      <p className="text-sm text-green-600">
                        ใช้คูปอง {appliedCoupon.code} ลด {appliedCoupon.type === "percentage" ? `${appliedCoupon.discount}%` : `฿${appliedCoupon.discount}`}
                      </p>
                    )}
                    <div className="flex justify-between">
                      <span>ยอดรวมสินค้า</span>
                      <span>฿{state.total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ค่าจัดส่ง</span>
                      <span>{shipping === 0 ? "ฟรี" : `฿${shipping}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>ภาษี (7%)</span>
                      <span>฿{tax.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>ยอดรวมทั้งสิ้น</span>
                      <span>฿{finalTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Submit */}
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="size-ok"
                        checked={checklist.confirmSize}
                        onCheckedChange={(v) =>
                          setChecklist({ ...checklist, confirmSize: v as boolean })
                        }
                      />
                      <Label htmlFor="size-ok" className="text-sm">ยืนยันขนาดถูกต้อง</Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="color-ok"
                        checked={checklist.confirmColor}
                        onCheckedChange={(v) =>
                          setChecklist({ ...checklist, confirmColor: v as boolean })
                        }
                      />
                      <Label htmlFor="color-ok" className="text-sm">ยืนยันสีถูกต้อง</Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={agreeTerms}
                        onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        ฉันยอมรับ{' '}
                        <a href="/terms" className="text-blue-600 hover:underline">
                          เงื่อนไขการใช้งาน
                        </a>{' '}
                        และ{' '}
                        <a href="/privacy" className="text-blue-600 hover:underline">
                          นโยบายความเป็นส่วนตัว
                        </a>
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={
                      !agreeTerms ||
                      isProcessing ||
                      !checklist.confirmSize ||
                      !checklist.confirmColor
                    }
                  >
                    {isProcessing ? "กำลังดำเนินการ..." : `ชำระเงิน ฿${finalTotal.toLocaleString()}`}
                  </Button>

                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                      <Truck className="h-4 w-4" />
                      <span>จัดส่งภายใน 2-3 วันทำการ</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  )
}
