"use client"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import {
  OrdersTodayCard,
  RevenueSummaryCard,
  UnpaidOrdersCard,
  ReadyToShipCard,
} from "./cards"

export default function AnalyticsContent() {
  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">สถิติร้าน</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <OrdersTodayCard />
        <RevenueSummaryCard />
        <UnpaidOrdersCard />
        <ReadyToShipCard />
      </div>
      <Link href="/admin/analytics/store-kpi">
        <Button variant="outline">ดู Store KPI</Button>
      </Link>
    </div>
  )
}
