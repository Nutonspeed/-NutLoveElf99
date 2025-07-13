"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pin, Eye } from "lucide-react"
import {
  mockNotifications,
  type Notification,
  loadNotifications,
} from "@/lib/mock-notifications"
import {
  loadNotificationStatus,
  getStatus,
  markRead,
  togglePin,
  markAllRead,
} from "@/lib/mock-read-status"

export default function NotificationCenter() {
  const [items, setItems] = useState<Notification[]>([])

  useEffect(() => {
    loadNotifications()
    loadNotificationStatus()
    setItems([...mockNotifications])
  }, [])

  const handleRead = (id: string) => {
    markRead(id)
    setItems([...mockNotifications])
  }

  const handlePin = (id: string) => {
    togglePin(id)
    setItems([...mockNotifications])
  }

  const markAll = () => {
    markAllRead(mockNotifications.map((n) => n.id))
    setItems([...mockNotifications])
  }

  const sorted = [...items].sort((a, b) => {
    const sa = getStatus(a.id)
    const sb = getStatus(b.id)
    if (sa.pinned && !sb.pinned) return -1
    if (!sa.pinned && sb.pinned) return 1
    return 0
  })

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>แจ้งเตือนทั้งหมด</CardTitle>
        <Button variant="outline" size="sm" onClick={markAll}>
          อ่านทั้งหมด
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {sorted.map((n) => {
          const s = getStatus(n.id)
          return (
            <div
              key={n.id}
              className="flex items-start justify-between border-b pb-2 last:border-b-0"
            >
              <div className="space-y-1">
                <Link href={n.link} className="font-medium hover:underline">
                  {n.message}
                </Link>
                {!s.read && <Badge variant="destructive">ใหม่</Badge>}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePin(n.id)}
                >
                  <Pin className={s.pinned ? "fill-current h-4 w-4" : "h-4 w-4"} />
                </Button>
                {!s.read && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRead(n.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
