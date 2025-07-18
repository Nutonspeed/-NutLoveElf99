"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Send, X } from "lucide-react"
import Link from "next/link"
import { OrderItemsRepeater } from "@/components/OrderItemsRepeater"
import { OrderSummary } from "@/components/order/order-summary"
import type { OrderItem, ManualOrder, OrderStatus } from "@/types/order"
import { orderStatusOptions } from "@/types/order"
import { orderDb } from "@/lib/order-database"
import { toast } from "sonner"

export default function CreateManualOrderPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Form state
  const [customerName, setCustomerName] = useState("")
  const [customerPhone, setCustomerPhone] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerAddress, setCustomerAddress] = useState("")
  const [items, setItems] = useState<OrderItem[]>([])
  const [discount, setDiscount] = useState(0)
  const [shippingCost, setShippingCost] = useState(0)
  const [tax, setTax] = useState(0)
  const [notes, setNotes] = useState("")
  const [attachments, setAttachments] = useState<string[]>([])
  const [status, setStatus] = useState<ManualOrder["status"]>("draft")
  const [paymentStatus, setPaymentStatus] = useState<ManualOrder["paymentStatus"]>("unpaid")

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/auth/login")
    }
  }, [isAuthenticated, user, router, isLoading])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity * (1 - (item.discount ?? 0) / 100),
    0
  )
  const total = subtotal - discount + shippingCost + tax

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newAttachments: string[] = []
      Array.from(files).forEach((file) => {
        // In a real app, you would upload to a server
        const url = URL.createObjectURL(file)
        newAttachments.push(url)
      })
      setAttachments([...attachments, ...newAttachments])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    if (!customerName.trim()) {
      toast.error("กรุณากรอกชื่อลูกค้า")
      return false
    }
    if (!customerPhone.trim()) {
      toast.error("กรุณากรอกเบอร์โทรลูกค้า")
      return false
    }
    if (items.length === 0) {
      toast.error("กรุณาเพิ่มสินค้าอย่างน้อย 1 รายการ")
      return false
    }
    return true
  }

  const saveOrder = async (orderStatus: OrderStatus) => {
    if (!validateForm()) return

    setLoading(true)
    try {
      const orderData: Partial<ManualOrder> = {
        customerName,
        customerPhone,
        customerEmail,
        customerAddress,
        items,
        subtotal,
        discount,
        shippingCost,
        tax,
        total,
        status: orderStatus,
        paymentStatus,
        notes,
        attachments,
      }

      const newOrder = await orderDb.createManualOrder(orderData)

      if (orderStatus === "draft") {
        toast.success("บันทึกร่างออเดอร์แล้ว")
      } else {
        toast.success("สร้างออเดอร์แล้ว")
      }

      router.push(`/admin/orders/manual/edit/${newOrder.id}`)
    } catch (error) {
      toast.error("ไม่สามารถสร้างออเดอร์ได้")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin/orders/manual">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">สร้างออเดอร์แมนนวล</h1>
              <p className="text-gray-600">สร้างออเดอร์ใหม่สำหรับลูกค้า</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => saveOrder("draft")} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              บันทึกร่าง
            </Button>
            <Button onClick={() => saveOrder("pending")} disabled={loading}>
              <Send className="h-4 w-4 mr-2" />
              สร้างออเดอร์
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลลูกค้า</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="customerName">ชื่อลูกค้า *</Label>
                    <Input
                      id="customerName"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="ชื่อ-นามสกุล"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="customerPhone">เบอร์โทร *</Label>
                    <Input
                      id="customerPhone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="08x-xxx-xxxx"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="customerEmail">อีเมล (ไม่บังคับ)</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="customerAddress">ที่อยู่ (ไม่บังคับ)</Label>
                  <Textarea
                    id="customerAddress"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    placeholder="ที่อยู่สำหรับจัดส่ง"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Items */}
            <OrderItemsRepeater items={items} onItemsChange={setItems} />

            {/* Order Settings */}
            <Card>
              <CardHeader>
                <CardTitle>การตั้งค่าออเดอร์</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="status">สถานะออเดอร์</Label>
                    <Select
                      value={status}
                      onValueChange={(value: OrderStatus) => setStatus(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {orderStatusOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="paymentStatus">สถานะการชำระเงิน</Label>
                    <Select
                      value={paymentStatus}
                      onValueChange={(value: ManualOrder["paymentStatus"]) => setPaymentStatus(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="unpaid">ยังไม่ชำระ</SelectItem>
                        <SelectItem value="partial">ชำระบางส่วน</SelectItem>
                        <SelectItem value="paid">ชำระแล้ว</SelectItem>
                        <SelectItem value="refunded">คืนเงินแล้ว</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Notes and Attachments */}
            <Card>
              <CardHeader>
                <CardTitle>หมายเหตุและไฟล์แนบ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="notes">หมายเหตุ</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="หมายเหตุเพิ่มเติมสำหรับออเดอร์นี้"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="attachments">ไฟล์แนบ (รูปภาพ)</Label>
                  <div className="space-y-2">
                    <Input id="attachments" type="file" multiple accept="image/*" onChange={handleFileUpload} />
                    {attachments.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {attachments.map((attachment, index) => (
                          <div key={index} className="relative">
                            <img
                              src={attachment || "/placeholder.svg"}
                              alt={`Attachment ${index + 1}`}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-6 w-6"
                              onClick={() => removeAttachment(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Order Summary */}
          <div className="space-y-6">
            <OrderSummary
              items={items}
              discount={discount}
              shippingCost={shippingCost}
              tax={tax}
              onDiscountChange={setDiscount}
              onShippingCostChange={setShippingCost}
              onTaxChange={setTax}
            />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>การดำเนินการ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full bg-transparent"
                  onClick={() => saveOrder("draft")}
                  disabled={loading}
                >
                  <Save className="h-4 w-4 mr-2" />
                  บันทึกร่าง
                </Button>
                <Button className="w-full" onClick={() => saveOrder("pending")} disabled={loading}>
                  <Send className="h-4 w-4 mr-2" />
                  สร้างออเดอร์
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
