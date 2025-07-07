"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Bell,
  Send,
  History,
  Mail,
  MessageSquare,
  Smartphone,
  ArrowLeft,
  Eye,
  TestTube,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Trash2,
  RefreshCw,
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import type { NotificationHistory, NotificationTemplate } from "@/data/mock-notification-service"

export default function NotificationsPage() {
  const { toast } = useToast()
  const [history, setHistory] = useState<NotificationHistory[]>([])
  const [templates, setTemplates] = useState<NotificationTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [testDialog, setTestDialog] = useState(false)
  const [testData, setTestData] = useState({
    type: "stock_low",
    email: "",
    phone: "",
  })
  const [settings, setSettings] = useState({
    emailEnabled: true,
    smsEnabled: false,
    lineEnabled: true,
    testMode: true, // เปิดโหมดทดสอบเป็นค่าเริ่มต้น
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)

      // โหลดประวัติการแจ้งเตือน
      const historyResponse = await fetch("/api/notifications/history")
      if (historyResponse.ok) {
        const historyData = await historyResponse.json()
        setHistory(historyData.history || [])
      }

      // โหลดเทมเพลต
      const templatesResponse = await fetch("/api/notifications/templates")
      if (templatesResponse.ok) {
        const templatesData = await templatesResponse.json()
        setTemplates(templatesData.templates || [])
      }
    } catch (error) {
      console.error("Error loading notification data:", error)
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลการแจ้งเตือนได้",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const sendTestNotification = async () => {
    try {
      const response = await fetch("/api/notifications/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "ส่งการแจ้งเตือนทดสอบสำเร็จ",
          description: "ตรวจสอบ Console ของเบราว์เซอร์เพื่อดูผลลัพธ์",
        })
        setTestDialog(false)
        loadData() // โหลดประวัติใหม่
      } else {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: result.message || "ไม่สามารถส่งการแจ้งเตือนได้",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Test notification error:", error)
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถส่งการแจ้งเตือนทดสอบได้",
        variant: "destructive",
      })
    }
  }

  const clearHistory = async () => {
    try {
      const response = await fetch("/api/notifications/history", {
        method: "DELETE",
      })

      const result = await response.json()

      if (result.success) {
        toast({
          title: "ล้างประวัติสำเร็จ",
          description: "ประวัติการแจ้งเตือนถูกล้างแล้ว",
        })
        setHistory([])
      } else {
        toast({
          title: "เกิดข้อผิดพลาด",
          description: "ไม่สามารถล้างประวัติได้",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Clear history error:", error)
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถล้างประวัติได้",
        variant: "destructive",
      })
    }
  }


  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email":
        return <Mail className="h-4 w-4" />
      case "sms":
        return <Smartphone className="h-4 w-4" />
      case "line":
        return <MessageSquare className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case "email":
        return "bg-blue-100 text-blue-800"
      case "sms":
        return "bg-green-100 text-green-800"
      case "line":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const totalNotifications = history.length
  const sentNotifications = history.filter((h) => h.status === "sent").length
  const failedNotifications = history.filter((h) => h.status === "failed").length
  const successRate = totalNotifications > 0 ? Math.round((sentNotifications / totalNotifications) * 100) : 0

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
              <h1 className="text-3xl font-bold">ระบบแจ้งเตือน (Mock-up)</h1>
              <p className="text-gray-600">จำลองการแจ้งเตือนทาง Email/SMS/Line</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Dialog open={testDialog} onOpenChange={setTestDialog}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <TestTube className="mr-2 h-4 w-4" />
                  ทดสอบการแจ้งเตือน
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>ทดสอบการแจ้งเตือน</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="testType">ประเภทการแจ้งเตือน</Label>
                    <Select
                      value={testData.type}
                      onValueChange={(value) => setTestData((prev) => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stock_low">สต็อกต่ำ</SelectItem>
                        <SelectItem value="stock_out">หมดสต็อก</SelectItem>
                        <SelectItem value="stock_critical">สต็อกวิกฤต</SelectItem>
                        <SelectItem value="order_created">ออเดอร์ใหม่</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="testEmail">อีเมลทดสอบ (ไม่บังคับ)</Label>
                    <Input
                      id="testEmail"
                      type="email"
                      placeholder="test@example.com"
                      value={testData.email}
                      onChange={(e) => setTestData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="testPhone">เบอร์โทรทดสอบ (ไม่บังคับ)</Label>
                    <Input
                      id="testPhone"
                      type="tel"
                      placeholder="+66812345678"
                      value={testData.phone}
                      onChange={(e) => setTestData((prev) => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>

                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>หมายเหตุ:</strong> นี่เป็นระบบจำลอง ผลลัพธ์จะแสดงใน Console ของเบราว์เซอร์
                    </p>
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setTestDialog(false)}>
                      ยกเลิก
                    </Button>
                    <Button onClick={sendTestNotification}>
                      <Send className="mr-2 h-4 w-4" />
                      ส่งทดสอบ
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button onClick={loadData} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              รีเฟรช
            </Button>
          </div>
        </div>

        {/* Mock-up Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-900">ระบบจำลอง (Mock-up)</h3>
          </div>
          <p className="text-blue-800 mt-2">
            นี่เป็นระบบจำลองการแจ้งเตือน ไม่ได้ส่งการแจ้งเตือนจริง ผลลัพธ์จะแสดงใน Console ของเบราว์เซอร์ และบันทึกในประวัติการแจ้งเตือน
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">การแจ้งเตือนทั้งหมด</p>
                  <p className="text-2xl font-bold">{totalNotifications}</p>
                </div>
                <Bell className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ส่งสำเร็จ</p>
                  <p className="text-2xl font-bold text-green-600">{sentNotifications}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">ส่งไม่สำเร็จ</p>
                  <p className="text-2xl font-bold text-red-600">{failedNotifications}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">อัตราความสำเร็จ</p>
                  <p className="text-2xl font-bold">{successRate}%</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600">{successRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="history" className="space-y-6">
          <TabsList>
            <TabsTrigger value="history">ประวัติการแจ้งเตือน</TabsTrigger>
            <TabsTrigger value="templates">เทมเพลต</TabsTrigger>
            <TabsTrigger value="settings">การตั้งค่า</TabsTrigger>
          </TabsList>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <History className="mr-2 h-5 w-5" />
                    ประวัติการแจ้งเตือน
                  </CardTitle>
                  {history.length > 0 && (
                    <Button variant="outline" size="sm" onClick={clearHistory}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      ล้างประวัติ
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="text-gray-500 mt-2">กำลังโหลด...</p>
                  </div>
                ) : history.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>วันที่/เวลา</TableHead>
                        <TableHead>ประเภท</TableHead>
                        <TableHead>ช่องทาง</TableHead>
                        <TableHead>ผู้รับ</TableHead>
                        <TableHead>หัวข้อ</TableHead>
                        <TableHead>สถานะ</TableHead>
                        <TableHead className="text-right">การจัดการ</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {history.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <p className="text-sm">{new Date(item.createdAt).toLocaleString("th-TH")}</p>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {item.type === "stock_low"
                                ? "สต็อกต่ำ"
                                : item.type === "stock_out"
                                  ? "หมดสต็อก"
                                  : item.type === "stock_critical"
                                    ? "สต็อกวิกฤต"
                                    : item.type === "order_created"
                                      ? "ออเดอร์ใหม่"
                                      : item.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getChannelIcon(item.channel)}
                              <Badge className={getChannelColor(item.channel)}>
                                {item.channel === "email"
                                  ? "อีเมล"
                                  : item.channel === "sms"
                                    ? "SMS"
                                    : item.channel === "line"
                                      ? "Line"
                                      : item.channel}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm font-medium">{item.recipient}</p>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{item.subject || "-"}</p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(item.status)}
                              <Badge
                                variant={
                                  item.status === "sent"
                                    ? "default"
                                    : item.status === "failed"
                                      ? "destructive"
                                      : "secondary"
                                }
                              >
                                {item.status === "sent"
                                  ? "ส่งแล้ว"
                                  : item.status === "failed"
                                    ? "ส่งไม่สำเร็จ"
                                    : item.status === "pending"
                                      ? "รอส่ง"
                                      : item.status}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>รายละเอียดการแจ้งเตือน</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label>ประเภท</Label>
                                      <p className="text-sm">{item.type}</p>
                                    </div>
                                    <div>
                                      <Label>ช่องทาง</Label>
                                      <p className="text-sm">{item.channel}</p>
                                    </div>
                                    <div>
                                      <Label>ผู้รับ</Label>
                                      <p className="text-sm">{item.recipient}</p>
                                    </div>
                                    <div>
                                      <Label>สถานะ</Label>
                                      <p className="text-sm">{item.status}</p>
                                    </div>
                                  </div>

                                  {item.subject && (
                                    <div>
                                      <Label>หัวข้อ</Label>
                                      <p className="text-sm">{item.subject}</p>
                                    </div>
                                  )}

                                  <div>
                                    <Label>เนื้อหา</Label>
                                    <div className="bg-gray-50 p-3 rounded-lg text-sm max-h-60 overflow-y-auto">
                                      {item.channel === "email" ? (
                                        <div dangerouslySetInnerHTML={{ __html: item.content }} />
                                      ) : (
                                        <pre className="whitespace-pre-wrap">{item.content}</pre>
                                      )}
                                    </div>
                                  </div>

                                  {item.error && (
                                    <div>
                                      <Label>ข้อผิดพลาด</Label>
                                      <p className="text-sm text-red-600">{item.error}</p>
                                    </div>
                                  )}
                                </div>
                              </DialogContent>
                            </Dialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-8">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">ยังไม่มีประวัติการแจ้งเตือน</p>
                    <p className="text-sm text-gray-400 mt-2">ลองทดสอบการแจ้งเตือนเพื่อดูผลลัพธ์</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>เทมเพลตการแจ้งเตือน</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <Card key={template.id} className="border-2">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <div className="flex items-center space-x-1">
                            {getChannelIcon(template.type)}
                            <Badge className={getChannelColor(template.type)}>
                              {template.type === "email"
                                ? "อีเมล"
                                : template.type === "sms"
                                  ? "SMS"
                                  : template.type === "line"
                                    ? "Line"
                                    : template.type}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {template.subject && (
                          <div className="mb-3">
                            <Label className="text-xs">หัวข้อ</Label>
                            <p className="text-sm font-medium">{template.subject}</p>
                          </div>
                        )}

                        <div className="mb-3">
                          <Label className="text-xs">เนื้อหา</Label>
                          <div className="bg-gray-50 p-2 rounded text-xs max-h-32 overflow-y-auto">
                            <pre className="whitespace-pre-wrap">{template.content.substring(0, 200)}...</pre>
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs">ตัวแปร</Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {template.variables.map((variable) => (
                              <Badge key={variable} variant="outline" className="text-xs">
                                {`{{${variable}}}`}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>การตั้งค่าช่องทางการแจ้งเตือน</CardTitle>
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
                      checked={settings.emailEnabled}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, emailEnabled: checked }))}
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
                      checked={settings.smsEnabled}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, smsEnabled: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MessageSquare className="h-4 w-4" />
                      <div>
                        <Label>Line Notify</Label>
                        <p className="text-sm text-gray-500">แจ้งเตือนทาง Line</p>
                      </div>
                    </div>
                    <Switch
                      checked={settings.lineEnabled}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, lineEnabled: checked }))}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>โหมดทดสอบ</Label>
                      <p className="text-sm text-gray-500">ระบบจำลอง - เปิดใช้งานอยู่</p>
                    </div>
                    <Switch
                      checked={settings.testMode}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, testMode: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>คำแนะนำการใช้งาน</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">วิธีการทดสอบ</h4>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      <li>คลิกปุ่ม "ทดสอบการแจ้งเตือน"</li>
                      <li>เลือกประเภทการแจ้งเตือนที่ต้องการ</li>
                      <li>ใส่อีเมลหรือเบอร์โทร (ไม่บังคับ)</li>
                      <li>คลิก "ส่งทดสอบ"</li>
                      <li>ตรวจสอบผลลัพธ์ใน Console</li>
                    </ol>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">ฟีเจอร์ที่มี</h4>
                    <ul className="text-sm space-y-1 list-disc list-inside">
                      <li>จำลองการส่งอีเมล SMS และ Line</li>
                      <li>เทมเพลตการแจ้งเตือนหลากหลาย</li>
                      <li>ประวัติการแจ้งเตือน</li>
                      <li>สถิติความสำเร็จ</li>
                      <li>ระบบตัวแปรในเทมเพลต</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">⚠️ หมายเหตุ</h4>
                    <p className="text-sm text-gray-700">
                      นี่เป็นระบบจำลอง ไม่ได้ส่งการแจ้งเตือนจริง เมื่อพัฒนาเสร็จแล้วจะเชื่อมต่อกับเซอร์วิสจริง
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
