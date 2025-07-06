"use client"

import { use } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Mail,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  fetchCustomerById,
  getCustomerOrders,
  getCustomerStats,
} from "@/lib/mock-customers"

export default function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const customer = use(fetchCustomerById(id))

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        ไม่พบข้อมูลลูกค้า
      </div>
    )
  }

  const orders = getCustomerOrders(customer.id)
  const stats = getCustomerStats(customer.id)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/customers">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ข้อมูลลูกค้า</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{customer.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span>{customer.email}</span>
            </div>
            {customer.phone && (
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{customer.phone}</span>
              </div>
            )}
          </CardContent>
        </Card>

        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList>
            <TabsTrigger value="orders">ประวัติการซื้อ</TabsTrigger>
            <TabsTrigger value="stats">สถิติ</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            {orders.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>คำสั่งซื้อ</TableHead>
                    <TableHead>วันที่</TableHead>
                    <TableHead>ยอดรวม</TableHead>
                    <TableHead>สถานะ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString("th-TH")}
                      </TableCell>
                      <TableCell>฿{order.total.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "paid"
                              ? "default"
                              : order.status === "depositPaid"
                                ? "secondary"
                                : order.status === "pendingPayment"
                                  ? "outline"
                                  : "destructive"
                          }
                        >
                          {order.status === "pendingPayment" && "รอชำระเงิน"}
                          {order.status === "depositPaid" && "มัดจำแล้ว"}
                          {order.status === "paid" && "ชำระแล้ว"}
                          {order.status === "cancelled" && "ยกเลิก"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                ยังไม่มีประวัติการซื้อ
              </div>
            )}
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {stats.totalOrders}
                    </p>
                    <p className="text-sm text-gray-600">คำสั่งซื้อทั้งหมด</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      ฿{stats.totalSpent.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-600">ยอดซื้อรวม</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
