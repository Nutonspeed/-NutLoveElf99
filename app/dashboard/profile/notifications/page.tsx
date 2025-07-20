"use client"
import { useEffect, useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { loadPrefs, getPref, setPref, type NotificationPref } from "@/lib/mock-user-notify-pref"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/buttons/button"

export default function ProfileNotificationPage() {
  const { user } = useAuth()
  const [pref, setPrefState] = useState<NotificationPref>({ line: false, email: true, push: false, inApp: true })

  useEffect(() => {
    loadPrefs()
    if (user) setPrefState(getPref(user.id))
  }, [user])

  const toggle = (key: keyof NotificationPref) => {
    setPrefState({ ...pref, [key]: !pref[key] })
  }

  const save = () => {
    if (user) setPref(user.id, pref)
    alert("saved (mock)")
  }

  if (!user) return <div className="p-4">Loading...</div>

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">การแจ้งเตือนของฉัน</h1>
      <div className="space-y-2 max-w-md">
        <div className="flex items-center justify-between">
          <span>LINE</span>
          <Switch checked={pref.line} onCheckedChange={() => toggle('line')} />
        </div>
        <div className="flex items-center justify-between">
          <span>Email</span>
          <Switch checked={pref.email} onCheckedChange={() => toggle('email')} />
        </div>
        <div className="flex items-center justify-between">
          <span>Push</span>
          <Switch checked={pref.push} onCheckedChange={() => toggle('push')} />
        </div>
        <div className="flex items-center justify-between">
          <span>In-App</span>
          <Switch checked={pref.inApp} onCheckedChange={() => toggle('inApp')} />
        </div>
        <Button onClick={save}>บันทึก</Button>
      </div>
    </div>
  )
}
