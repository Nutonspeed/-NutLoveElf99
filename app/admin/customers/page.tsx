"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/inputs/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ArrowLeft, Eye, Mail, Phone, ShoppingBag, Calendar } from "lucide-react"
import Link from "next/link"
import {
  fetchCustomers,
  getCustomerStats,
  getCustomerOrders,
  addCustomer,
  type Customer,
} from "@/lib/mock-customers"
import {
  loadCustomerNotes,
  listCustomerNotes,
} from "@/lib/mock-customer-notes"
import { loadCustomerTags, listCustomerTags } from "@/lib/mock-customer-tags"
import { loadFlaggedUsers, getFlagStatus } from "@/lib/mock-flagged-users"
import { downloadCSV, downloadPDF } from "@/lib/mock-export"


export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [behaviorFilter, setBehaviorFilter] = useState("all")
  const [tagFilter, setTagFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [showAdd, setShowAdd] = useState(false)
  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")

  useEffect(() => {
    loadCustomerNotes()
    loadCustomerTags()
    loadFlaggedUsers()
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

      customersData.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )

      setCustomers(customersData)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newName || !newEmail) return
    addCustomer({ name: newName, email: newEmail })
    setNewName('')
    setNewEmail('')
    setShowAdd(false)
    loadData()
  }


  const filteredCustomers = customers.filter((customer) => {
    const matchSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone?.includes(searchTerm)

    const orders = getCustomerOrders(customer.id)
    const hasUnpaid = orders.some((o) => o.status === "pendingPayment")
    const isRepeat = orders.length > 1
    const isFrequent = orders.length >= 3

    const matchBehavior =
      behaviorFilter === "all" ||
      (behaviorFilter === "noRepeat" && !isRepeat) ||
      (behaviorFilter === "frequent" && isFrequent) ||
      (behaviorFilter === "unpaid" && hasUnpaid)
    const matchTag =
      tagFilter === 'all' ||
      listCustomerTags(customer.id).some((t) => t.tag === tagFilter)

    return matchSearch && matchBehavior && matchTag
  })


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
            <Link href="/admin/dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">จัดการลูกค้า</h1>
              <p className="text-gray-600">ข้อมูลและประวัติการซื้อของลูกค้า</p>
            </div>
          </div>
          {process.env.NODE_ENV !== 'production' && (
            <Button onClick={() => setShowAdd((v) => !v)}>เพิ่มลูกค้าใหม่</Button>
          )}
        </div>
        {showAdd && process.env.NODE_ENV !== 'production' && (
          <form onSubmit={handleAdd} className="flex space-x-2 mb-4">
            <Input placeholder="ชื่อ" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <Input placeholder="อีเมล" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            <Button type="submit">บันทึก</Button>
          </form>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
              <div className="flex space-x-2 items-center">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหาลูกค้า..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-64"
                  />
                </div>
                <select
                  className="border px-2 py-1 rounded"
                  value={behaviorFilter}
                  onChange={(e) => setBehaviorFilter(e.target.value)}
                >
                  <option value="all">ทั้งหมด</option>
                  <option value="noRepeat">ไม่เคยสั่งซ้ำ</option>
                  <option value="frequent">ซื้อบ่อย</option>
                  <option value="unpaid">ค้างจ่าย</option>
                </select>
                <select
                  className="border px-2 py-1 rounded"
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                >
                  <option value="all">แท็กทั้งหมด</option>
                  <option value="สายหวาน">สายหวาน</option>
                  <option value="ขาประจำ">ขาประจำ</option>
                  <option value="อารมณ์ร้อน">อารมณ์ร้อน</option>
                </select>
                <Button onClick={() => downloadCSV(customers, 'customers.csv')}>
                  Export CSV
                </Button>
                <Button onClick={() => downloadPDF('customers', 'customers.pdf')}>
                  Export PDF
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>ติดต่อ</TableHead>
                  <TableHead>แท็ก/โน้ต</TableHead>
                  <TableHead>ยอดสะสม</TableHead>
                  <TableHead>สั่งกี่ครั้ง</TableHead>
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
                      <div className="space-y-1">
                        {listCustomerTags(customer.id).map((t) => (
                          <Badge key={t.id} variant="secondary" className="mr-1">
                            {t.tag}
                          </Badge>
                        ))}
                        {listCustomerNotes(customer.id)[0] && (
                          <p className="text-xs text-gray-500">
                            {listCustomerNotes(customer.id)[0].note}
                          </p>
                        )}
                        {getFlagStatus(customer.id) && (
                          <Badge variant="destructive">ต้องตรวจสอบก่อนตอบ</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{customer.points ?? 0}</TableCell>
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
                      <Link href={`/admin/customers/${customer.id}`}>
                        <Button variant="outline" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
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
