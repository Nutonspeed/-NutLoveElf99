"use client"
import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { adminNotifications, loadAdminNotifications, markAdminNotificationRead } from "@/lib/mock-admin-notifications"

export function AdminToast() {
  const [notifs, setNotifs] = useState(adminNotifications)

  useEffect(() => {
    loadAdminNotifications()
    setNotifs([...adminNotifications])
  }, [])

  const current = notifs.find((n) => !n.read)
  if (!current) return null

  const close = () => {
    markAdminNotificationRead(current.id)
    setNotifs([...adminNotifications])
  }

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded shadow flex items-start space-x-2">
      <span>{current.message}</span>
      <button onClick={close} className="ml-2">
        <X className="h-4 w-4" />
      </button>
    </div>
  )
}
