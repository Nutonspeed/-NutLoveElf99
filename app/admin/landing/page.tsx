"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { heroBanner, loadHeroBanner, setHeroBanner } from "@/lib/mock-hero-banner"

export default function AdminLandingPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [data, setData] = useState(heroBanner)

  useEffect(() => {
    loadHeroBanner()
    setData(heroBanner)
    if (!isAuthenticated) {
      router.push("/login")
    } else if (user?.role !== "admin") {
      router.push("/")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "admin") return null

  const handleSave = () => {
    setHeroBanner(data)
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
          <h1 className="text-3xl font-bold">ตั้งค่า Landing Page</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Hero Banner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              placeholder="หัวข้อ"
            />
            <Input
              value={data.subtitle}
              onChange={(e) => setData({ ...data, subtitle: e.target.value })}
              placeholder="คำอธิบาย"
            />
            <Input
              value={data.image}
              onChange={(e) => setData({ ...data, image: e.target.value })}
              placeholder="ลิงก์รูปภาพ"
            />
            <Button onClick={handleSave}>บันทึก</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
