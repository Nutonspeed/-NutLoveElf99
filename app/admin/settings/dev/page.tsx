"use client"
import { useAuth } from "@/contexts/auth-context"
import { isDevMock } from "@/lib/mock-settings"
import { resetAllMockData } from "@/lib/reset-mocks"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DevSettingsPage() {
  const { user, isAuthenticated } = useAuth()

  if (!isDevMock) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>ไม่อนุญาต</p>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>ไม่มีสิทธิ์เข้าถึง</p>
      </div>
    )
  }

  const handleReset = () => {
    if (typeof window === 'undefined') return
    if (!window.confirm('Reset mock data?')) return
    if (!window.confirm('Confirm again')) return
    resetAllMockData()
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Dev Tools</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={handleReset}>Reset All Mock Data</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
