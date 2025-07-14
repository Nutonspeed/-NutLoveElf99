"use client"

import { useAuth } from "@/contexts/auth-context"
import { isDevMock } from "@/lib/mock-settings"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import {
  mockOrders,
  regenerateMockOrders,
  resetMockOrders,
} from "@/lib/mock-orders"
import {
  mockCustomers,
  regenerateMockCustomers,
  resetMockCustomers,
} from "@/lib/mock-customers"

export default function AdminDevPage() {
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
  const handleClear = () => {
    resetMockOrders()
    resetMockCustomers()
    console.log("mockOrders", mockOrders)
    console.log("mockCustomers", mockCustomers)
  }

  const handleGenerate = () => {
    regenerateMockOrders()
    regenerateMockCustomers()
    console.log("mockOrders", mockOrders)
    console.log("mockCustomers", mockCustomers)
  }
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleClear}>
          ล้างข้อมูล
        </Button>
        <Button onClick={handleGenerate}>สร้างข้อมูลตัวอย่าง</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Diagnostic Info</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="whitespace-pre-wrap break-all text-sm bg-gray-100 p-4 rounded">
            {JSON.stringify({ isAuthenticated, user, lastOrder: mockOrders[mockOrders.length - 1] }, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}
