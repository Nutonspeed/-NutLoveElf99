"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import {
  mockNotifications,
  loadNotifications,
  type Notification,
} from "@/lib/mock-notifications"
import {
  loadNotificationStatus,
  getStatus,
  markRead,
} from "@/lib/mock-read-status"
import {
  loadNotificationSettings,
  getNotificationSettings,
} from "@/lib/mock-notification-settings"

export function AdminToast() {
  const [items, setItems] = useState<Notification[]>([])
  const [settings, setSettings] = useState<Record<string, boolean>>({})

  useEffect(() => {
    loadNotificationSettings()
    loadNotificationStatus()
    loadNotifications()
    setSettings(getNotificationSettings())
    setItems([...mockNotifications])
  }, [])

  const current = items.find(
    (n) => !getStatus(n.id).read && settings[n.type],
  )
  if (!current) return null

  const close = () => {
    markRead(current.id)
    setItems([...mockNotifications])
  }

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded shadow flex items-start space-x-2">
      <Link href={current.link} className="hover:underline">
        {current.message}
      </Link>
      <button onClick={close} className="ml-2">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
