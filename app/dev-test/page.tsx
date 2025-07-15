"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Badge } from "@/components/ui/badge"
import { resetMockDB } from "@/lib/reset-mock-db"
import { isDevMock, loadDevMode, setDevMode } from "@/lib/mock-settings"

export default function DevTestPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [devMode, setDevModeState] = useState(isDevMock)

  useEffect(() => {
    loadDevMode()
    setDevModeState(isDevMock)
    if (!isAuthenticated) {
      router.push("/login")
    } else if (user?.role !== "admin") {
      router.push("/")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "admin") return null

  const toggleDev = () => {
    const val = !devMode
    setDevMode(val)
    setDevModeState(val)
  }

  const handleReset = () => {
    resetMockDB()
    alert("รีเซ็ตข้อมูลแล้ว")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="space-y-4 max-w-sm w-full">
        <Card>
          <CardHeader>
            <CardTitle>โหมดนักพัฒนา</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Badge variant="secondary">{devMode ? "เปิดอยู่" : "ปิดอยู่"}</Badge>
            <Button onClick={toggleDev}>{devMode ? "ปิด Dev Mode" : "เปิด Dev Mode"}</Button>
          </CardContent>
        </Card>
        <Button variant="destructive" onClick={handleReset} className="w-full">
          รีเซ็ต Mock DB
        </Button>
      </div>
    </div>
  )
}
