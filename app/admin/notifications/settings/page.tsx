"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Settings, Mail, Smartphone, MessageSquare, Save, TestTube } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

interface NotificationSettings {
  email: {
    enabled: boolean
    smtpHost: string
    smtpPort: number
    smtpUser: string
    smtpPass: string
    fromEmail: string
    fromName: string
  }
  sms: {
    enabled: boolean
    provider: "twilio" | "other"
    accountSid: string
    authToken: string
    fromNumber: string
  }
  line: {
    enabled: boolean
    token: string
    groupName: string
  }
  general: {
    testMode: boolean
    retryAttempts: number
    retryDelay: number
    batchSize: number
  }
}

export default function NotificationSettingsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [settings, setSettings] = useState<NotificationSettings>({
    email: {
      enabled: true,
      smtpHost: "smtp.gmail.com",
      smtpPort: 587,
      smtpUser: "",
      smtpPass: "",
      fromEmail: "noreply@sofacover.com",
      fromName: "Sofa Cover Store",
    },
    sms: {
      enabled: false,
      provider: "twilio",
      accountSid: "",
      authToken: "",
      fromNumber: "",
    },
    line: {
      enabled: true,
      token: "",
      groupName: "Sofa Cover Admin",
    },
    general: {
      testMode: false,
      retryAttempts: 3,
      retryDelay: 5000,
      batchSize: 10,
    },
  })
  const [testResults, setTestResults] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    if (user?.role !== "admin") {
      router.push("/")
      return
    }

    // Load settings from localStorage or API
    const savedSettings = localStorage.getItem("notificationSettings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
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
    // Save to localStorage (in real app, save to database)
    localStorage.setItem("notificationSettings", JSON.stringify(settings))

    toast({
      title: "บันทึกการตั้งค่าสำเร็จ",
      description: "การตั้งค่าระบบแจ้งเตือนได้รับการอัปเดตแล้ว",
    })
  }

  const testConnection = async (type: "email" | "sms" | "line") => {
    try {
      // Simulate API call to test connection
      const response = await fetch("/api/notifications/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "stock_low",
          email: type === "email" ? "test@example.com" : undefined,
          phone: type === "sms" ? "+66812345678" : undefined,
        }),
      })

      const result = await response.json()
      setTestResults((prev) => ({ ...prev, [type]: result.success }))

      if (result.success) {
        toast({
          title: `ทดสอบ${type === "email" ? "อีเมล" : type === "sms" ? "SMS" : "Line"}สำเร็จ`,
          description: "การเชื่อมต่อทำงานปกติ",
        })
      } else {
        toast({
          title: `ทดสอบ${type === "email" ? "อีเมล" : type === "sms" ? "SMS" : "Line"}ไม่สำเร็จ`,
          description: "กรุณาตรวจสอบการตั้งค่า",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error(`Test ${type} error:`, error)
      setTestResults((prev) => ({ ...prev, [type]: false }))
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถทดสอบการเชื่อมต่อได้",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin/notifications">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">ตั้งค่าระบบแจ้งเตือน</h1>
              <p className="text-gray-600">กำหนดค่าการแจ้งเตือนทาง Email/SMS/Line</p>
            </div>
          </div>

          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            บันทึกการตั้งค่า
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Email Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                การตั้งค่าอีเมล
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>เปิดใช้งานอีเมล</Label>
                  <p className="text-sm text-gray-500">แจ้งเตือนทางอีเมล</p>
                </div>
                <Switch
                  checked={settings.email.enabled}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      email: { ...prev.email, enabled: checked },
                    }))
                  }
                />
              </div>

              {settings.email.enabled && (
                <>
                  <Separator />

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        value={settings.email.smtpHost}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            email: { ...prev.email, smtpHost: e.target.value },
                          }))
                        }
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        type="number"
                        value={settings.email.smtpPort}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            email: { ...prev.email, smtpPort: Number.parseInt(e.target.value) || 587 },
                          }))
                        }
                        placeholder="587"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="smtpUser">SMTP Username</Label>
                    <Input
                      id="smtpUser"
                      type="email"
                      value={settings.email.smtpUser}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          email: { ...prev.email, smtpUser: e.target.value },
                        }))
                      }
                      placeholder="your-email@gmail.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="smtpPass">SMTP Password</Label>
                    <Input
                      id="smtpPass"
                      type="password"
                      value={settings.email.smtpPass}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          email: { ...prev.email, smtpPass: e.target.value },
                        }))
                      }
                      placeholder="App Password"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fromEmail">From Email</Label>
                      <Input
                        id="fromEmail"
                        type="email"
                        value={settings.email.fromEmail}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            email: { ...prev.email, fromEmail: e.target.value },
                          }))
                        }
                        placeholder="noreply@sofacover.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="fromName">From Name</Label>
                      <Input
                        id="fromName"
                        value={settings.email.fromName}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            email: { ...prev.email, fromName: e.target.value },
                          }))
                        }
                        placeholder="Sofa Cover Store"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">สถานะการเชื่อมต่อ:</span>
                      {testResults.email !== undefined && (
                        <Badge variant={testResults.email ? "default" : "destructive"}>
                          {testResults.email ? "เชื่อมต่อได้" : "เชื่อมต่อไม่ได้"}
                        </Badge>
                      )}
                    </div>
                    <Button variant="outline" onClick={() => testConnection("email")}>
                      <TestTube className="mr-2 h-4 w-4" />
                      ทดสอบ
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* SMS Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Smartphone className="mr-2 h-5 w-5" />
                การตั้งค่า SMS
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>เปิดใช้งาน SMS</Label>
                  <p className="text-sm text-gray-500">แจ้งเตือนทาง SMS</p>
                </div>
                <Switch
                  checked={settings.sms.enabled}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      sms: { ...prev.sms, enabled: checked },
                    }))
                  }
                />
              </div>

              {settings.sms.enabled && (
                <>
                  <Separator />

                  <div>
                    <Label htmlFor="accountSid">Twilio Account SID</Label>
                    <Input
                      id="accountSid"
                      value={settings.sms.accountSid}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          sms: { ...prev.sms, accountSid: e.target.value },
                        }))
                      }
                      placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    />
                  </div>

                  <div>
                    <Label htmlFor="authToken">Twilio Auth Token</Label>
                    <Input
                      id="authToken"
                      type="password"
                      value={settings.sms.authToken}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          sms: { ...prev.sms, authToken: e.target.value },
                        }))
                      }
                      placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    />
                  </div>

                  <div>
                    <Label htmlFor="fromNumber">From Number</Label>
                    <Input
                      id="fromNumber"
                      value={settings.sms.fromNumber}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          sms: { ...prev.sms, fromNumber: e.target.value },
                        }))
                      }
                      placeholder="+1234567890"
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">วิธีการตั้งค่า Twilio</h4>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      <li>
                        สมัครบัญชี Twilio ที่{" "}
                        <a
                          href="https://www.twilio.com"
                          target="_blank"
                          className="text-blue-600 underline"
                          rel="noreferrer"
                        >
                          twilio.com
                        </a>
                      </li>
                      <li>ไปที่ Console Dashboard</li>
                      <li>คัดลอก Account SID และ Auth Token</li>
                      <li>ซื้อหมายเลขโทรศัพท์สำหรับส่ง SMS</li>
                    </ol>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">สถานะการเชื่อมต่อ:</span>
                      {testResults.sms !== undefined && (
                        <Badge variant={testResults.sms ? "default" : "destructive"}>
                          {testResults.sms ? "เชื่อมต่อได้" : "เชื่อมต่อไม่ได้"}
                        </Badge>
                      )}
                    </div>
                    <Button variant="outline" onClick={() => testConnection("sms")}>
                      <TestTube className="mr-2 h-4 w-4" />
                      ทดสอบ
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Line Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                การตั้งค่า Line Notify
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>เปิดใช้งาน Line Notify</Label>
                  <p className="text-sm text-gray-500">แจ้งเตือนทาง Line</p>
                </div>
                <Switch
                  checked={settings.line.enabled}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      line: { ...prev.line, enabled: checked },
                    }))
                  }
                />
              </div>

              {settings.line.enabled && (
                <>
                  <Separator />

                  <div>
                    <Label htmlFor="lineToken">Line Notify Token</Label>
                    <Input
                      id="lineToken"
                      type="password"
                      value={settings.line.token}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          line: { ...prev.line, token: e.target.value },
                        }))
                      }
                      placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                    />
                  </div>

                  <div>
                    <Label htmlFor="groupName">ชื่อกลุ่ม/ห้อง</Label>
                    <Input
                      id="groupName"
                      value={settings.line.groupName}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          line: { ...prev.line, groupName: e.target.value },
                        }))
                      }
                      placeholder="Sofa Cover Admin"
                    />
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">วิธีการตั้งค่า Line Notify</h4>
                    <ol className="text-sm space-y-1 list-decimal list-inside">
                      <li>
                        ไปที่{" "}
                        <a
                          href="https://notify-bot.line.me"
                          target="_blank"
                          className="text-green-600 underline"
                          rel="noreferrer"
                        >
                          notify-bot.line.me
                        </a>
                      </li>
                      <li>เข้าสู่ระบบด้วยบัญชี Line</li>
                      <li>คลิก "Generate token"</li>
                      <li>เลือกกลุ่มหรือแชทที่ต้องการรับการแจ้งเตือน</li>
                      <li>คัดลอก Token ที่ได้</li>
                    </ol>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">สถานะการเชื่อมต่อ:</span>
                      {testResults.line !== undefined && (
                        <Badge variant={testResults.line ? "default" : "destructive"}>
                          {testResults.line ? "เชื่อมต่อได้" : "เชื่อมต่อไม่ได้"}
                        </Badge>
                      )}
                    </div>
                    <Button variant="outline" onClick={() => testConnection("line")}>
                      <TestTube className="mr-2 h-4 w-4" />
                      ทดสอบ
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* General Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="mr-2 h-5 w-5" />
                การตั้งค่าทั่วไป
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>โหมดทดสอบ</Label>
                  <p className="text-sm text-gray-500">ส่งการแจ้งเตือนในโหมดทดสอบเท่านั้น</p>
                </div>
                <Switch
                  checked={settings.general.testMode}
                  onCheckedChange={(checked) =>
                    setSettings((prev) => ({
                      ...prev,
                      general: { ...prev.general, testMode: checked },
                    }))
                  }
                />
              </div>

              <Separator />

              <div>
                <Label htmlFor="retryAttempts">จำนวนครั้งที่ลองใหม่</Label>
                <Input
                  id="retryAttempts"
                  type="number"
                  min="1"
                  max="10"
                  value={settings.general.retryAttempts}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      general: { ...prev.general, retryAttempts: Number.parseInt(e.target.value) || 3 },
                    }))
                  }
                />
                <p className="text-sm text-gray-500 mt-1">จำนวนครั้งที่จะลองส่งใหม่เมื่อส่งไม่สำเร็จ</p>
              </div>

              <div>
                <Label htmlFor="retryDelay">ระยะเวลารอระหว่างการลองใหม่ (มิลลิวินาที)</Label>
                <Input
                  id="retryDelay"
                  type="number"
                  min="1000"
                  max="60000"
                  step="1000"
                  value={settings.general.retryDelay}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      general: { ...prev.general, retryDelay: Number.parseInt(e.target.value) || 5000 },
                    }))
                  }
                />
                <p className="text-sm text-gray-500 mt-1">ระยะเวลารอก่อนลองส่งใหม่ (5000 = 5 วินาที)</p>
              </div>

              <div>
                <Label htmlFor="batchSize">จำนวนการแจ้งเตือนต่อชุด</Label>
                <Input
                  id="batchSize"
                  type="number"
                  min="1"
                  max="100"
                  value={settings.general.batchSize}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      general: { ...prev.general, batchSize: Number.parseInt(e.target.value) || 10 },
                    }))
                  }
                />
                <p className="text-sm text-gray-500 mt-1">จำนวนการแจ้งเตือนที่ส่งพร้อมกันในแต่ละครั้ง</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Environment Variables Guide */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>ตัวแปรสภาพแวดล้อม (Environment Variables)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm mb-4">
                เพิ่มตัวแปรเหล่านี้ในไฟล์ <code className="bg-gray-200 px-2 py-1 rounded">.env.local</code>:
              </p>
              <Textarea
                readOnly
                value={`# Email Configuration
SMTP_HOST=${settings.email.smtpHost}
SMTP_PORT=${settings.email.smtpPort}
SMTP_USER=${settings.email.smtpUser}
SMTP_PASS=${settings.email.smtpPass}
SMTP_FROM=${settings.email.fromEmail}

# SMS Configuration (Twilio)
TWILIO_ACCOUNT_SID=${settings.sms.accountSid}
TWILIO_AUTH_TOKEN=${settings.sms.authToken}
TWILIO_FROM_NUMBER=${settings.sms.fromNumber}

# Line Notify Configuration
LINE_NOTIFY_TOKEN=${settings.line.token}

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000`}
                className="font-mono text-xs"
                rows={15}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
