"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import OrderTable from "@/components/admin/OrderTable"
import { mockOrders } from "@/lib/mock-orders"
import { fetchDashboardStats, type DashboardStats } from "@/lib/mock-dashboard"
import { addAdminNotification } from "@/lib/mock-admin-notifications"
import { mockBills, cleanupOldBills } from "@/lib/mock-bills"
import { loadAutoReminder, autoReminder } from "@/lib/mock-settings"
import { toast } from "sonner"

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [hideCancelled, setHideCancelled] = useState(false)

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
          <Button className="mt-4" onClick={() => addAdminNotification('มีออเดอร์ใหม่รอการตรวจสอบ')}>ทดสอบการแจ้งเตือน</Button>
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
          <DashboardCard
            title="ออเดอร์ทั้งหมด"
            value={stats?.totalOrders ?? 0}
            icon={ShoppingCart}
            iconClassName="text-blue-600"
            href="/admin/orders"
          />
          <DashboardCard
            title="สินค้าทั้งหมด"
            value={stats?.totalProducts ?? 0}
            icon={Package}
            iconClassName="text-green-600"
            href="/admin/products"
          />
          <DashboardCard
            title="ลูกค้าทั้งหมด"
            value={stats?.totalCustomers ?? 0}
            icon={Users}
            iconClassName="text-purple-600"
            href="/admin/customers"
          />
          <DashboardCard
            title="ยอดขายรวม"
            value={`฿${(stats?.totalRevenue ?? 0).toLocaleString()}`}
            icon={TrendingUp}
            iconClassName="text-orange-600"
            href="/admin/reports"
          />
        </div>

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
