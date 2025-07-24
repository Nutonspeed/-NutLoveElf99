"use client"
import { Card, CardContent } from "@/components/ui/cards/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { fetchAnalyticsSummary } from "@/lib/mock/analytics"

export function RevenueSummaryCard() {
  const [total, setTotal] = useState<number | null>(null)
  useEffect(() => {
    fetchAnalyticsSummary().then((d) => setTotal(d.revenueToday))
  }, [])
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <p className="text-sm text-gray-600">รายได้วันนี้</p>
        {total === null ? (
          <Skeleton className="h-6 w-16 mx-auto" />
        ) : (
          <p className="text-2xl font-bold">฿{total.toLocaleString()}</p>
        )}
      </CardContent>
    </Card>
  )
}
