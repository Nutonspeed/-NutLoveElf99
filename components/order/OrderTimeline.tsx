"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { OrderStatus } from "@/types/order"
import { orderStatusOptions } from "@/types/order"
import {
  getOrderStatusBadgeVariant,
  getOrderStatusText,
} from "@/lib/order-status"
import { format } from "date-fns"

interface TimelineEntry {
  timestamp: string
  status: OrderStatus
  note?: string
  updatedBy: string
}

interface OrderTimelineProps {
  timeline: TimelineEntry[]
  editable?: boolean
  onAddEntry?: (entry: TimelineEntry) => void
}


export function OrderTimeline({ timeline, editable = false, onAddEntry }: OrderTimelineProps) {
  const [status, setStatus] = useState<OrderStatus>(orderStatusOptions[0].value)
  const [note, setNote] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onAddEntry) {
      onAddEntry({
        status,
        note: note || undefined,
        timestamp: new Date().toISOString(),
        updatedBy: "admin@nutlove.co",
      })
      setNote("")
    }
  }

  const sorted = [...timeline].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )

  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {sorted.map((entry, i) => (
          <li key={i} className="flex items-start space-x-2">
            <span className="w-44 text-sm text-gray-500">
              {format(new Date(entry.timestamp), "dd MMM yyyy HH:mm")}
            </span>
            <Badge variant={getOrderStatusBadgeVariant(entry.status)}>
              {getOrderStatusText(entry.status)}
            </Badge>
            {entry.note && <span className="text-sm">{entry.note}</span>}
          </li>
        ))}
      </ul>
      {editable && (
        <form onSubmit={handleSubmit} className="flex items-end space-x-2">
          <div>
            <Label htmlFor="timeline-status">สถานะ</Label>
            <Select
              value={status}
              onValueChange={(v) => setStatus(v as OrderStatus)}
            >
              <SelectTrigger id="timeline-status" className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {orderStatusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Label htmlFor="timeline-note">หมายเหตุ</Label>
            <Input
              id="timeline-note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <Button type="submit">เพิ่ม</Button>
        </form>
      )}
    </div>
  )
}

export type { TimelineEntry, OrderTimelineProps }
