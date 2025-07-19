"use client"
import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import { useNotifications } from "@/contexts/notifications-context"
import { getStatus } from "@/lib/mock-read-status"

export default function NotificationsPage() {
  const { notifications, markRead, markAllRead } = useNotifications()

  useEffect(() => {
    markAllRead()
  }, [])

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">ศูนย์แจ้งเตือน</h1>
      <Card>
        <CardHeader>
          <CardTitle>แจ้งเตือนทั้งหมด</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((n) => {
            const s = getStatus(n.id)
            return (
              <div key={n.id} className="flex items-start justify-between border-b pb-2 last:border-b-0">
                <div className="space-y-1">
                  <Link href={n.link} className="font-medium hover:underline">
                    {n.message}
                  </Link>
                  {!s.read && <Badge variant="destructive">ใหม่</Badge>}
                </div>
                {!s.read && (
                  <Button variant="outline" size="icon" onClick={() => markRead(n.id)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
