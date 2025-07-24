"use client"
import { Card, CardContent } from "@/components/ui/cards/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { fetchAnalyticsSummary } from "@/lib/mock/analytics"

export function OrdersTodayCard() {
  const [count, setCount] = useState<number | null>(null)
  useEffect(() => {
    fetchAnalyticsSummary().then((d) => setCount(d.ordersToday))
  }, [])
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <p className="text-sm text-gray-600">ออเดอร์วันนี้</p>
        {count === null ? (
          <Skeleton className="h-6 w-10 mx-auto" />
        ) : (
          <p className="text-2xl font-bold">{count}</p>
        )}
      </CardContent>
    </Card>
  )
}
