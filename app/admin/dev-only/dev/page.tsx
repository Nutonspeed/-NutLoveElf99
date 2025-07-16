"use client"

import { useAuth } from "@/contexts/auth-context"
import { isDevMock, supabaseDown, loadSupabaseDown, setSupabaseDown } from "@/lib/mock-settings"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import { Checkbox } from "@/components/ui/checkbox"
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
  const [isOffline, setIsOffline] = useState(supabaseDown)

  useEffect(() => {
    loadSupabaseDown()
    setIsOffline(supabaseDown)
  }, [])
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

  const toggleOffline = (val: boolean) => {
    setIsOffline(val)
    setSupabaseDown(val)
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
      <div className="flex items-center space-x-2">
        <Checkbox
          id="offline"
          checked={isOffline}
          onCheckedChange={(v) => toggleOffline(Boolean(v))}
        />
        <label htmlFor="offline">จำลองกรณี Supabase ล่ม</label>
        {isOffline && (
          <Button variant="outline" size="sm" onClick={() => toggleOffline(false)}>
            รีเซตโหมด
          </Button>
        )}
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
