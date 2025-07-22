"use client"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"
import {
  loadNotificationSettings,
  getNotificationSettings,
  setNotificationSetting,
} from "@/lib/mock-notification-settings"

export default function NotifyRulesPage() {
  const [settings, setSettings] = useState(getNotificationSettings())

  useEffect(() => {
    loadNotificationSettings()
    setSettings({ ...getNotificationSettings() })
  }, [])

  const toggle = (k: any) => {
    setNotificationSetting(k, !settings[k])
    setSettings({ ...getNotificationSettings() })
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Notification Rules</h1>
      {Object.keys(settings).map((k) => (
        <label key={k} className="flex items-center gap-2">
          <Switch checked={settings[k as keyof typeof settings]} onCheckedChange={() => toggle(k)} />
          <span>{k}</span>
        </label>
      ))}
    </div>
  )
}
