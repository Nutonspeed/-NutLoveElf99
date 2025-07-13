"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Settings } from "lucide-react"
import NotificationCenter from "@/components/NotificationCenter"

export default function AdminNotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">ศูนย์รวมแจ้งเตือน</h1>
          </div>
          <Link href="/admin/notifications/settings">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              ตั้งค่า
            </Button>
          </Link>
        </div>
        <NotificationCenter />
      </div>
    </div>
  )
}
