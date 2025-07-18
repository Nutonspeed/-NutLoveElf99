"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, PrinterIcon as Print, Edit } from "lucide-react"
import { SendToChatModal } from "@/components/admin/SendToChatModal"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Separator } from "@/components/ui/separator"
import OrderStatusDropdown from "@/components/admin/orders/OrderStatusDropdown"
import { OrderTimeline, type TimelineEntry } from "@/components/order/OrderTimeline"
import {
  mockOrders,
  setPackingStatus,
  setOrderStatus,
  setConversationId as updateConversationId,
} from "@/lib/mock-orders"
import { mockProducts } from "@/lib/mock-products"
import { useCart } from "@/contexts/cart-context"
import type { Order } from "@/types/order"
import type { OrderStatus, ShippingStatus, PackingStatus } from "@/types/order"
import { shippingStatusOptions, packingStatusOptions } from "@/types/order"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { getBillLink } from "@/lib/mock-quick-bills"
import { getPayment, verifyPayment } from "@/lib/mock/payment"
import { mockChatStatus, loadChatStatus, markChatSent } from "@/lib/mock/chat"

const statusTag = (o: Order) => {
  if (o.status === "depositPaid")
    return <Badge className="bg-blue-500 text-white">รอมัดจำ</Badge>
  if (o.status === "paid" && o.shipping_status === "pending")
    return <Badge className="bg-yellow-500 text-white">รอจัดส่ง</Badge>
  if (o.status === "completed" || o.shipping_status === "delivered")
    return <Badge className="bg-green-500 text-white">ปิดยอดแล้ว</Badge>
  if (o.status === "pendingPayment")
    return <Badge className="bg-red-500 text-white">ยังไม่โอน</Badge>
  return null
}

export default function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const orderIndex = mockOrders.findIndex((o) => o.id === id)
  const order = mockOrders[orderIndex]

  const [status, setStatus] = useState<OrderStatus>(order?.status ?? "pendingPayment")
  const [shippingStatus, setShippingStatus] = useState<ShippingStatus>(order?.shipping_status ?? "pending")
  const [packingStatus, setPackingStatusState] = useState<PackingStatus>(order?.packingStatus ?? "packing")
  const [scheduledDelivery, setScheduledDelivery] = useState(order?.scheduledDelivery || "")
  const [chatNote, setChatNote] = useState(order?.chatNote || "")
  const [conversationId, setConversationIdState] = useState(order?.conversationId || "")
  const [payment, setPayment] = useState(() => getPayment(id))
  const [chatSent, setChatSent] = useState<boolean>(mockChatStatus[id] || false)
  const [showSendModal, setShowSendModal] = useState(false)

  useEffect(() => {
    if (!order) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Mock Error at orders/[id]')
      }
    }
    setPayment(getPayment(id))
    loadChatStatus()
    setChatSent(mockChatStatus[id] || false)
  }, [order, router])

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 text-center">
          <p>ไม่พบข้อมูล</p>
          <Link href="/admin/dashboard">
            <Button>กลับแดชบอร์ด</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleAddEntry = (entry: TimelineEntry) => {
    mockOrders[orderIndex].timeline.push(entry)
    setOrderStatus(order.id, entry.status)
    setStatus(entry.status)
    toast.success("บันทึกสถานะแล้ว")
  }

  const handleShippingChange = (value: ShippingStatus) => {
    mockOrders[orderIndex].shipping_status = value
    mockOrders[orderIndex].shipping_date = new Date().toISOString()
    setShippingStatus(value)
    toast.success("อัปเดตสถานะจัดส่งแล้ว")
  }

  const handlePackingChange = (value: PackingStatus) => {
    setPackingStatus(order.id, value)
    setPackingStatusState(value)
    toast.success("อัปเดตสถานะแพ็กแล้ว")
  }

  const { dispatch } = useCart()

  const handleReorder = () => {
    for (const item of order.items) {
      const product = mockProducts.find((p) => p.id === item.productId)
      if (!product || !product.inStock || product.status === "draft") {
        toast.error(`สินค้า ${item.productName} ไม่สามารถสั่งซ้ำได้`)
        return
      }
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: item.productId,
          name: item.productName,
          price: item.price,
          image: "/placeholder.svg",
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        },
      })
    }
    toast.success("เพิ่มสินค้าลงตะกร้าแล้ว")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">คำสั่งซื้อ {order.id}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>สถานะคำสั่งซื้อ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <OrderStatusDropdown status={status} onChange={setStatus} />
            {statusTag(order)}
            <Badge variant="outline">
              {chatSent ? '🟢 ส่งแล้วในแชท' : '⚪ ยังไม่ได้ส่ง'}
            </Badge>
            <div className="flex space-x-2 mt-2">
              {order.items.length > 0 && (
                <Button variant="outline" onClick={() => window.open(`/admin/orders/${id}/print`, "_blank") }>
                  <Print className="mr-2 h-4 w-4" />
                  ดู PDF
                </Button>
              )}
              <Button variant="outline" onClick={() => window.open(`/admin/orders/${id}/label`, "_blank") }>
                <Print className="mr-2 h-4 w-4" />
                พิมพ์ใบจ่าหน้า
              </Button>
              <Link href={`/admin/orders/edit/${id}`}>
                <Button variant="outline">
                  <Edit className="mr-2 h-4 w-4" />
                  แก้ไขบิล
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => {
                  try {
                    const url = `http://localhost:3001/inbox/123?msg=/b/${id}`
                    const w = window.open(url, '_blank')
                    if (!w) throw new Error('no-window')
                    markChatSent(id)
                    setChatSent(true)
                  } catch (err) {
                    toast.error('เปิดแชทไม่ได้ กรุณาตรวจสอบเซิร์ฟเวอร์')
                    const link = getBillLink(id)
                    if (link) {
                      navigator.clipboard.writeText(link)
                      toast.success('คัดลอกลิงก์บิลแทน')
                    }
                  }
                }}
              >
                ส่งบิลให้ลูกค้าผ่านแชท
              </Button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() => setShowSendModal(true)}
              >
                ส่งบิลเข้าแชท
              </button>
              <Button
                variant="outline"
                onClick={() => {
                  const link = getBillLink(id)
                  if (link) {
                    navigator.clipboard.writeText(link)
                    toast.success("คัดลอกลิงก์แล้ว")
                  }
                }}
                disabled={!getBillLink(id)}
                title={getBillLink(id) ? undefined : "ไม่พบลิงก์บิลนี้"}
              >
                คัดลอกลิงก์
              </Button>
              <Button variant="outline" onClick={handleReorder}>
            สั่งซ้ำ
          </Button>
        </div>
      </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>สถานะการโอน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {payment ? (
            <div className="space-y-1">
              <p>วันที่: {new Date(payment.date).toLocaleDateString('th-TH')}</p>
              <p>จำนวน: ฿{payment.amount.toLocaleString()}</p>
              {payment.slip && <p className="text-sm text-gray-600">{payment.slip}</p>}
              {!payment.verified && (
                <Button size="sm" onClick={() => {
                  verifyPayment(id)
                  setPayment({ ...payment, verified: true })
                  setOrderStatus(id, 'processing')
                  toast.success('ยืนยันการชำระแล้ว')
                }}>Mark as Verified</Button>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-600">Awaiting payment</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>ไทม์ไลน์สถานะ</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderTimeline
                timeline={order.timeline}
                editable
                onAddEntry={handleAddEntry}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>รายการสินค้า</CardTitle>
            </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b pb-2 last:border-b-0">
                  <div>
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-sm text-gray-600">
                      {item.size && `ขนาด: ${item.size}`} {item.color && `| สี: ${item.color}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>จำนวน: {item.quantity}</p>
                    <p className="font-semibold">฿{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between font-bold">
              <span>ยอดรวมทั้งสิ้น:</span>
              <span>฿{order.total.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ที่อยู่จัดส่ง</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
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
            <CardTitle>สถานะการจัดส่ง</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>วิธีจัดส่ง: {order.delivery_method || "-"}</p>
            <p>เลขติดตามพัสดุ: {order.tracking_number || "-"}</p>
            <p>ค่าจัดส่ง: ฿{order.shipping_fee.toLocaleString()}</p>
            <div className="flex items-center space-x-2">
              <span>สถานะ:</span>
              <Select value={shippingStatus} onValueChange={(v) => handleShippingChange(v as ShippingStatus)}>
                <SelectTrigger className="w-32">
                  <Badge>{shippingStatus}</Badge>
                </SelectTrigger>
                <SelectContent>
                  {shippingStatusOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <span>แพ็กสินค้า:</span>
              <Select value={packingStatus} onValueChange={(v) => handlePackingChange(v as PackingStatus)}>
                <SelectTrigger className="w-32">
                  <Badge>{packingStatusOptions.find((o) => o.value === packingStatus)?.label}</Badge>
                </SelectTrigger>
                <SelectContent>
                  {packingStatusOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <label htmlFor="scheduledDelivery">วันนัดจัดส่ง:</label>
              <input
                id="scheduledDelivery"
                type="datetime-local"
                className="border rounded px-2 py-1"
                value={scheduledDelivery}
                onChange={(e) => {
                  const val = e.target.value
                  setScheduledDelivery(val)
                  mockOrders[orderIndex].scheduledDelivery = val
                }}
              />
            </div>
            <p>วันที่เปลี่ยน: {order.shipping_date ? new Date(order.shipping_date).toLocaleDateString("th-TH") : "-"}</p>
            <p>หมายเหตุ: {order.delivery_note || "-"}</p>
            <Button variant="outline" onClick={() => {
              const note = window.prompt("เพิ่มบันทึกการโทร/ส่ง")
              if (note) {
                mockOrders[orderIndex].delivery_note = note
                toast.success("บันทึกแล้ว")
              }
            }}>
              เพิ่มบันทึกการโทร/ส่ง
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>เชื่อมต่อแชท</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <input
              className="border rounded w-full p-2"
              value={conversationId}
              onChange={(e) => setConversationIdState(e.target.value)}
              placeholder="conversation id"
            />
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  updateConversationId(order.id, conversationId)
                  mockOrders[orderIndex].conversationId = conversationId
                  toast.success('บันทึกแล้ว')
                }}
              >
                บันทึก
              </Button>
              {conversationId && (
                <Button
                  variant="outline"
                  onClick={() => {
                    updateConversationId(order.id, '')
                    mockOrders[orderIndex].conversationId = undefined
                    setConversationIdState('')
                    toast.success('ลบการเชื่อมต่อแล้ว')
                  }}
                >
                  ลบ
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>โน้ตจากแชท</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <textarea
              className="border rounded w-full p-2"
              value={chatNote}
              onChange={(e) => setChatNote(e.target.value)}
            />
            <Button
              variant="outline"
              onClick={() => {
                mockOrders[orderIndex].chatNote = chatNote
                toast.success("บันทึกแล้ว")
              }}
            >
              บันทึก
            </Button>
          </CardContent>
        </Card>
        <div className="flex justify-end">
          <Button
            onClick={async () => {
              try {
                setOrderStatus(order.id, "completed")
                setStatus("completed")
                toast.success("Order closed successfully")
              } catch (err) {
                toast.error("Failed to close order")
              }
            }}
          >
            Close Order
          </Button>
        </div>
      </div>
      {showSendModal && (
        <SendToChatModal
          orderId={order.id}
          onClose={() => setShowSendModal(false)}
        />
      )}
    </div>
  )
}
