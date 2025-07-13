"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  loadAutoMessage,
  autoMessage,
  setAutoMessage,
  loadSocialLinks,
  socialLinks,
  setSocialLinks,
} from "@/lib/mock-settings"

export default function SettingsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [message, setMessage] = useState(autoMessage)
  const [links, setLinks] = useState(socialLinks)

  useEffect(() => {
    loadAutoMessage()
    loadSocialLinks()
    setMessage(autoMessage)
    setLinks(socialLinks)
    if (!isAuthenticated) {
      router.push("/login")
    } else if (user?.role !== "admin") {
      router.push("/")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "admin") return null

  const handleSave = () => {
    setAutoMessage(message)
    setSocialLinks(links)
    alert("บันทึกข้อความแล้ว")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ตั้งค่าข้อความหลังชำระเงิน</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ข้อความขอบคุณ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
            <Button onClick={handleSave}>บันทึก</Button>
          </CardContent>
        </Card>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>ลิงก์ Social</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={links.facebook}
              onChange={(e) => setLinks({ ...links, facebook: e.target.value })}
              placeholder="Facebook Page URL"
            />
            <Input
              value={links.line}
              onChange={(e) => setLinks({ ...links, line: e.target.value })}
              placeholder="Line URL"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
