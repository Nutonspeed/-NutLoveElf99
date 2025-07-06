"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ArrowLeft, Eye, Mail, Phone, ShoppingBag, Calendar } from "lucide-react"
import Link from "next/link"
import { fetchCustomers, getCustomerStats, type Customer, getCustomerOrders } from "@/lib/mock-customers"


export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const usersData = await fetchCustomers()

      const customersData = usersData.map((user) => {
        const stats = getCustomerStats(user.id)
        return {
          ...user,
          totalOrders: stats.totalOrders,
          totalSpent: stats.totalSpent,
          lastOrderDate: stats.lastOrderDate,
        }
      })

      setCustomers(customersData)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }


  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>กำลังโหลดข้อมูลลูกค้า...</p>
        </div>
      </div>
    )
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
              <h1 className="text-3xl font-bold">จัดการลูกค้า</h1>
              <p className="text-gray-600">ข้อมูลและประวัติการซื้อของลูกค้า</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ลูกค้าทั้งหมด</p>
                  <p className="text-2xl font-bold">{customers.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ลูกค้าใหม่เดือนนี้</p>
                  <p className="text-2xl font-bold">{Math.floor(customers.length * 0.2)}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ลูกค้าที่ซื้อแล้ว</p>
                  <p className="text-2xl font-bold">{customers.filter((c) => c.totalOrders > 0).length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ยอดขายเฉลี่ย</p>
                  <p className="text-2xl font-bold">
                    ฿
                    {customers.length > 0
                      ? Math.round(
                          customers.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length,
                        ).toLocaleString()
                      : 0}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <ShoppingBag className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>รายการลูกค้า ({filteredCustomers.length})</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ค้นหาลูกค้า..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>ติดต่อ</TableHead>
                  <TableHead>คำสั่งซื้อ</TableHead>
                  <TableHead>ยอดซื้อรวม</TableHead>
                  <TableHead>ซื้อล่าสุด</TableHead>
                  <TableHead className="text-right">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-sm font-medium">{customer.name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-gray-500">ID: {customer.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{customer.email}</span>
                        </div>
                        {customer.phone && (
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{customer.phone}</span>
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={customer.totalOrders > 0 ? "default" : "secondary"}>
                        {customer.totalOrders} คำสั่งซื้อ
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="font-semibold">฿{customer.totalSpent.toLocaleString()}</span>
                    </TableCell>
                    <TableCell>
                      {customer.lastOrderDate ? (
                        <span className="text-sm">{new Date(customer.lastOrderDate).toLocaleDateString("th-TH")}</span>
                      ) : (
                        <span className="text-sm text-gray-500">ยังไม่เคยซื้อ</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="icon" onClick={() => setSelectedCustomer(customer)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>ข้อมูลลูกค้า: {selectedCustomer?.name}</DialogTitle>
                          </DialogHeader>
                          {selectedCustomer && (
                            <Tabs defaultValue="info" className="w-full">
                              <TabsList className="grid w-full grid-cols-3">
                                <TabsTrigger value="info">ข้อมูลส่วนตัว</TabsTrigger>
                                <TabsTrigger value="orders">ประวัติการซื้อ</TabsTrigger>
                                <TabsTrigger value="stats">สstatistics</TabsTrigger>
                              </TabsList>

                              <TabsContent value="info" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">ชื่อ-นามสกุล</label>
                                    <p className="text-sm bg-gray-50 p-2 rounded">{selectedCustomer.name}</p>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">อีเมล</label>
                                    <p className="text-sm bg-gray-50 p-2 rounded">{selectedCustomer.email}</p>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">เบอร์โทร</label>
                                    <p className="text-sm bg-gray-50 p-2 rounded">
                                      {selectedCustomer.phone || "ไม่ระบุ"}
                                    </p>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">วันที่สมัคร</label>
                                    <p className="text-sm bg-gray-50 p-2 rounded">
                                      {new Date(selectedCustomer.createdAt).toLocaleDateString("th-TH")}
                                    </p>
                                  </div>
                                </div>
                                {selectedCustomer.address && (
                                  <div className="space-y-2">
                                    <label className="text-sm font-medium">ที่อยู่</label>
                                    <p className="text-sm bg-gray-50 p-2 rounded">
                                      {selectedCustomer.address}
                                      {selectedCustomer.city && `, ${selectedCustomer.city}`}
                                      {selectedCustomer.postalCode && ` ${selectedCustomer.postalCode}`}
                                    </p>
                                  </div>
                                )}
                              </TabsContent>

                              <TabsContent value="orders" className="space-y-4">
                                <div className="space-y-4">
                                  {getCustomerOrders(selectedCustomer.id).length > 0 ? (
                                    getCustomerOrders(selectedCustomer.id).map((order) => (
                                      <div key={order.id} className="border rounded-lg p-4">
                                        <div className="flex items-center justify-between mb-2">
                                          <div>
                                            <p className="font-medium">คำสั่งซื้อ {order.id}</p>
                                            <p className="text-sm text-gray-600">
                                              {new Date(order.createdAt).toLocaleDateString("th-TH")}
                                            </p>
                                          </div>
                                          <div className="text-right">
                                            <Badge
                                              variant={
                                                order.status === "delivered"
                                                  ? "default"
                                                  : order.status === "shipped"
                                                    ? "secondary"
                                                    : order.status === "processing"
                                                      ? "outline"
                                                      : "destructive"
                                              }
                                            >
                                              {order.status === "pending" && "รอดำเนินการ"}
                                              {order.status === "processing" && "กำลังดำเนินการ"}
                                              {order.status === "shipped" && "จัดส่งแล้ว"}
                                              {order.status === "delivered" && "ส่งมอบแล้ว"}
                                              {order.status === "cancelled" && "ยกเลิก"}
                                            </Badge>
                                            <p className="font-semibold mt-1">฿{order.total.toLocaleString()}</p>
                                          </div>
                                        </div>
                                        <div className="text-sm text-gray-600">{order.items.length} รายการ</div>
                                      </div>
                                    ))
                                  ) : (
                                    <div className="text-center py-8 text-gray-500">ยังไม่มีประวัติการซื้อ</div>
                                  )}
                                </div>
                              </TabsContent>

                              <TabsContent value="stats" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="text-center">
                                        <p className="text-2xl font-bold text-blue-600">
                                          {selectedCustomer.totalOrders}
                                        </p>
                                        <p className="text-sm text-gray-600">คำสั่งซื้อทั้งหมด</p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="text-center">
                                        <p className="text-2xl font-bold text-green-600">
                                          ฿{selectedCustomer.totalSpent.toLocaleString()}
                                        </p>
                                        <p className="text-sm text-gray-600">ยอดซื้อรวม</p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="text-center">
                                        <p className="text-2xl font-bold text-purple-600">
                                          ฿
                                          {selectedCustomer.totalOrders > 0
                                            ? Math.round(
                                                selectedCustomer.totalSpent / selectedCustomer.totalOrders,
                                              ).toLocaleString()
                                            : 0}
                                        </p>
                                        <p className="text-sm text-gray-600">ยอดซื้อเฉลี่ย</p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                  <Card>
                                    <CardContent className="p-4">
                                      <div className="text-center">
                                        <p className="text-2xl font-bold text-orange-600">
                                          {selectedCustomer.lastOrderDate
                                            ? Math.floor(
                                                (Date.now() - new Date(selectedCustomer.lastOrderDate).getTime()) /
                                                  (1000 * 60 * 60 * 24),
                                              )
                                            : "-"}
                                        </p>
                                        <p className="text-sm text-gray-600">วันที่ซื้อล่าสุด</p>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              </TabsContent>
                            </Tabs>
                          )}
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {filteredCustomers.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">ไม่พบลูกค้าที่ตรงกับเงื่อนไขการค้นหา</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
