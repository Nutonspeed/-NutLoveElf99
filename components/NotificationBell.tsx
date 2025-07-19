"use client"
import Link from "next/link"
import { Bell } from "lucide-react"
import { useNotifications } from "@/contexts/notifications-context"

export default function NotificationBell() {
  const { unreadCount } = useNotifications()
  return (
    <Link href="/dashboard/notifications" className="fixed right-4 top-4 z-40">
      <div className="relative">
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-white">
            {unreadCount}
          </span>
        )}
      </div>
    </Link>
  )
}
