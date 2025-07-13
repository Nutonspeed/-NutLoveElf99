"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft } from "lucide-react"
import {
  loadNotificationSettings,
  getNotificationSettings,
  setNotificationSetting,
  type NotificationCategory,
} from "@/lib/mock-notification-settings"

export default function NotificationSettingsPage() {
  const [settings, setSettings] = useState<Record<NotificationCategory, boolean>>({
    order: true,
    claim: false,
    chat: true,
  })

  useEffect(() => {
    loadNotificationSettings()
    setSettings({ ...getNotificationSettings() })
  }, [])

  const toggle = (type: NotificationCategory, value: boolean) => {
    setNotificationSetting(type, value)
    setSettings({ ...getNotificationSettings() })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/notifications">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ตั้งค่าการแจ้งเตือน</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>การแสดงผล</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {([
              { key: 'order', label: 'ออเดอร์ใหม่' },
              { key: 'claim', label: 'เคลมสินค้า' },
              { key: 'chat', label: 'ข้อความแชท' },
            ] as { key: NotificationCategory; label: string }[]).map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <Label>{item.label}</Label>
                <Switch
                  checked={settings[item.key]}
                  onCheckedChange={(v) => toggle(item.key, v)}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
