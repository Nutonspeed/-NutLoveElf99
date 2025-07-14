"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { chatWelcome, loadChatWelcome, setChatWelcome } from "@/lib/mock-chat"

export default function AdminChatSettings() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [message, setMessage] = useState(chatWelcome)

  useEffect(() => {
    loadChatWelcome()
    setMessage(chatWelcome)
    if (!isAuthenticated) {
      router.push("/login")
    } else if (user?.role !== "admin") {
      router.push("/")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "admin") return null

  const handleSave = () => {
    setChatWelcome(message)
    alert("บันทึกแล้ว")
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
          <h1 className="text-3xl font-bold">ตั้งค่าข้อความแชท</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ข้อความต้อนรับ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input value={message} onChange={(e) => setMessage(e.target.value)} />
            <Button onClick={handleSave}>บันทึก</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
