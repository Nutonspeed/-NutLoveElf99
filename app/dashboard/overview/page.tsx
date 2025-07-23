"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Switch } from "@/components/ui/switch"
import { orders } from "@/mock/orders"
import { mockBills } from "@/mock/bills"
import { shippingOrders } from "@/mock/shipping"

export default function DashboardOverviewPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [devPreview, setDevPreview] = useState(searchParams.get("preview") === "1")

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (devPreview) {
      params.set("preview", "1")
    } else {
      params.delete("preview")
    }
    router.replace(`?${params.toString()}`, { scroll: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [devPreview])

  const totalOrders = orders.length
  const pendingPayments = mockBills.filter(b => b.status !== "paid").length
  const returns = shippingOrders.filter(o => o.status === "ตีกลับ").length

  return (
    <div className="container mx-auto space-y-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ภาพรวม</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm">Dev Preview</span>
          <Switch checked={devPreview} onCheckedChange={setDevPreview} />
        </div>
      </div>
      {devPreview && (
        <p className="text-sm text-muted-foreground">Developer preview mode enabled.</p>
      )}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>ออเดอร์ทั้งหมด</CardTitle>
          </CardHeader>
          <CardContent>{totalOrders}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ค้างชำระ</CardTitle>
          </CardHeader>
          <CardContent>{pendingPayments}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>ตีกลับ</CardTitle>
          </CardHeader>
          <CardContent>{returns}</CardContent>
        </Card>
      </div>
    </div>
  )
}
