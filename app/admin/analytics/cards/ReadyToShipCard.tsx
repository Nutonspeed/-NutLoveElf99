"use client"
import { Card, CardContent } from "@/components/ui/cards/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"
import { fetchAnalyticsSummary } from "@/lib/mock/analytics"

export function ReadyToShipCard() {
  const [count, setCount] = useState<number | null>(null)
  useEffect(() => {
    fetchAnalyticsSummary().then((d) => setCount(d.readyToShip))
  }, [])
  return (
    <Card>
      <CardContent className="p-4 text-center">
        <p className="text-sm text-gray-600">รอจัดส่ง</p>
        {count === null ? (
          <Skeleton className="h-6 w-8 mx-auto" />
        ) : (
          <p className="text-2xl font-bold">{count}</p>
        )}
      </CardContent>
    </Card>
  )
}
