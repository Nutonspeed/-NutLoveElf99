"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { OrderTimelineEntry, OrderStatus } from "@/types/order"
import { orderStatusOptions } from "@/types/order"

interface OrderTimelineProps {
  timeline: OrderTimelineEntry[]
  showAdmin?: boolean
  title?: string
}

const getStatusText = (status: OrderStatus) => {
  const opt = orderStatusOptions.find((o) => o.value === status)
  return opt ? opt.label : status
}

export default function OrderTimeline({ timeline, showAdmin = true, title = "ไทม์ไลน์" }: OrderTimelineProps) {
  const items = [...timeline].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="relative border-l pl-4 space-y-6">
          {items.map((item, idx) => (
            <li key={idx} className="ml-4">
              <div className="absolute -left-1.5 w-3 h-3 bg-primary rounded-full" />
              <p className="text-sm text-gray-500">
                {new Date(item.date).toLocaleString("th-TH")}
              </p>
              <p className="font-medium">{getStatusText(item.status)}</p>
              {item.note && <p className="text-sm text-gray-600">{item.note}</p>}
              {showAdmin && item.admin && (
                <p className="text-xs text-gray-400">{item.admin}</p>
              )}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  )
}

