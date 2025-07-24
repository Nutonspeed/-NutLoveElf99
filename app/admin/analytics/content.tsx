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
    <div className="theme-soft-blush min-h-screen p-4 space-y-4">
      <h1 className="text-2xl font-bold">สถิติร้าน</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <OrdersTodayCard />
            <UnpaidOrdersCard />
            <ReadyToShipCard />
            <RevenueSummaryCard />
          </div>
          <Link href="/admin/bill/create">
            <Button className="w-full">Create Bill</Button>
          </Link>
          <Link href="/admin/analytics/store-kpi">
            <Button variant="outline" className="w-full">ดู Store KPI</Button>
          </Link>
          <Link href="/admin/alerts/pending-orders">
            <Button variant="outline" className="w-full">Alerts</Button>
          </Link>
        </div>
        <div className="space-y-2">
          <div className="border rounded p-4 bg-white text-center">
            <h2 className="font-semibold mb-2">Revenue Trend (Coming Soon)</h2>
            <div className="h-40 bg-gray-100 rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}
