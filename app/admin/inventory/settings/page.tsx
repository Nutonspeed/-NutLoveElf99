"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Settings, Bell, Mail, Smartphone } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface InventorySettings {
  lowStockThreshold: number
  criticalStockThreshold: number
  autoReorderEnabled: boolean
  autoReorderQuantity: number
  emailNotifications: boolean
  smsNotifications: boolean
  pushNotifications: boolean
  notificationEmails: string[]
  stockCheckFrequency: "realtime" | "hourly" | "daily"
  barcodeEnabled: boolean
  locationTracking: boolean
  stockValuationMethod: "fifo" | "lifo" | "average"
}

export default function InventorySettingsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [settings, setSettings] = useState<InventorySettings>({
    lowStockThreshold: 10,
    criticalStockThreshold: 5,
    autoReorderEnabled: false,
    autoReorderQuantity: 50,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    notificationEmails: ["admin@sofacover.com"],
    stockCheckFrequency: "realtime",
    barcodeEnabled: true,
    locationTracking: true,
    stockValuationMethod: "fifo",
  })
  const [newEmail, setNewEmail] = useState("")

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

  const handleSaveSettings = () => {
    // In real app, save to database
    toast({
      title: "บันทึกการตั้งค่าสำเร็จ",
      description: "การตั้งค่าระบบจัดการสต็อกได้รับการอัปเดตแล้ว",
    })
  }

  const addNotificationEmail = () => {
    if (newEmail && !settings.notificationEmails.includes(newEmail)) {
      setSettings((prev) => ({
        ...prev,
        notificationEmails: [...prev.notificationEmails, newEmail],
      }))
      setNewEmail("")
    }
  }

  const removeNotificationEmail = (email: string) => {
    setSettings((prev) => ({
      ...prev,
      notificationEmails: prev.notificationEmails.filter((e) => e !== email),
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin/inventory">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">ตั้งค่าระบบจัดการสต็อก</h1>
              <p className="text-gray-600">กำหนดค่าการแจ้งเตือนและการทำงานของระบบ</p>
            </div>
          </div>

          <Button onClick={handleSaveSettings}>
            <Settings className="mr-2 h-4 w-4" />
            บันทึกการตั้งค่า
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stock Thresholds */}
          <Card>
            <CardHeader>
              <CardTitle>เกณฑ์การแจ้งเตือนสต็อก</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="lowStock">เกณฑ์สต็อกต่ำ (%)</Label>
                <Input
                  id="lowStock"
                  type="number"
                  min="1"
                  max="100"
                  value={settings.lowStockThreshold}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      lowStockThreshold: Number.parseInt(e.target.value) || 0,
                    }))
                  }
                />
                <p className="text-sm text-gray-500 mt-1">
                  แจ้งเตือนเมื่อสต็อกเหลือน้อยกว่า {settings.lowStockThreshold}% ของสต็อกขั้นต่ำ
                </p>
              </div>

              <div>
                <Label htmlFor="criticalStock">เกณฑ์สต็อกวิกฤต (%)</Label>
                <Input
                  id="criticalStock"
                  type="number"
                  min="1"
                  max="100"
                  value={settings.criticalStockThreshold}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      criticalStockThreshold: Number.parseInt(e.target.value) || 0,
                    }))
                  }
                />
                <p className="text-sm text-gray-500 mt-1">
                  แจ้งเตือนด่วนเมื่อสต็อกเหลือน้อยกว่า {settings.criticalStockThreshold}% ของสต็อกขั้นต่ำ
                </p>
              </div>

              <Separator />

              <div>
                <Label htmlFor="stockCheck">ความถี่ในการตรวจสอบสต็อก</Label>
                <Select
                  value={settings.stockCheckFrequency}
                  onValueChange={(value: "realtime" | "hourly" | "daily") =>
                    setSettings((prev) => ({ ...prev, stockCheckFrequency: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">แบบ Real-time</SelectItem>
                    <SelectItem value="hourly">ทุกชั่วโมง</SelectItem>
                    <SelectItem value="daily">ทุกวัน</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Auto Reorder */}
          <Card>
            <CardHeader>
              <CardTitle>การสั่งซื้อสินค้าอัตโนมัติ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="autoReorder">เปิดใช้การสั่งซื้ออัตโนมัติ</Label>
                  <p className="text-sm text-gray-500">สั่งซื้อสินค้าอัตโนมัติเมื่อสต็อกต่ำ</p>
                </div>
                <Switch
                  id="autoReorder"
                  checked={settings.autoReorderEnabled}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      autoReorderEnabled: checked,
                    }))
                  }
                />
              </div>

              {settings.autoReorderEnabled && (
                <div>
                  <Label htmlFor="reorderQty">จำนวนที่สั่งซื้อ (ชิ้น)</Label>
                  <Input
                    id="reorderQty"
                    type="number"
                    min="1"
                    value={settings.autoReorderQuantity}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        autoReorderQuantity: Number.parseInt(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
              )}

              <Separator />

              <div>
                <Label htmlFor="valuation">วิธีการคำนวณมูลค่าสต็อก</Label>
                <Select
                  value={settings.stockValuationMethod}
                  onValueChange={(value: "fifo" | "lifo" | "average") =>
                    setSettings((prev) => ({ ...prev, stockValuationMethod: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fifo">FIFO (เข้าก่อนออกก่อน)</SelectItem>
                    <SelectItem value="lifo">LIFO (เข้าหลังออกก่อน)</SelectItem>
                    <SelectItem value="average">ราคาเฉลี่ย</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                การแจ้งเตือน
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <div>
                    <Label>อีเมล</Label>
                    <p className="text-sm text-gray-500">แจ้งเตือนทางอีเมล</p>
                  </div>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      emailNotifications: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Smartphone className="h-4 w-4" />
                  <div>
                    <Label>SMS</Label>
                    <p className="text-sm text-gray-500">แจ้งเตือนทาง SMS</p>
                  </div>
                </div>
                <Switch
                  checked={settings.smsNotifications}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      smsNotifications: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Bell className="h-4 w-4" />
                  <div>
                    <Label>Push Notification</Label>
                    <p className="text-sm text-gray-500">แจ้งเตือนในระบบ</p>
                  </div>
                </div>
                <Switch
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      pushNotifications: checked,
                    }))
                  }
                />
              </div>

              {settings.emailNotifications && (
                <>
                  <Separator />
                  <div>
                    <Label>อีเมลสำหรับรับการแจ้งเตือน</Label>
                    <div className="space-y-2 mt-2">
                      {settings.notificationEmails.map((email, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{email}</span>
                          <Button variant="ghost" size="sm" onClick={() => removeNotificationEmail(email)}>
                            ลบ
                          </Button>
                        </div>
                      ))}
                      <div className="flex space-x-2">
                        <Input
                          type="email"
                          placeholder="เพิ่มอีเมล..."
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                        />
                        <Button onClick={addNotificationEmail}>เพิ่ม</Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* System Features */}
          <Card>
            <CardHeader>
              <CardTitle>ฟีเจอร์ระบบ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>ระบบบาร์โค้ด</Label>
                  <p className="text-sm text-gray-500">เปิดใช้การสแกนบาร์โค้ด</p>
                </div>
                <Switch
                  checked={settings.barcodeEnabled}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      barcodeEnabled: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>ติดตามตำแหน่งสินค้า</Label>
                  <p className="text-sm text-gray-500">จัดเก็บข้อมูลตำแหน่งในคลัง</p>
                </div>
                <Switch
                  checked={settings.locationTracking}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      locationTracking: checked,
                    }))
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
