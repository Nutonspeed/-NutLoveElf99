"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import {
  defaultDeliveryMethod,
  loadDefaultDeliveryMethod,
  setDefaultDeliveryMethod,
  autoOpenBill,
  loadAutoOpenBill,
  setAutoOpenBill,
} from "@/lib/mock-settings"
import { logs } from "@/lib/logs"

export default function SettingsPage() {
  const { user } = useAuth()
  const [method, setMethod] = useState(defaultDeliveryMethod)
  const [autoBill, setAutoBillState] = useState(autoOpenBill)
  const [tab, setTab] = useState("display")
  const [error, setError] = useState(false)

  useEffect(() => {
    try {
      loadDefaultDeliveryMethod()
      loadAutoOpenBill()
      setMethod(defaultDeliveryMethod)
      setAutoBillState(autoOpenBill)
    } catch (e) {
      setError(true)
    }
  }, [])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>ไม่สามารถโหลดหน้าตั้งค่า ลองใหม่ภายหลัง</p>
      </div>
    )
  }

  const saveBillOptions = () => {
    setDefaultDeliveryMethod(method)
    setAutoOpenBill(autoBill)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ตั้งค่า</h1>
        </div>
        <Tabs value={tab} onValueChange={setTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="display">การแสดงผล</TabsTrigger>
            <TabsTrigger value="bill">ตัวเลือกบิล</TabsTrigger>
            <TabsTrigger value="lab">โหมดทดลอง</TabsTrigger>
            {user?.role === "owner" && (
              <TabsTrigger value="debug">Debug</TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="display">
            <Card>
              <CardHeader>
                <CardTitle>การแสดงผล</CardTitle>
              </CardHeader>
              <CardContent>ตั้งค่าที่เกี่ยวกับ UI (mock)</CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="bill">
            <Card>
              <CardHeader>
                <CardTitle>ตัวเลือกบิล</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm">วิธีจัดส่งเริ่มต้น</label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                  >
                    <option value="เก็บปลายทาง">เก็บปลายทาง</option>
                    <option value="โอนก่อนส่ง">โอนก่อนส่ง</option>
                    <option value="รับเอง">รับเอง</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <span>เปิดบิลอัตโนมัติเมื่อมีการสั่งซื้อ</span>
                  <Switch
                    checked={autoBill}
                    onCheckedChange={(v) => setAutoBillState(v)}
                  />
                </div>
                <Button onClick={saveBillOptions}>บันทึก</Button>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="lab">
            <Card>
              <CardHeader>
                <CardTitle>โหมดทดลอง</CardTitle>
              </CardHeader>
              <CardContent>สำหรับเปิดใช้คุณสมบัติทดสอบต่างๆ</CardContent>
            </Card>
          </TabsContent>
          {user?.role === "owner" && (
            <TabsContent value="debug">
              <Card>
                <CardHeader>
                  <CardTitle>Debug Tools</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <pre className="text-xs bg-gray-100 p-2 rounded">
                    {JSON.stringify(logs.slice(-5), null, 2)}
                  </pre>
                  <Button variant="outline" onClick={() => setError(true)}>
                    ทดสอบ Fallback
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      throw new Error("simulate error")
                    }}
                  >
                    Simulate Error
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  )
}
