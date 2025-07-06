"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Package, TrendingDown, TrendingUp, ArrowLeft, Plus, Edit, Bell, Settings } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useMockNotification } from "@/hooks/use-mock-notification"

interface StockItem {
  id: string
  name: string
  sku: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  location: string
  lastUpdated: string
  status: "normal" | "low" | "out" | "critical"
  price: number
}

const mockStockData: StockItem[] = [
  {
    id: "1",
    name: "ผ้าคลุมโซฟา 3 ที่นั่ง สีน้ำเงิน",
    sku: "SC-001",
    category: "ผ้าคลุมโซฟา",
    currentStock: 5,
    minStock: 10,
    maxStock: 50,
    location: "A-01",
    lastUpdated: "2024-01-15T10:30:00Z",
    status: "low",
    price: 1200,
  },
  {
    id: "2",
    name: "ผ้าคลุมโซฟา 2 ที่นั่ง สีเทา",
    sku: "SC-002",
    category: "ผ้าคลุมโซฟา",
    currentStock: 0,
    minStock: 8,
    maxStock: 40,
    location: "A-02",
    lastUpdated: "2024-01-14T15:45:00Z",
    status: "out",
    price: 950,
  },
  {
    id: "3",
    name: "ผ้าคลุมโซฟา L-Shape สีครีม",
    sku: "SC-003",
    category: "ผ้าคลุมโซฟา",
    currentStock: 15,
    minStock: 12,
    maxStock: 60,
    location: "B-01",
    lastUpdated: "2024-01-15T09:20:00Z",
    status: "normal",
    price: 1800,
  },
  {
    id: "4",
    name: "ผ้าคลุมโซฟา 1 ที่นั่ง สีแดง",
    sku: "SC-004",
    category: "ผ้าคลุมโซฟา",
    currentStock: 2,
    minStock: 15,
    maxStock: 45,
    location: "A-03",
    lastUpdated: "2024-01-13T14:10:00Z",
    status: "critical",
    price: 750,
  },
  {
    id: "5",
    name: "ผ้าคลุมโซฟา 3 ที่นั่ง สีเขียว",
    sku: "SC-005",
    category: "ผ้าคลุมโซฟา",
    currentStock: 25,
    minStock: 10,
    maxStock: 50,
    location: "B-02",
    lastUpdated: "2024-01-15T11:00:00Z",
    status: "normal",
    price: 1200,
  },
]

export default function InventoryPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { sendStockAlert, loading: notificationLoading } = useMockNotification()
  const [stockData, setStockData] = useState<StockItem[]>(mockStockData)
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null)
  const [adjustDialog, setAdjustDialog] = useState(false)
  const [adjustAmount, setAdjustAmount] = useState("")
  const [adjustReason, setAdjustReason] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

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

  const handleStockAdjustment = async () => {
    if (!selectedItem || !adjustAmount) return

    const newStock = selectedItem.currentStock + Number.parseInt(adjustAmount)
    const updatedItem = {
      ...selectedItem,
      currentStock: Math.max(0, newStock),
      lastUpdated: new Date().toISOString(),
      status: getStockStatus(Math.max(0, newStock), selectedItem.minStock),
    }

    setStockData((prev) => prev.map((item) => (item.id === selectedItem.id ? updatedItem : item)))

    // ส่งการแจ้งเตือนหากสต็อกต่ำหรือหมด
    if (updatedItem.status === "low" || updatedItem.status === "out" || updatedItem.status === "critical") {
      const alertType =
        updatedItem.status === "out" ? "stock_out" : updatedItem.status === "critical" ? "stock_critical" : "stock_low"

      await sendStockAlert(
        alertType,
        {
          id: updatedItem.id,
          name: updatedItem.name,
          currentStock: updatedItem.currentStock,
          minStock: updatedItem.minStock,
          location: updatedItem.location,
        },
        [{ email: "admin@sofacover.com", name: "ผู้ดูแลระบบ" }],
      )
    }

    toast({
      title: "ปรับปรุงสต็อกสำเร็จ",
      description: `${selectedItem.name} - สต็อกใหม่: ${updatedItem.currentStock} ชิ้น`,
    })

    setAdjustDialog(false)
    setSelectedItem(null)
    setAdjustAmount("")
    setAdjustReason("")
  }

  const getStockStatus = (current: number, min: number): "normal" | "low" | "out" | "critical" => {
    if (current === 0) return "out"
    if (current <= min * 0.5) return "critical"
    if (current <= min) return "low"
    return "normal"
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800"
      case "low":
        return "bg-yellow-100 text-yellow-800"
      case "critical":
        return "bg-orange-100 text-orange-800"
      case "out":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "normal":
        return "ปกติ"
      case "low":
        return "ต่ำ"
      case "critical":
        return "วิกฤต"
      case "out":
        return "หมด"
      default:
        return status
    }
  }

  const filteredData = stockData.filter((item) => {
    if (filterStatus === "all") return true
    return item.status === filterStatus
  })

  const totalItems = stockData.length
  const lowStockItems = stockData.filter((item) => item.status === "low").length
  const outOfStockItems = stockData.filter((item) => item.status === "out").length
  const criticalStockItems = stockData.filter((item) => item.status === "critical").length
  const totalValue = stockData.reduce((sum, item) => sum + item.currentStock * item.price, 0)

  const sendTestAlert = async () => {
    const testItem = stockData.find((item) => item.status === "low" || item.status === "out")
    if (testItem) {
      const alertType = testItem.status === "out" ? "stock_out" : "stock_low"

      await sendStockAlert(
        alertType,
        {
          id: testItem.id,
          name: testItem.name,
          currentStock: testItem.currentStock,
          minStock: testItem.minStock,
          location: testItem.location,
        },
        [{ email: "test@example.com", name: "ผู้ทดสอบ" }],
      )

      toast({
        title: "ส่งการแจ้งเตือนทดสอบแล้ว",
        description: "ตรวจสอบหน้าระบบแจ้งเตือนเพื่อดูผลลัพธ์",
      })
    }
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
              <h1 className="text-3xl font-bold">จัดการสต็อกสินค้า</h1>
              <p className="text-gray-600">ติดตามและจัดการสต็อกสินค้าแบบเรียลไทม์</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button onClick={sendTestAlert} variant="outline" disabled={notificationLoading}>
              <Bell className="mr-2 h-4 w-4" />
              ทดสอบแจ้งเตือน
            </Button>
            <Link href="/admin/notifications">
              <Button variant="outline">
                <Settings className="mr-2 h-4 w-4" />
                ตั้งค่าแจ้งเตือน
              </Button>
            </Link>
            <Link href="/admin/inventory/settings">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                เพิ่มสินค้า
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">สินค้าทั้งหมด</p>
                  <p className="text-2xl font-bold">{totalItems}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">สต็อกต่ำ</p>
                  <p className="text-2xl font-bold text-yellow-600">{lowStockItems}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">สต็อกวิกฤต</p>
                  <p className="text-2xl font-bold text-orange-600">{criticalStockItems}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">หมดสต็อก</p>
                  <p className="text-2xl font-bold text-red-600">{outOfStockItems}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">มูลค่ารวม</p>
                  <p className="text-2xl font-bold">฿{totalValue.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>รายการสต็อกสินค้า</CardTitle>
              <div className="flex items-center space-x-2">
                <Label htmlFor="statusFilter">กรองตามสถานะ:</Label>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    <SelectItem value="normal">ปกติ</SelectItem>
                    <SelectItem value="low">ต่ำ</SelectItem>
                    <SelectItem value="critical">วิกฤต</SelectItem>
                    <SelectItem value="out">หมด</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>รหัสสินค้า</TableHead>
                  <TableHead>ชื่อสินค้า</TableHead>
                  <TableHead>หมวดหมู่</TableHead>
                  <TableHead>สต็อกปัจจุบัน</TableHead>
                  <TableHead>สต็อกขั้นต่ำ</TableHead>
                  <TableHead>ตำแหน่ง</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>อัปเดตล่าสุด</TableHead>
                  <TableHead className="text-right">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.sku}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <span className={item.currentStock <= item.minStock ? "text-red-600 font-bold" : ""}>
                        {item.currentStock}
                      </span>
                    </TableCell>
                    <TableCell>{item.minStock}</TableCell>
                    <TableCell>{item.location}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(item.status)}>{getStatusText(item.status)}</Badge>
                    </TableCell>
                    <TableCell>{new Date(item.lastUpdated).toLocaleDateString("th-TH")}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          setSelectedItem(item)
                          setAdjustDialog(true)
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Stock Adjustment Dialog */}
        <Dialog open={adjustDialog} onOpenChange={setAdjustDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ปรับปรุงสต็อก</DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <div className="space-y-4">
                <div>
                  <Label>สินค้า</Label>
                  <p className="text-sm font-medium">{selectedItem.name}</p>
                  <p className="text-sm text-gray-500">รหัส: {selectedItem.sku}</p>
                </div>

                <div>
                  <Label>สต็อกปัจจุบัน</Label>
                  <p className="text-lg font-bold">{selectedItem.currentStock} ชิ้น</p>
                </div>

                <div>
                  <Label htmlFor="adjustAmount">จำนวนที่ต้องการปรับ</Label>
                  <Input
                    id="adjustAmount"
                    type="number"
                    placeholder="ใส่จำนวน (+ เพิ่ม, - ลด)"
                    value={adjustAmount}
                    onChange={(e) => setAdjustAmount(e.target.value)}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    สต็อกใหม่จะเป็น: {selectedItem.currentStock + Number.parseInt(adjustAmount || "0")} ชิ้น
                  </p>
                </div>

                <div>
                  <Label htmlFor="adjustReason">เหตุผล</Label>
                  <Input
                    id="adjustReason"
                    placeholder="เหตุผลในการปรับสต็อก"
                    value={adjustReason}
                    onChange={(e) => setAdjustReason(e.target.value)}
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setAdjustDialog(false)}>
                    ยกเลิก
                  </Button>
                  <Button onClick={handleStockAdjustment} disabled={!adjustAmount}>
                    บันทึก
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
