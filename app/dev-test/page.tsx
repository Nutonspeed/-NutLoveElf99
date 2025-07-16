"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import { useState } from "react"
import {
  mockOrders,
} from "@/lib/mock-orders"
import { mockCustomers } from "@/lib/mock-customers"
import { mockBills } from "@/lib/mock-bills"
import { fastBills } from "@/lib/mock-fast-bills"
import { mockPromos } from "@/lib/mock-promos"
import { useToast } from "@/hooks/use-toast"

export default function DevTestPage() {
  const [uuid, setUuid] = useState<string>("")
  const { toast } = useToast()
  const summary = {
    orders: mockOrders.length,
    customers: mockCustomers.length,
    bills: mockBills.length,
    fastBills: fastBills.length,
    promos: mockPromos.length,
  }

  const generateUuid = () => {
    const id = crypto.randomUUID()
    setUuid(id)
    navigator.clipboard.writeText(id)
    toast({ title: "คัดลอก UUID แล้ว" })
  }

  const hasData = Object.values(summary).some((v) => v > 0)

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>สรุปข้อมูล Mock</CardTitle>
        </CardHeader>
        <CardContent>
          {hasData ? (
            <pre className="whitespace-pre-wrap break-all text-sm bg-gray-100 p-4 rounded">
              {JSON.stringify(summary, null, 2)}
            </pre>
          ) : (
            <p>ไม่มีข้อมูลจำลอง</p>
          )}
        </CardContent>
      </Card>
      <div className="space-y-2">
        <Button onClick={generateUuid}>สร้าง UUID</Button>
        {uuid && <p className="break-all text-sm">UUID: {uuid}</p>}
      </div>
    </div>
  )
}
