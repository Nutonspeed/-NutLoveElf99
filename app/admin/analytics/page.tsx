"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"
import Link from "next/link"
import { fetchAnalytics, type AnalyticsData } from "@/lib/mock-dashboard"


export default function AdminAnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [timeRange, setTimeRange] = useState("thisMonth")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAnalytics()
  }, [])

  const loadAnalytics = async () => {
    try {
      const data = await fetchAnalytics()
      setAnalytics(data)
    } catch (error) {
      console.error("Error loading analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>กำลังโหลดข้อมูลสถิติ...</p>
        </div>
      </div>
    )
  }

  const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }: any) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {trend && (
              <div
                className={`flex items-center space-x-1 text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}
              >
                {trend === "up" ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                <span>{trendValue}%</span>
              </div>
            )}
          </div>
          <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )

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
              <h1 className="text-3xl font-bold">รายงานและสถิติ</h1>
              <p className="text-gray-600">ภาพรวมการดำเนินงานและการวิเคราะห์ข้อมูล</p>
            </div>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="thisMonth">เดือนนี้</SelectItem>
              <SelectItem value="lastMonth">เดือนที่แล้ว</SelectItem>
              <SelectItem value="thisYear">ปีนี้</SelectItem>
              <SelectItem value="lastYear">ปีที่แล้ว</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
            <TabsTrigger value="sales">ยอดขาย</TabsTrigger>
            <TabsTrigger value="products">สินค้า</TabsTrigger>
            <TabsTrigger value="customers">ลูกค้า</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="รายได้รวม"
                value={`฿${analytics.revenue.total.toLocaleString()}`}
                icon={DollarSign}
                trend="up"
                trendValue={analytics.revenue.growth}
                color="bg-green-500"
              />
              <StatCard
                title="คำสั่งซื้อ"
                value={analytics.orders.total.toString()}
                icon={ShoppingCart}
                trend="up"
                trendValue="15"
                color="bg-blue-500"
              />
              <StatCard
                title="ลูกค้า"
                value={analytics.users.customers.toString()}
                icon={Users}
                trend="up"
                trendValue="8"
                color="bg-purple-500"
              />
              <StatCard title="สินค้า" value={analytics.products.total.toString()} icon={Package} color="bg-orange-500" />
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>สถิติคำสั่งซื้อ</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">รอชำระเงิน</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-orange-500 rounded-full"
                            style={{ width: `${(analytics.orders.pending / analytics.orders.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{analytics.orders.pending}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">ชำระแล้ว</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-green-500 rounded-full"
                            style={{ width: `${(analytics.orders.completed / analytics.orders.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{analytics.orders.completed}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="h-5 w-5" />
                    <span>สถิติสินค้า</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">มีสินค้า</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-green-500 rounded-full"
                            style={{ width: `${(analytics.products.inStock / analytics.products.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{analytics.products.inStock}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">หมดสต็อก</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-red-500 rounded-full"
                            style={{ width: `${(analytics.products.outOfStock / analytics.products.total) * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium">{analytics.products.outOfStock}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">รายได้เดือนนี้</p>
                    <p className="text-3xl font-bold text-green-600">฿{analytics.revenue.thisMonth.toLocaleString()}</p>
                    <div className="flex items-center justify-center space-x-1 text-sm text-green-600 mt-2">
                      <TrendingUp className="h-4 w-4" />
                      <span>+{analytics.revenue.growth}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">รายได้เดือนที่แล้ว</p>
                    <p className="text-3xl font-bold text-blue-600">฿{analytics.revenue.lastMonth.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">รายได้รวมทั้งหมด</p>
                    <p className="text-3xl font-bold text-purple-600">฿{analytics.revenue.total.toLocaleString()}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>กราฟยอดขาย</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>กราฟยอดขายจะแสดงที่นี่</p>
                    <p className="text-sm">กำลังพัฒนาระบบแสดงกราฟ</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">สินค้าทั้งหมด</p>
                    <p className="text-3xl font-bold text-blue-600">{analytics.products.total}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">มีสินค้า</p>
                    <p className="text-3xl font-bold text-green-600">{analytics.products.inStock}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">หมดสต็อก</p>
                    <p className="text-3xl font-bold text-red-600">{analytics.products.outOfStock}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>สินค้าขายดี</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "ผ้าคลุมโซฟา Premium Velvet", sales: 45, revenue: 134550 },
                    { name: "ผ้าคลุมโซฟา Waterproof Pro", sales: 32, revenue: 111680 },
                    { name: "ผ้าคลุมโซฟา Cotton Blend", sales: 28, revenue: 55720 },
                    { name: "ผ้าคลุมโซฟา Luxury Leather Look", sales: 15, revenue: 74850 },
                  ].map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">ขายได้ {product.sales} ชิ้น</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">฿{product.revenue.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">ลูกค้าทั้งหมด</p>
                    <p className="text-3xl font-bold text-blue-600">{analytics.users.customers}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">ลูกค้าใหม่เดือนนี้</p>
                    <p className="text-3xl font-bold text-green-600">{Math.floor(analytics.users.customers * 0.15)}</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">ลูกค้าที่ซื้อแล้ว</p>
                    <p className="text-3xl font-bold text-purple-600">{Math.floor(analytics.users.customers * 0.6)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>ลูกค้า VIP</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "John Doe", orders: 8, spent: 23920 },
                    { name: "Jane Smith", orders: 6, spent: 18450 },
                    { name: "Mike Johnson", orders: 5, spent: 15680 },
                    { name: "Sarah Wilson", orders: 4, spent: 12340 },
                  ].map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-gray-600">{customer.orders} คำสั่งซื้อ</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">฿{customer.spent.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
