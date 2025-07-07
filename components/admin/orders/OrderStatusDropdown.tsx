"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { orderStatusOptions, type OrderStatus } from "@/types/order"

interface OrderStatusDropdownProps {
  status: OrderStatus
  onChange: (status: OrderStatus) => void
}

function getStatusBadgeVariant(status: OrderStatus) {
  switch (status) {
    case "paid":
    case "delivered":
    case "completed":
      return "default"
    case "depositPaid":
    case "shipped":
    case "confirmed":
      return "secondary"
    case "pendingPayment":
    case "processing":
    case "draft":
      return "outline"
    case "cancelled":
    case "archived":
      return "destructive"
    default:
      return "outline"
  }
}

function getStatusText(status: OrderStatus) {
  const opt = orderStatusOptions.find((o) => o.value === status)
  return opt ? opt.label : status
}

export default function OrderStatusDropdown({ status, onChange }: OrderStatusDropdownProps) {
  return (
    <Select value={status} onValueChange={(v) => onChange(v as OrderStatus)}>
      <SelectTrigger className="w-32">
        <Badge variant={getStatusBadgeVariant(status)}>{getStatusText(status)}</Badge>
      </SelectTrigger>
      <SelectContent>
        {orderStatusOptions.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
