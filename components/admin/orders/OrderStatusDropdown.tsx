"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { orderStatusOptions, type OrderStatus } from "@/types/order"
import {
  getOrderStatusBadgeVariant,
  getOrderStatusText,
} from "@/lib/order-status"

interface OrderStatusDropdownProps {
  status: OrderStatus
  onChange: (status: OrderStatus) => void
}


export default function OrderStatusDropdown({ status, onChange }: OrderStatusDropdownProps) {
  return (
    <Select value={status} onValueChange={(v) => onChange(v as OrderStatus)}>
      <SelectTrigger className="w-32">
        <Badge variant={getOrderStatusBadgeVariant(status)}>
          {getOrderStatusText(status)}
        </Badge>
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
