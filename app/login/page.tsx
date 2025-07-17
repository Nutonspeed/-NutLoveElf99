"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/inputs/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { mockUsers } from "@/lib/mock-users"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const success = await login(email, password)
      if (success) {
        const userData = mockUsers.find((u) => u.email === email)
        if (userData?.role === "admin") {
          router.push("/admin/dashboard")
        } else {
          router.push("/")
        }
      } else {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง")
      }
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเข้าสู่ระบบ")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mb-4">
            <span className="text-white font-bold text-lg">SC</span>
          </div>
          <CardTitle className="text-2xl font-bold">เข้าสู่ระบบ</CardTitle>
          <p className="text-gray-600">ยินดีต้อนรับกลับสู่ SofaCover Pro</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">อีเมล</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">รหัสผ่าน</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="รหัสผ่านของคุณ"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">
              ลืมรหัสผ่าน?
            </Link>

            <div className="text-sm text-gray-600">
              ยังไม่มีบัญชี?{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                สมัครสมาชิก
              </Link>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium mb-2">ทดสอบระบบ:</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>
                <strong>Admin:</strong> admin@sofacover.com / password
              </p>
              <p>
                <strong>Staff:</strong> staff@sofacover.com / password
              </p>
              <p>
                <strong>Limited:</strong> limited@sofacover.com / password
              </p>
              <p>
                <strong>Customer:</strong> john@example.com / password
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
