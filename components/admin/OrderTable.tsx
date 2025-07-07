"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import OrderStatusDropdown from "./orders/OrderStatusDropdown"
import type { OrderStatus } from "@/types/order"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, FileText } from "lucide-react"
import Link from "next/link"
import type { Order } from "@/types/order"

interface OrderTableProps {
  orders: Order[]
}

export default function OrderTable({ orders }: OrderTableProps) {
  const [orderList, setOrderList] = useState<Order[]>(orders)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrderList((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)),
    )
  }


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>รหัสคำสั่งซื้อ</TableHead>
          <TableHead>ลูกค้า</TableHead>
          <TableHead>วันที่สั่งซื้อ</TableHead>
          <TableHead>ยอดรวม</TableHead>
          <TableHead>สถานะ</TableHead>
          <TableHead>สถานะจัดส่ง</TableHead>
          <TableHead className="text-right">การจัดการ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderList.map((order) => (
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
            <TableCell>
              {new Date(order.createdAt).toLocaleDateString("th-TH")}
            </TableCell>
            <TableCell>
              <p className="font-semibold">฿{order.total.toLocaleString()}</p>
            </TableCell>
            <TableCell>
              <OrderStatusDropdown
                status={order.status}
                onChange={(value) => updateOrderStatus(order.id, value)}
              />
            </TableCell>
            <TableCell>{order.shipping_status}</TableCell>
            <TableCell className="text-right">
              <div className="flex items-center justify-end space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>
                        รายละเอียดคำสั่งซื้อ {selectedOrder?.id}
                      </DialogTitle>
                    </DialogHeader>
                    {selectedOrder && (
                      <div className="space-y-6">
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
                              <strong>เบอร์โทร:</strong> {
                                selectedOrder.shippingAddress.phone
                              }
                            </p>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">ที่อยู่จัดส่ง</h4>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p>{selectedOrder.shippingAddress.name}</p>
                            <p>{selectedOrder.shippingAddress.address}</p>
                            <p>
                              {selectedOrder.shippingAddress.city}{" "}
                              {selectedOrder.shippingAddress.postalCode}
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
                              <span>
                                ฿{selectedOrder.total.toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
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
  )
}
