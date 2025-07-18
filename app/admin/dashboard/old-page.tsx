"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Badge } from "@/components/ui/badge"
import {
  BarChart3,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  AlertTriangle,
  Bell,
  Settings,
  FileText,
  MessageSquare,
  Warehouse,
  Receipt,
  Bug,
  ClipboardList,
} from "lucide-react"
import Link from "next/link"
import DashboardCard from "@/components/admin/dashboard/DashboardCard"
import { Skeleton } from "@/components/ui/skeleton"
import OrderTable from "@/components/admin/OrderTable"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import { mockOrders } from "@/lib/mock-orders"
import { fetchDashboardStats, type DashboardStats } from "@/lib/mock-dashboard"
import { mockCustomers, type Customer } from "@/lib/mock-customers"
import { mockProducts } from "@/lib/mock-products"
import {
  mockNotifications,
  addNotification,
} from "@/lib/mock-notifications"
import { getLowStockItems } from "@/lib/mock-stock"
import { mockBills, cleanupOldBills } from "@/lib/mock-bills"
import { loadAutoReminder, autoReminder } from "@/lib/mock-settings"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { toast } from "sonner"
import {
  shouldRemindAdmin,
  recordAdminActivity,
} from "@/lib/admin-reminder"

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [hideCancelled, setHideCancelled] = useState(false)
  const [salesSummary, setSalesSummary] = useState({ today: 0, week: 0, month: 0 })
  const [dailySales, setDailySales] = useState<Array<{ date: string; revenue: number }>>([])
  const [newCustomers, setNewCustomers] = useState<Customer[]>([])
  const [topProducts, setTopProducts] = useState<Array<{ id: string; name: string; count: number; image?: string }>>([])
  const lowStockItems = getLowStockItems()
  const [billStats, setBillStats] = useState({
    total: 0,
    paidPercent: 0,
    topCustomers: [] as Array<{ name: string; count: number }>,
    recent: [] as Array<{ id: string; customer: string; date: string }>,
  })

  useEffect(() => {
    fetchDashboardStats().then(setStats)
    loadAutoReminder()
    if (autoReminder) {
      const overdue = mockBills.find(
        (b) =>
          (b.status === "unpaid" || b.status === "pending") &&
          b.dueDate &&
          new Date(b.dueDate).getTime() < Date.now() - 3 * 24 * 60 * 60 * 1000,
      )
      if (overdue) toast.warning("มีบิลค้างชำระเกิน 3 วัน")
    }
    if (shouldRemindAdmin()) {
      toast.warning("ไม่มีการอัปเดตข้อมูลเกิน 5 วัน")
    }
    recordAdminActivity()
  }, [])

  useEffect(() => {
    const now = new Date()
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const startWeek = new Date(now)
    startWeek.setDate(now.getDate() - 6)
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    let today = 0
    let week = 0
    let month = 0
    const daily: Array<{ date: string; revenue: number }> = []

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now)
      d.setDate(now.getDate() - i)
      const revenue = mockOrders
        .filter((o) => new Date(o.createdAt).toDateString() === d.toDateString())
        .reduce((sum, o) => sum + o.total, 0)
      daily.push({
        date: d.toLocaleDateString("th-TH", { month: "short", day: "numeric" }),
        revenue,
      })
    }

    for (const o of mockOrders) {
      const d = new Date(o.createdAt)
      if (d >= startToday) today += o.total
      if (d >= startWeek) week += o.total
      if (d >= startMonth) month += o.total
    }

    const weekStart = new Date(now)
    weekStart.setDate(now.getDate() - 7)
    const newCust = mockCustomers
      .filter((c) => new Date(c.createdAt) >= weekStart)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    const freq: Record<string, number> = {}
    mockOrders.forEach((o) => {
      if (new Date(o.createdAt) >= weekStart) {
        o.items.forEach((i) => {
          freq[i.productId] = (freq[i.productId] || 0) + i.quantity
        })
      }
    })
    const top = Object.entries(freq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, count]) => {
        const p = mockProducts.find((pr) => pr.id === id)
        return { id, name: p?.name || id, count, image: p?.images[0] }
      })

    setSalesSummary({ today, week, month })
    setDailySales(daily)
    setNewCustomers(newCust)
    setTopProducts(top)
  }, [])

  useEffect(() => {
    const now = new Date()
    const startMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const billsThisMonth = mockBills.filter(
      (b) => new Date(b.createdAt) >= startMonth,
    )
    const total = billsThisMonth.length
    const paid = billsThisMonth.filter((b) => b.status === 'paid').length
    const paidPercent = total ? (paid / total) * 100 : 0

    const counts: Record<string, number> = {}
    billsThisMonth.forEach((b) => {
      const order = mockOrders.find((o) => o.id === b.orderId)
      const cust = order && mockCustomers.find((c) => c.id === order.customerId)
      const name = cust?.name || order?.customerName || 'Unknown'
      counts[name] = (counts[name] || 0) + 1
    })
    const topCustomers = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 3)

    const recent = [...billsThisMonth]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      .slice(0, 5)
      .map((b) => {
        const order = mockOrders.find((o) => o.id === b.orderId)
        const cust =
          order && mockCustomers.find((c) => c.id === order.customerId)
        return {
          id: b.id,
          customer: cust?.name || order?.customerName || 'Unknown',
          date: new Date(b.createdAt).toLocaleDateString('th-TH'),
        }
      })

    setBillStats({ total, paidPercent, topCustomers, recent })
  }, [])

  useEffect(() => {
    let timestamps: number[] = []
    const interval = setInterval(() => {
      const now = Date.now()
      timestamps = timestamps.filter((t) => now - t < 5 * 60 * 1000)
      timestamps.push(now)
      if (timestamps.length > 5) {
        toast.warning('มีออเดอร์ใหม่จำนวนมากผิดปกติ')
      }
    }, 30000)
    return () => clearInterval(interval)
  }, [])


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">แดชบอร์ดผู้ดูแลระบบ</h1>
          <p className="text-gray-600">ภาพรวมการดำเนินงานของร้าน Sofa Cover Store</p>
          <Button
            className="mt-4"
            onClick={() =>
              addNotification({
                id: Date.now().toString(),
                type: 'order',
                message: 'มีออเดอร์ใหม่รอการตรวจสอบ',
                link: '/admin/orders',
              })
            }
          >
            ทดสอบการแจ้งเตือน
          </Button>
        </div>

        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => {
              cleanupOldBills(14)
              toast.success('ล้างข้อมูล mock แล้ว')
            }}
          >
            ล้าง mock ที่เก่าเกิน 14 วัน
          </Button>
          <Button variant="outline" onClick={() => setHideCancelled((v) => !v)}>
            {hideCancelled ? 'แสดงบิลยกเลิก' : 'ซ่อนบิลยกเลิก'}
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {!stats ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))
          ) : (
            <>
          <DashboardCard
            title="ออเดอร์ทั้งหมด"
            value={stats.totalOrders}
            icon={ShoppingCart}
            iconClassName="text-blue-600"
            href="/admin/orders"
          />
          <DashboardCard
            title="สินค้าทั้งหมด"
            value={stats.totalProducts}
            icon={Package}
            iconClassName="text-green-600"
            href="/admin/products"
          />
          <DashboardCard
            title="ลูกค้าทั้งหมด"
            value={stats.totalCustomers}
            icon={Users}
            iconClassName="text-purple-600"
            href="/admin/customers"
          />
          <DashboardCard
            title="ยอดขายรวม"
            value={`฿${stats.totalRevenue.toLocaleString()}`}
            icon={TrendingUp}
            iconClassName="text-orange-600"
            href="/admin/reports"
          />
            </>
          )}
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>ภาพรวมบิลเดือนนี้</CardTitle>
          </CardHeader>
          <CardContent>
            {billStats.total === 0 ? (
              <div className="text-center text-muted text-sm">ไม่มีข้อมูลบิลในเดือนนี้</div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">บิลทั้งหมด</p>
                    <p className="text-2xl font-bold">{billStats.total}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">บิลที่ชำระแล้ว: {billStats.paidPercent.toFixed(0)}%</p>
                    <Progress value={billStats.paidPercent} className="h-2 mt-2" />
                  </div>
                </div>
                <div className="mb-4">
                  <p className="font-medium mb-2 text-sm">ลูกค้าซื้อบ่อย</p>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    {billStats.topCustomers.map((c) => (
                      <li key={c.name}>{c.name} – {c.count} บิล</li>
                    ))}
                  </ul>
                </div>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>เลขบิล</TableHead>
                        <TableHead>ลูกค้า</TableHead>
                        <TableHead>วันที่</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {billStats.recent.map((b) => (
                        <TableRow key={b.id}>
                          <TableCell>{b.id}</TableCell>
                          <TableCell>{b.customer}</TableCell>
                          <TableCell>{b.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Alert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardCard
            cardClassName="border-yellow-200 bg-yellow-50"
            title="สต็อกต่ำ"
            value={stats?.lowStockItems ?? 0}
            titleClassName="text-yellow-800"
            valueClassName="text-yellow-900"
            icon={AlertTriangle}
            iconClassName="text-yellow-600"
          />
          <DashboardCard
            cardClassName="border-blue-200 bg-blue-50"
            title="ออเดอร์รอชำระเงิน"
            value={stats?.pendingOrders ?? 0}
            titleClassName="text-blue-800"
            valueClassName="text-blue-900"
            icon={Receipt}
            iconClassName="text-blue-600"
          />
        <DashboardCard
            cardClassName="border-green-200 bg-green-50"
            title="การแจ้งเตือนใหม่"
            value={stats?.newNotifications ?? 0}
            titleClassName="text-green-800"
            valueClassName="text-green-900"
            icon={Bell}
            iconClassName="text-green-600"
          />
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>ยอดขายสัปดาห์นี้</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 text-center mb-4">
              <div>
                <p className="text-sm text-gray-600">วันนี้</p>
                <p className="text-xl font-bold">
                  ฿{salesSummary.today.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">7 วัน</p>
                <p className="text-xl font-bold">
                  ฿{salesSummary.week.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">เดือนนี้</p>
                <p className="text-xl font-bold">
                  ฿{salesSummary.month.toLocaleString()}
                </p>
              </div>
            </div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailySales}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#8884d8" name="ยอดขาย" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>ลูกค้าใหม่ในสัปดาห์นี้</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">รวม {newCustomers.length} คน</p>
            <ul className="list-disc pl-5 space-y-1">
              {newCustomers.slice(0, 3).map((c) => (
                <li key={c.id}>{c.name}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>สินค้าขายดีสัปดาห์นี้</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {topProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between gap-2"
                >
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-8 w-8 rounded"
                    />
                  )}
                  <span className="flex-1 truncate">{p.name}</span>
                  <span className="text-sm text-gray-600">{p.count} ชิ้น</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>สินค้าคงเหลือน้อย</CardTitle>
          </CardHeader>
          <CardContent>
            {lowStockItems.length === 0 ? (
              <p>สต็อกเพียงพอ</p>
            ) : (
              <div className="space-y-2">
                {lowStockItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <span>{item.name}</span>
                    <Button variant="outline" size="sm">Refill</Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader className="flex items-center justify-between">
            <CardTitle>แจ้งเตือนล่าสุด</CardTitle>
            <Link href="/admin/notifications">
              <Button variant="outline" size="sm">ดูทั้งหมด</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {mockNotifications.slice(0, 5).map((n) => (
                <Link key={n.id} href={n.link} className="block hover:underline">
                  {n.message}
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>รายการคำสั่งซื้อล่าสุด</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderTable orders={mockOrders.slice(0, 5)} />
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>ออเดอร์ที่ยังไม่จัดส่ง</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderTable
              orders={mockOrders.filter((o) => o.shipping_status !== "delivered").slice(0, 5)}
            />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                จัดการออเดอร์
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/orders">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="mr-2 h-4 w-4" />
                  ดูออเดอร์ทั้งหมด
                </Button>
              </Link>
              <Link href="/admin/orders/manual">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Receipt className="mr-2 h-4 w-4" />
                  สร้างออเดอร์ใหม่
                </Button>
              </Link>
              <Link href="/admin/reports">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  รายงานการขาย
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2 h-5 w-5" />
                จัดการสินค้า
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/products">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Package className="mr-2 h-4 w-4" />
                  จัดการสินค้า
                </Button>
              </Link>
              <Link href="/admin/inventory">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Warehouse className="mr-2 h-4 w-4" />
                  จัดการสต็อก
                  {stats?.lowStockItems && stats.lowStockItems > 0 && (
                    <Badge variant="destructive" className="ml-2">
                      {stats.lowStockItems}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  วิเคราะห์สินค้า
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                ระบบและการตั้งค่า
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/customers">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Users className="mr-2 h-4 w-4" />
                  จัดการลูกค้า
                </Button>
              </Link>
              <Link href="/admin/notifications">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Bell className="mr-2 h-4 w-4" />
                  ระบบแจ้งเตือน
                  {stats?.newNotifications && stats.newNotifications > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {stats.newNotifications}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link href="/admin/chat">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  แชทกับลูกค้า
                </Button>
              </Link>
          <Link href="/admin/dev">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Bug className="mr-2 h-4 w-4" />
              ข้อมูลระบบ
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ClipboardList className="mr-2 h-5 w-5" />
            งานทีม
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Link href="/team/production">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <ClipboardList className="mr-2 h-4 w-4" />
              งานฝ่ายผลิต
            </Button>
          </Link>
          <Link href="/team/shipping">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <ClipboardList className="mr-2 h-4 w-4" />
              งานฝ่ายจัดส่ง
            </Button>
          </Link>
          <Link href="/team/support">
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <ClipboardList className="mr-2 h-4 w-4" />
              งานฝ่ายบริการลูกค้า
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>

        {/* Mock-up Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">ระบบแจ้งเตือน Mock-up</h3>
          </div>
          <p className="text-blue-800 mt-2">
            ระบบแจ้งเตือนปัจจุบันเป็นแบบจำลอง สามารถทดสอบการทำงานได้ในหน้าจัดการสต็อกและระบบแจ้งเตือน
          </p>
        </div>
      </div>
    </div>
  )
}
