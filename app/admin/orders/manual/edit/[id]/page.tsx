"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Copy, ExternalLink, X } from "lucide-react"
import Link from "next/link"
import { OrderItemsRepeater } from "@/components/OrderItemsRepeater"
import { OrderSummary } from "@/components/order/order-summary"
import type { OrderItem, ManualOrder, OrderStatus } from "@/types/order"
import { orderStatusOptions } from "@/types/order"
import { orderDb } from "@/lib/order-database"
import { toast } from "sonner"

interface EditManualOrderPageProps {
  params: {
    id: string
  }
}

export default function EditManualOrderPage({ params }: EditManualOrderPageProps) {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [order, setOrder] = useState<ManualOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

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
      router.push("/login")
    }
  }, [isAuthenticated, user, router, isLoading])

  useEffect(() => {
    if (params.id) {
      loadOrder()
    }
  }, [params.id])

  const loadOrder = async () => {
    try {
      const orderData = await orderDb.getManualOrderById(params.id)
      if (!orderData) {
        toast.error("ไม่พบออเดอร์ที่ระบุ")
        router.push("/admin/orders/manual")
        return
      }

      setOrder(orderData)
      setCustomerName(orderData.customerName)
      setCustomerPhone(orderData.customerPhone)
      setCustomerEmail(orderData.customerEmail || "")
      setCustomerAddress(orderData.customerAddress || "")
      setItems(orderData.items)
      setDiscount(orderData.discount)
      setShippingCost(orderData.shippingCost)
      setTax(orderData.tax)
      setNotes(orderData.notes || "")
      setAttachments(orderData.attachments)
      setStatus(orderData.status)
      setPaymentStatus(orderData.paymentStatus)
    } catch (error) {
      toast.error("ไม่สามารถโหลดข้อมูลออเดอร์ได้")
      router.push("/admin/orders/manual")
    } finally {
      setLoading(false)
    }
  }

  if (isLoading || loading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated || user?.role !== "admin" || !order) {
    return null
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const total = subtotal - discount + shippingCost + tax

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newAttachments: string[] = []
      Array.from(files).forEach((file) => {
        const url = URL.createObjectURL(file)
        newAttachments.push(url)
      })
      setAttachments([...attachments, ...newAttachments])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const saveOrder = async () => {
    setSaving(true)
    try {
      const updates: Partial<ManualOrder> = {
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
        status,
        paymentStatus,
        notes,
        attachments,
      }

      await orderDb.updateManualOrder(params.id, updates)
      toast.success("บันทึกการเปลี่ยนแปลงแล้ว")
      await loadOrder() // Reload to get updated data
    } catch (error) {
      toast.error("ไม่สามารถบันทึกการเปลี่ยนแปลงได้")
    } finally {
      setSaving(false)
    }
  }

  const copyPublicLink = () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/order/${order.publicLink}`
        : ""
    if (url) {
      navigator.clipboard.writeText(url)
      toast.success("คัดลอกลิงก์แล้ว")
    }
  }

  const openPublicLink = () => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/order/${order.publicLink}`
        : ""
    if (url && typeof window !== "undefined") {
      window.open(url, "_blank")
    }
  }

  const getStatusBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case "delivered":
        return "default"
      case "shipped":
        return "secondary"
      case "processing":
        return "outline"
      case "confirmed":
        return "default"
      case "pending":
        return "destructive"
      case "draft":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case "draft":
        return "ร่าง"
      case "pending":
        return "รอยืนยัน"
      case "confirmed":
        return "ยืนยันแล้ว"
      case "processing":
        return "กำลังดำเนินการ"
      case "shipped":
        return "จัดส่งแล้ว"
      case "delivered":
        return "ส่งมอบแล้ว"
      case "cancelled":
        return "ยกเลิก"
      default:
        return status
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
              <div className="flex items-center space-x-2 mb-1">
                <h1 className="text-3xl font-bold">{order.orderNumber}</h1>
                <Badge variant={getStatusBadgeVariant(order.status)}>{getStatusText(order.status)}</Badge>
              </div>
              <p className="text-gray-600">แก้ไขออเดอร์แมนนวล</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={copyPublicLink}>
              <Copy className="h-4 w-4 mr-2" />
              คัดลอกลิงก์
            </Button>
            <Button variant="outline" onClick={openPublicLink}>
              <ExternalLink className="h-4 w-4 mr-2" />
              ดูหน้าลูกค้า
            </Button>
            <Button onClick={saveOrder} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              บันทึก
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลออเดอร์</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>เลขที่ออเดอร์</Label>
                    <Input value={order.orderNumber} disabled />
                  </div>
                  <div>
                    <Label>วันที่สร้าง</Label>
                    <Input value={new Date(order.createdAt).toLocaleDateString("th-TH")} disabled />
                  </div>
                  <div>
                    <Label>ลิงก์สาธารณะ</Label>
                    <div className="flex items-center space-x-2">
                      <Input value={order.publicLink} disabled className="flex-1" />
                      <Button variant="outline" size="icon" onClick={copyPublicLink}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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

          {/* Sidebar */}
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
                <Button className="w-full" onClick={saveOrder} disabled={saving}>
                  <Save className="h-4 w-4 mr-2" />
                  บันทึกการเปลี่ยนแปลง
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={copyPublicLink}>
                  <Copy className="h-4 w-4 mr-2" />
                  คัดลอกลิงก์ลูกค้า
                </Button>
                <Button variant="outline" className="w-full bg-transparent" onClick={openPublicLink}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  ดูหน้าลูกค้า
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
