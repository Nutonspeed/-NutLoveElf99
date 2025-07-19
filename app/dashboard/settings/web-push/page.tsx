"use client"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/buttons/button"
import { loadWebPush, setWebPushEnabled, testWebPush } from "@/lib/mock-web-push"

export default function WebPushSettingsPage() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setEnabled(loadWebPush())
  }, [])

  const toggle = (v: boolean) => {
    setEnabled(v)
    setWebPushEnabled(v)
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Web Push</h1>
      <div className="flex items-center space-x-2">
        <Switch checked={enabled} onCheckedChange={toggle} />
        <span>{enabled ? "เปิด" : "ปิด"}</span>
      </div>
      <Button onClick={() => testWebPush("การแจ้งเตือนทดสอบ")}>ทดสอบ</Button>
    </div>
  )
}
