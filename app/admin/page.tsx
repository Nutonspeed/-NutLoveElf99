"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
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
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalOrders: 156,
    totalProducts: 45,
    totalCustomers: 89,
    totalRevenue: 125000,
    lowStockItems: 8,
    pendingOrders: 12,
    newNotifications: 5,
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    if (user?.role !== "admin") {
      router.push("/")
      return
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่มีสิทธิ์เข้าถึง</h1>
          <Link href="/login">
            <Button>เข้าสู่ระบบ</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">แดชบอร์ดผู้ดูแลระบบ</h1>
          <p className="text-gray-600">ภาพรวมการดำเนินงานของร้าน Sofa Cover Store</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ออเดอร์ทั้งหมด</p>
                  <p className="text-2xl font-bold">{stats.totalOrders}</p>
                </div>
                <ShoppingCart className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">สินค้าทั้งหมด</p>
                  <p className="text-2xl font-bold">{stats.totalProducts}</p>
                </div>
                <Package className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ลูกค้าทั้งหมด</p>
                  <p className="text-2xl font-bold">{stats.totalCustomers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ยอดขายรวม</p>
                  <p className="text-2xl font-bold">฿{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alert Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-yellow-200 bg-yellow-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-yellow-800">สต็อกต่ำ</p>
                  <p className="text-2xl font-bold text-yellow-900">{stats.lowStockItems}</p>
                  <p className="text-sm text-yellow-700">รายการที่ต้องเติมสต็อก</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-800">ออเดอร์รอดำเนินการ</p>
                  <p className="text-2xl font-bold text-blue-900">{stats.pendingOrders}</p>
                  <p className="text-sm text-blue-700">ออเดอร์ที่รอการจัดส่ง</p>
                </div>
                <Receipt className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-800">การแจ้งเตือนใหม่</p>
                  <p className="text-2xl font-bold text-green-900">{stats.newNotifications}</p>
                  <p className="text-sm text-green-700">การแจ้งเตือนที่ยังไม่ได้อ่าน</p>
                </div>
                <Bell className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

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
                  {stats.lowStockItems > 0 && (
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
                  {stats.newNotifications > 0 && (
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
