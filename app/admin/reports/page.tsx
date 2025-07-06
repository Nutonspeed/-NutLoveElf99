"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Download,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Calendar,
  FileText,
  BarChart3,
  PieChartIcon as RechartsPieChart,
  PhoneIcon as Cell,
  Target,
  Award,
  XIcon as XAxis,
  Axis3dIcon as YAxis,
  Clock,
  Activity,
} from "lucide-react"
import Link from "next/link"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Pie,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface ReportData {
  salesOverTime: Array<{
    date: string
    revenue: number
    orders: number
  }>
  topProducts: Array<{
    id: string
    name: string
    sales: number
    revenue: number
    growth: number
  }>
  customerSegments: Array<{
    segment: string
    count: number
    revenue: number
    percentage: number
  }>
  monthlyComparison: Array<{
    month: string
    thisYear: number
    lastYear: number
  }>
  categoryPerformance: Array<{
    category: string
    revenue: number
    orders: number
    avgOrderValue: number
  }>
  hourlyActivity: Array<{
    hour: string
    orders: number
  }>
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export default function AdminReportsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [reportData, setReportData] = useState<ReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState("last30days")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    if (user?.role !== "admin") {
      router.push("/")
      return
    }
    loadReportData()
  }, [isAuthenticated, user, router, dateRange, startDate, endDate])

  const loadReportData = async () => {
    try {
      setLoading(true)
      const data = await generateReportData(dateRange, startDate, endDate)
      setReportData(data)
    } catch (error) {
      console.error("Error loading report data:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateReportData = async (range: string, start?: string, end?: string): Promise<ReportData> => {
    // Mock data generation - replace with actual API calls
    const salesOverTime = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString("th-TH", {
        month: "short",
        day: "numeric",
      }),
      revenue: Math.floor(Math.random() * 50000) + 10000,
      orders: Math.floor(Math.random() * 20) + 5,
    }))

    const topProducts = [
      { id: "1", name: "ผ้าคลุมโซฟา Premium Velvet", sales: 145, revenue: 433550, growth: 15.2 },
      { id: "2", name: "ผ้าคลุมโซฟา Waterproof Pro", sales: 98, revenue: 342020, growth: 8.7 },
      { id: "3", name: "ผ้าคลุมโซฟา Cotton Blend", sales: 87, revenue: 173130, growth: -2.1 },
      { id: "4", name: "ผ้าคลุมโซฟา Luxury Leather", sales: 56, revenue: 279440, growth: 22.3 },
      { id: "5", name: "ผ้าคลุมโซฟา Eco-Friendly", sales: 43, revenue: 128570, growth: 5.8 },
    ]

    const customerSegments = [
      { segment: "ลูกค้าใหม่", count: 234, revenue: 567890, percentage: 35 },
      { segment: "ลูกค้าประจำ", count: 156, revenue: 890123, percentage: 45 },
      { segment: "ลูกค้า VIP", count: 45, revenue: 456789, percentage: 20 },
    ]

    const monthlyComparison = [
      { month: "ม.ค.", thisYear: 125000, lastYear: 98000 },
      { month: "ก.พ.", thisYear: 145000, lastYear: 112000 },
      { month: "มี.ค.", thisYear: 167000, lastYear: 134000 },
      { month: "เม.ย.", thisYear: 189000, lastYear: 145000 },
      { month: "พ.ค.", thisYear: 201000, lastYear: 167000 },
      { month: "มิ.ย.", thisYear: 234000, lastYear: 189000 },
    ]

    const categoryPerformance = [
      { category: "Premium", revenue: 567890, orders: 123, avgOrderValue: 4617 },
      { category: "Standard", revenue: 345678, orders: 234, avgOrderValue: 1477 },
      { category: "Luxury", revenue: 789012, orders: 89, avgOrderValue: 8865 },
      { category: "Eco-Friendly", revenue: 234567, orders: 156, avgOrderValue: 1504 },
    ]

    const hourlyActivity = Array.from({ length: 24 }, (_, i) => ({
      hour: `${i.toString().padStart(2, "0")}:00`,
      orders: Math.floor(Math.random() * 15) + 1,
    }))

    return {
      salesOverTime,
      topProducts,
      customerSegments,
      monthlyComparison,
      categoryPerformance,
      hourlyActivity,
    }
  }

  const exportReport = (format: "csv" | "pdf") => {
    if (format === "csv") {
      exportToCSV()
    } else {
      exportToPDF()
    }
  }

  const exportToCSV = () => {
    if (!reportData) return

    const csvData = [
      ["รายงานยอดขาย"],
      ["วันที่", "รายได้", "จำนวนออเดอร์"],
      ...reportData.salesOverTime.map((item) => [item.date, item.revenue, item.orders]),
      [],
      ["สินค้าขายดี"],
      ["ชื่อสินค้า", "ยอดขาย", "รายได้", "การเติบโต (%)"],
      ...reportData.topProducts.map((item) => [item.name, item.sales, item.revenue, item.growth]),
    ]

    const csvContent = csvData.map((row) => row.join(",")).join("\n")
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `sales-report-${new Date().toISOString().split("T")[0]}.csv`
    link.click()
  }

  const exportToPDF = () => {
    // Mock PDF export - in real app, use libraries like jsPDF or react-pdf
    alert("ฟีเจอร์ส่งออก PDF กำลังพัฒนา")
  }

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

  if (loading || !reportData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>กำลังโหลดข้อมูลรายงาน...</p>
        </div>
      </div>
    )
  }

  const totalRevenue = reportData.salesOverTime.reduce((sum, item) => sum + item.revenue, 0)
  const totalOrders = reportData.salesOverTime.reduce((sum, item) => sum + item.orders, 0)
  const avgOrderValue = totalRevenue / totalOrders
  const bestSellingProduct = reportData.topProducts[0]

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
              <h1 className="text-3xl font-bold">รายงานยอดขายและสถิติ</h1>
              <p className="text-gray-600">วิเคราะห์ข้อมูลการขายและประสิทธิภาพธุรกิจ</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">วันนี้</SelectItem>
                <SelectItem value="yesterday">เมื่อวาน</SelectItem>
                <SelectItem value="last7days">7 วันที่แล้ว</SelectItem>
                <SelectItem value="last30days">30 วันที่แล้ว</SelectItem>
                <SelectItem value="thisMonth">เดือนนี้</SelectItem>
                <SelectItem value="lastMonth">เดือนที่แล้ว</SelectItem>
                <SelectItem value="thisYear">ปีนี้</SelectItem>
                <SelectItem value="custom">กำหนดเอง</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => exportReport("csv")} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              ส่งออก CSV
            </Button>
            <Button onClick={() => exportReport("pdf")} variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              ส่งออก PDF
            </Button>
          </div>
        </div>

        {/* Custom Date Range */}
        {dateRange === "custom" && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <div>
                  <Label htmlFor="startDate">วันที่เริ่มต้น</Label>
                  <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="endDate">วันที่สิ้นสุด</Label>
                  <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <Button onClick={loadReportData} className="mt-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  อัปเดตรายงาน
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">รายได้รวม</p>
                  <p className="text-2xl font-bold">฿{totalRevenue.toLocaleString()}</p>
                  <div className="flex items-center space-x-1 text-sm text-green-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>+12.5%</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">จำนวนออเดอร์</p>
                  <p className="text-2xl font-bold">{totalOrders}</p>
                  <div className="flex items-center space-x-1 text-sm text-blue-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>+8.2%</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                  <ShoppingCart className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">มูลค่าเฉลี่ยต่อออเดอร์</p>
                  <p className="text-2xl font-bold">฿{Math.round(avgOrderValue).toLocaleString()}</p>
                  <div className="flex items-center space-x-1 text-sm text-purple-600">
                    <TrendingUp className="h-4 w-4" />
                    <span>+5.1%</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                  <Target className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">สินค้าขายดี</p>
                  <p className="text-lg font-bold truncate">{bestSellingProduct.name}</p>
                  <div className="flex items-center space-x-1 text-sm text-orange-600">
                    <Award className="h-4 w-4" />
                    <span>{bestSellingProduct.sales} ชิ้น</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                  <Package className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">ภาพรวม</TabsTrigger>
            <TabsTrigger value="sales">ยอดขาย</TabsTrigger>
            <TabsTrigger value="products">สินค้า</TabsTrigger>
            <TabsTrigger value="customers">ลูกค้า</TabsTrigger>
            <TabsTrigger value="trends">แนวโน้ม</TabsTrigger>
            <TabsTrigger value="performance">ประสิทธิภาพ</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Sales Over Time Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>แนวโน้มยอดขายรายวัน</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={reportData.salesOverTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip
                        formatter={(value, name) => [
                          name === "revenue" ? `฿${Number(value).toLocaleString()}` : value,
                          name === "revenue" ? "รายได้" : "จำนวนออเดอร์",
                        ]}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stackId="1"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                        name="รายได้"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Products */}
              <Card>
                <CardHeader>
                  <CardTitle>สินค้าขายดี Top 5</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportData.topProducts.map((product, index) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium truncate max-w-48">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.sales} ชิ้น</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">฿{product.revenue.toLocaleString()}</p>
                          <Badge variant={product.growth > 0 ? "default" : "destructive"} className="text-xs">
                            {product.growth > 0 ? "+" : ""}
                            {product.growth}%
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Segments */}
              <Card>
                <CardHeader>
                  <CardTitle>กลุ่มลูกค้า</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={reportData.customerSegments}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                          label={({ segment, percentage }) => `${segment} (${percentage}%)`}
                        >
                          {reportData.customerSegments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} คน`, "จำนวน"]} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            {/* Monthly Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>เปรียบเทียบยอดขายรายเดือน</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reportData.monthlyComparison}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`฿${Number(value).toLocaleString()}`, "รายได้"]} />
                      <Legend />
                      <Bar dataKey="thisYear" fill="#8884d8" name="ปีนี้" />
                      <Bar dataKey="lastYear" fill="#82ca9d" name="ปีที่แล้ว" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Sales by Category */}
            <Card>
              <CardHeader>
                <CardTitle>ยอดขายตามหมวดหมู่</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.categoryPerformance.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{category.category}</p>
                        <p className="text-sm text-gray-600">{category.orders} ออเดอร์</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">฿{category.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">เฉลี่ย ฿{category.avgOrderValue.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            {/* Product Performance Chart */}
            <Card>
              <CardHeader>
                <CardTitle>ประสิทธิภาพสินค้าตามหมวดหมู่</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={reportData.categoryPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="revenue" fill="#8884d8" name="รายได้" />
                      <Bar dataKey="orders" fill="#82ca9d" name="จำนวนออเดอร์" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            {/* Customer Revenue Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>การกระจายรายได้ตามกลุ่มลูกค้า</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={reportData.customerSegments}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="revenue"
                          label={({ segment, percentage }) => `${segment} (${percentage}%)`}
                        >
                          {reportData.customerSegments.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`฿${Number(value).toLocaleString()}`, "รายได้"]} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>สถิติลูกค้า</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportData.customerSegments.map((segment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{segment.segment}</p>
                          <p className="text-sm text-gray-600">{segment.count} คน</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">฿{segment.revenue.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">
                            เฉลี่ย ฿{Math.round(segment.revenue / segment.count).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            {/* Hourly Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>กิจกรรมการสั่งซื้อตามช่วงเวลา</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={reportData.hourlyActivity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="orders" stroke="#8884d8" strokeWidth={2} name="จำนวนออเดอร์" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Growth Trends */}
            <Card>
              <CardHeader>
                <CardTitle>แนวโน้มการเติบโตของสินค้า</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.topProducts.map((product, index) => (
                    <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium truncate max-w-64">{product.name}</p>
                        <p className="text-sm text-gray-600">ขายได้ {product.sales} ชิ้น</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold">฿{product.revenue.toLocaleString()}</p>
                        </div>
                        <Badge
                          variant={product.growth > 0 ? "default" : product.growth < 0 ? "destructive" : "secondary"}
                          className="flex items-center space-x-1"
                        >
                          {product.growth > 0 ? (
                            <TrendingUp className="h-3 w-3" />
                          ) : product.growth < 0 ? (
                            <TrendingDown className="h-3 w-3" />
                          ) : (
                            <Activity className="h-3 w-3" />
                          )}
                          <span>
                            {product.growth > 0 ? "+" : ""}
                            {product.growth}%
                          </span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-green-600" />
                    </div>
                    <p className="text-sm text-gray-600">อัตราการแปลง</p>
                    <p className="text-3xl font-bold text-green-600">3.2%</p>
                    <p className="text-sm text-gray-500">เพิ่มขึ้น 0.5% จากเดือนที่แล้ว</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <p className="text-sm text-gray-600">อัตราลูกค้าใหม่</p>
                    <p className="text-3xl font-bold text-blue-600">24%</p>
                    <p className="text-sm text-gray-500">เพิ่มขึ้น 3% จากเดือนที่แล้ว</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                      <Award className="h-8 w-8 text-purple-600" />
                    </div>
                    <p className="text-sm text-gray-600">อัตราลูกค้าซื้อซ้ำ</p>
                    <p className="text-3xl font-bold text-purple-600">68%</p>
                    <p className="text-sm text-gray-500">เพิ่มขึ้น 5% จากเดือนที่แล้ว</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>สรุปประสิทธิภาพ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-green-600">จุดแข็ง</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>ยอดขายเติบโตต่อเนื่อง 12.5%</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>สินค้า Premium มีอัตราการเติบโตสูง</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>ลูกค้า VIP มีมูลค่าการซื้อสูง</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3 text-orange-600">จุดที่ควรปรับปรุง</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span>สินค้า Cotton Blend มีการเติบโตลดลง</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span>ช่วงเวลา 02:00-06:00 มีออเดอร์น้อย</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                        <span>ควรเพิ่มกิจกรรมสำหรับลูกค้าใหม่</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
