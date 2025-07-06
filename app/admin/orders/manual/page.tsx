"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, ArrowLeft, Plus, Eye, Edit, Trash2, Copy, ExternalLink } from "lucide-react"
import Link from "next/link"
import type { ManualOrder } from "@/types/order"
import { orderDb } from "@/lib/order-database"
import { toast } from "sonner"

export default function ManualOrdersPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [orders, setOrders] = useState<ManualOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedOrder, setSelectedOrder] = useState<ManualOrder | null>(null)

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/login")
    }
  }, [isAuthenticated, user, router, isLoading])

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    try {
      const data = await orderDb.getManualOrders()
      setOrders(data)
    } catch (error) {
      console.error("Error loading orders:", error)
      toast.error("ไม่สามารถโหลดข้อมูลออเดอร์ได้")
    } finally {
      setLoading(false)
    }
  }

  if (isLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerPhone.includes(searchTerm)

    const matchesStatus = statusFilter === "all" || order.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const getStatusBadgeVariant = (status: ManualOrder["status"]) => {
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

  const getStatusText = (status: ManualOrder["status"]) => {
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

  const copyPublicLink = (publicLink: string) => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/order/${publicLink}`
        : ""
    if (url) {
      navigator.clipboard.writeText(url)
      toast.success("คัดลอกลิงก์แล้ว")
    }
  }

  const openPublicLink = (publicLink: string) => {
    const url =
      typeof window !== "undefined"
        ? `${window.location.origin}/order/${publicLink}`
        : ""
    if (url && typeof window !== "undefined") {
      window.open(url, "_blank")
    }
  }

  const deleteOrder = async (id: string) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบออเดอร์นี้?")) {
      try {
        await orderDb.deleteManualOrder(id)
        await loadOrders()
        toast.success("ลบออเดอร์แล้ว")
      } catch (error) {
        toast.error("ไม่สามารถลบออเดอร์ได้")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">จัดการออเดอร์แมนนวล</h1>
              <p className="text-gray-600">สร้างและจัดการออเดอร์แบบแมนนวล</p>
            </div>
          </div>
          <Link href="/admin/orders/manual/create">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              สร้างออเดอร์ใหม่
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle>รายการออเดอร์แมนนวล ({filteredOrders.length})</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหาออเดอร์..."
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
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="draft">ร่าง</SelectItem>
                    <SelectItem value="pending">รอยืนยัน</SelectItem>
                    <SelectItem value="confirmed">ยืนยันแล้ว</SelectItem>
                    <SelectItem value="processing">กำลังดำเนินการ</SelectItem>
                    <SelectItem value="shipped">จัดส่งแล้ว</SelectItem>
                    <SelectItem value="delivered">ส่งมอบแล้ว</SelectItem>
                    <SelectItem value="cancelled">ยกเลิก</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>เลขที่ออเดอร์</TableHead>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>วันที่สร้าง</TableHead>
                  <TableHead>ยอดรวม</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.orderNumber}</p>
                        <p className="text-sm text-gray-500">{order.items.length} รายการ</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{order.customerName}</p>
                        <p className="text-sm text-gray-500">{order.customerPhone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString("th-TH")}</TableCell>
                    <TableCell>
                      <p className="font-semibold">฿{order.total.toLocaleString()}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(order.status)}>{getStatusText(order.status)}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="icon" onClick={() => setSelectedOrder(order)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>รายละเอียดออเดอร์ {selectedOrder?.orderNumber}</DialogTitle>
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
                                      <strong>เบอร์โทร:</strong> {selectedOrder.customerPhone}
                                    </p>
                                    {selectedOrder.customerEmail && (
                                      <p>
                                        <strong>อีเมล:</strong> {selectedOrder.customerEmail}
                                      </p>
                                    )}
                                    {selectedOrder.customerAddress && (
                                      <p>
                                        <strong>ที่อยู่:</strong> {selectedOrder.customerAddress}
                                      </p>
                                    )}
                                  </div>
                                </div>

                                {/* Order Items */}
                                <div>
                                  <h4 className="font-semibold mb-2">รายการสินค้า</h4>
                                  <div className="space-y-2">
                                    {selectedOrder.items.map((item, index) => (
                                      <div
                                        key={item.id}
                                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                                      >
                                        <div className="flex items-center space-x-3">
                                          {item.image && (
                                            <img
                                              src={item.image || "/placeholder.svg"}
                                              alt={item.productName}
                                              className="w-12 h-12 object-cover rounded"
                                            />
                                          )}
                                          <div>
                                            <p className="font-medium">{item.productName}</p>
                                            <p className="text-sm text-gray-600">
                                              {item.size} | {item.pattern} | {item.color}
                                            </p>
                                            {item.notes && (
                                              <p className="text-sm text-gray-500">หมายเหตุ: {item.notes}</p>
                                            )}
                                          </div>
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
                                </div>

                                {/* Order Summary */}
                                <div>
                                  <h4 className="font-semibold mb-2">สรุปยอดรวม</h4>
                                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                    <div className="flex justify-between">
                                      <span>ยอดรวมสินค้า:</span>
                                      <span>฿{selectedOrder.subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>ส่วนลด:</span>
                                      <span>-฿{selectedOrder.discount.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>ค่าจัดส่ง:</span>
                                      <span>฿{selectedOrder.shippingCost.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                      <span>ภาษี/ค่าธรรมเนียม:</span>
                                      <span>฿{selectedOrder.tax.toLocaleString()}</span>
                                    </div>
                                    <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                                      <span>ยอดรวมทั้งสิ้น:</span>
                                      <span>฿{selectedOrder.total.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Notes */}
                                {selectedOrder.notes && (
                                  <div>
                                    <h4 className="font-semibold mb-2">หมายเหตุ</h4>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                      <p>{selectedOrder.notes}</p>
                                    </div>
                                  </div>
                                )}

                                {/* Attachments */}
                                {selectedOrder.attachments.length > 0 && (
                                  <div>
                                    <h4 className="font-semibold mb-2">ไฟล์แนบ</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                      {selectedOrder.attachments.map((attachment, index) => (
                                        <img
                                          key={index}
                                          src={attachment || "/placeholder.svg"}
                                          alt={`Attachment ${index + 1}`}
                                          className="w-full h-32 object-cover rounded-lg"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>

                        <Link href={`/admin/orders/manual/edit/${order.id}`}>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>

                        <Button variant="outline" size="icon" onClick={() => copyPublicLink(order.publicLink)}>
                          <Copy className="h-4 w-4" />
                        </Button>

                        <Button variant="outline" size="icon" onClick={() => openPublicLink(order.publicLink)}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => deleteOrder(order.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredOrders.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">ไม่พบออเดอร์ที่ตรงกับเงื่อนไขการค้นหา</p>
                <Link href="/admin/orders/manual/create">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    สร้างออเดอร์แรก
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
