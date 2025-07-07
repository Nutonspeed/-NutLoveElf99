"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, ArrowLeft, Eye, FileText, Edit, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"
import { mockOrders, type Order } from "@/lib/mock-orders"
import type { OrderStatus } from "@/types/order"

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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

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
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>รหัสคำสั่งซื้อ</TableHead>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>วันที่สั่งซื้อ</TableHead>
                  <TableHead>ยอดรวม</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <p className="font-medium">{order.id}</p>
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
                          <Badge variant={getStatusBadgeVariant(order.status)}>{getStatusText(order.status)}</Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {orderStatusOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
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
                                    <p>
                                      <strong>เบอร์โทร:</strong> {selectedOrder.shippingAddress.phone}
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
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

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
