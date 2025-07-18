"use client"

import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/inputs/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/modals/dialog"
import { Search, ArrowLeft, Eye, FileText, Edit, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"
import { mockOrders, setPackingStatus, setOrderStatus } from "@/lib/mock-orders"
import { mockCustomers, checkCustomerInfo } from "@/lib/mock-customers"
import { createBill, confirmBill, mockBills } from "@/lib/mock-bills"
import { downloadCSV, downloadPDF } from "@/lib/mock-export"
import type { Order, OrderStatus, PackingStatus } from "@/types/order"
import { packingStatusOptions } from "@/types/order"
import { loadMockPreferences, mockPreferences } from "@/lib/mock-preferences"
import {
  getOrderStatusBadgeVariant,
  getOrderStatusText,
} from "@/lib/order-status"

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

const statusOptions = [
  { value: "all", label: "ทั้งหมด" },
  { value: "pendingPayment", label: "รอชำระ" },
  { value: "depositPaid", label: "มัดจำแล้ว" },
  { value: "paid", label: "ชำระครบ" },
  { value: "cancelled", label: "ยกเลิก" },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [customerFilter, setCustomerFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [bills, setBills] = useState(mockBills)
  const [showIds, setShowIds] = useState(mockPreferences.showIds)

  useEffect(() => {
    loadMockPreferences()
    setShowIds(mockPreferences.showIds)
  }, [])

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesCustomer =
      customerFilter === "all" || order.customerId === customerFilter

    return matchesSearch && matchesStatus && matchesCustomer
  })

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    setOrderStatus(orderId, newStatus)
  }

  const updatePackingStatus = (orderId: string, status: PackingStatus) => {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, packingStatus: status } : o)))
    setPackingStatus(orderId, status)
  }

  const handleCreateBill = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId)
    const warning = order ? checkCustomerInfo(order.customerId) : "ยังไม่สามารถตรวจสอบข้อมูลได้"
    if (warning) {
      toast.warning(warning)
      return
    }
    const bill = createBill(orderId)
    setBills([...mockBills])
    toast.success(`สร้างบิล ${bill.id}`)
    window.open(`/bills/${bill.id}`, "_blank")
  }

  const handlePrebookBill = (orderId: string) => {
    const order = orders.find((o) => o.id === orderId)
    const warning = order ? checkCustomerInfo(order.customerId) : "ยังไม่สามารถตรวจสอบข้อมูลได้"
    if (warning) {
      toast.warning(warning)
      return
    }
    const due = window.prompt("กำหนดวันครบชำระ YYYY-MM-DD") || undefined
    const bill = createBill(orderId, "pending", due)
    setBills([...mockBills])
    toast.success(`จองล่วงหน้า ${bill.id}`)
  }

  const handleConfirmBill = (billId: string, orderId: string) => {
    confirmBill(billId)
    setBills([...mockBills])
    updateOrderStatus(orderId, "paid")
    toast.success("ยืนยันยอดแล้ว")
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">จัดการคำสั่งซื้อ</h1>
              <p className="text-gray-600">ตรวจสอบและอัพเดทสถานะคำสั่งซื้อ</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle>รายการคำสั่งซื้อ ({filteredOrders.length})</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหาคำสั่งซื้อ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="สถานะ" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={customerFilter} onValueChange={setCustomerFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="ลูกค้า" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    {mockCustomers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={() => {
                  const id = window.prompt("สแกน QR เพื่อค้นหาออเดอร์")
                  if (!id) return
                  const o = mockOrders.find((m) => m.id === id)
                  if (o) {
                    toast.success(`พบคำสั่งซื้อ ${o.id}`)
                  } else {
                    toast.error("ไม่พบคำสั่งซื้อ")
                  }
                }}>
                  สแกน QR
                </Button>
                <Button onClick={() => downloadCSV(mockOrders, 'orders.csv')}>
                  Export CSV
                </Button>
                <Button onClick={() => downloadPDF('orders', 'orders.pdf')}>
                  Export PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="md:hidden space-y-4 mb-4">
              {filteredOrders.map((order) => (
                <details key={order.id} className="rounded-lg border p-4">
                  <summary className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-medium">{order.customerName}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(order.createdAt).toLocaleDateString("th-TH")}
                      </p>
                    </div>
                    {statusTag(order)}
                  </summary>
                  <div className="mt-2 space-y-1 text-sm">
                    {showIds && <p>รหัส: {order.id}</p>}
                    <p>ยอดรวม: ฿{order.total.toLocaleString()}</p>
                  </div>
                  <div className="mt-2 flex gap-2">
                    <Link href={`/admin/orders/${order.id}`}>
                      <Button size="sm">ดู</Button>
                    </Link>
                    <Button
                      size="sm"
                      onClick={() => updateOrderStatus(order.id, "completed")}
                    >
                      ปิดยอด
                    </Button>
                  </div>
                </details>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>รหัสคำสั่งซื้อ</TableHead>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>วันที่สั่งซื้อ</TableHead>
                  <TableHead>ยอดรวม</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>สถานะการแพ็ก</TableHead>
                  <TableHead>สถานะจัดส่ง</TableHead>
                  <TableHead>เหตุผลทิ้งบิล</TableHead>
                  <TableHead className="text-right">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      {showIds && (
                        <p className="font-medium">{order.id}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.customerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString("th-TH")}</TableCell>
                    <TableCell>
                      <p className="font-semibold">฿{order.total.toLocaleString()}</p>
                    </TableCell>
                    <TableCell>
                    <Select
                      value={order.status}
                      onValueChange={(value) => updateOrderStatus(order.id, value as OrderStatus)}
                    >
                      <SelectTrigger className="w-32">
                        <Badge variant={getOrderStatusBadgeVariant(order.status)}>
                          {getOrderStatusText(order.status)}
                        </Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {orderStatusOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {statusTag(order)}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={order.packingStatus}
                      onValueChange={(v) => updatePackingStatus(order.id, v as PackingStatus)}
                    >
                      <SelectTrigger className="w-28">
                        <Badge>{packingStatusOptions.find((o) => o.value === order.packingStatus)?.label}</Badge>
                      </SelectTrigger>
                      <SelectContent>
                        {packingStatusOptions.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{order.shipping_status}</TableCell>
                  <TableCell>{bills.find((b) => b.orderId === order.id)?.abandonReason || "-"}</TableCell>
                  <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => setSelectedOrder(order)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>รายละเอียดคำสั่งซื้อ {selectedOrder?.id}</DialogTitle>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-6">
                                {/* Customer Info */}
                                <div>
                                  <h4 className="font-semibold mb-2">ข้อมูลลูกค้า</h4>
                                  <div className="bg-gray-50 p-4 rounded-lg space-y-1">
                                    <p>
                                      <strong>ชื่อ:</strong> {selectedOrder.customerName}
                                    </p>
                                    <p>
                                      <strong>อีเมล:</strong> {selectedOrder.customerEmail}
                                    </p>
                                    <p className="flex items-center space-x-2">
                                      <strong>เบอร์โทร:</strong>
                                      <a
                                        href={`tel:${selectedOrder.shippingAddress.phone}`}
                                        className="underline"
                                      >
                                        {selectedOrder.shippingAddress.phone}
                                      </a>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() =>
                                          navigator.clipboard.writeText(
                                            selectedOrder.shippingAddress.phone,
                                          )
                                        }
                                      >
                                        <Copy className="h-4 w-4" />
                                      </Button>
                                    </p>
                                  </div>
                                </div>

                                {/* Shipping Address */}
                               <div>
                                  <h4 className="font-semibold mb-2">ที่อยู่จัดส่ง</h4>
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <p>{selectedOrder.shippingAddress.name}</p>
                                    <p>{selectedOrder.shippingAddress.address}</p>
                                    <p>
                                      {selectedOrder.shippingAddress.city} {selectedOrder.shippingAddress.postalCode}
                                    </p>
                                  </div>
                                  <div className="mt-2 text-sm space-y-1">
                                    <p>วิธีจัดส่ง: {selectedOrder.delivery_method || "-"}</p>
                                    <p>เลขติดตาม: {selectedOrder.tracking_number || "-"}</p>
                                    <p>ค่าจัดส่ง: ฿{selectedOrder.shipping_fee.toLocaleString()}</p>
                                    <p>สถานะ: {selectedOrder.shipping_status}</p>
                                    <p>
                                      วันที่จัดส่ง:{" "}
                                      {selectedOrder.shipping_date
                                        ? new Date(selectedOrder.shipping_date).toLocaleDateString("th-TH")
                                        : "-"}
                                    </p>
                                    <p>หมายเหตุ: {selectedOrder.delivery_note || "-"}</p>
                                  </div>
                                </div>

                                {/* Order Items */}
                                <div>
                                  <h4 className="font-semibold mb-2">รายการสินค้า</h4>
                                  <div className="space-y-2">
                                    {selectedOrder.items.map((item, index) => (
                                      <div
                                        key={index}
                                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                                      >
                                        <div>
                                          <p className="font-medium">{item.productName}</p>
                                          <p className="text-sm text-gray-600">
                                            {item.size && `ขนาด: ${item.size}`}
                                            {item.color && ` | สี: ${item.color}`}
                                          </p>
                                        </div>
                                        <div className="text-right">
                                          <p>จำนวน: {item.quantity}</p>
                                          <p className="font-semibold">
                                            ฿{(item.price * item.quantity).toLocaleString()}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="border-t pt-2 mt-2">
                                    <div className="flex justify-between items-center font-semibold text-lg">
                                      <span>ยอดรวม:</span>
                                      <span>฿{selectedOrder.total.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Link href={`/admin/orders/edit/${order.id}`}>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/orders/${order.id}`}>
                          <Button variant="outline" size="icon">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            const copy: Order = {
                              ...order,
                              id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
                              createdAt: new Date().toISOString(),
                            }
                            setOrders((prev) => [...prev, copy])
                          }}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Link href={`/admin/invoice/${order.id}`}>
                          <Button variant="outline" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleCreateBill(order.id)}
                        >
                          เปิดบิล
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handlePrebookBill(order.id)}
                        >
                          จองล่วงหน้า
                        </Button>
                        {bills.find((b) => b.orderId === order.id) && (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              handleConfirmBill(
                                bills.find((b) => b.orderId === order.id)!.id,
                                order.id,
                              )
                            }
                          >
                            ยืนยันยอด
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">ไม่พบคำสั่งซื้อที่ตรงกับเงื่อนไขการค้นหา</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
