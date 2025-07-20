"use client"
import { Badge, type BadgeProps } from "@/components/ui/badge"
import type { ShippingStatus } from "@/types/order"
import { shippingStatusOptions } from "@/types/order"

export function getShippingStatusBadgeVariant(status: ShippingStatus): BadgeProps["variant"] {
  switch (status) {
    case "delivered":
      return "default"
    case "shipped":
      return "secondary"
    case "pending":
      return "outline"
    default:
      return "secondary"
  }
}

export default function ShippingStatusBadge({ status }: { status: ShippingStatus }) {
  const label = shippingStatusOptions.find(o => o.value === status)?.label || status
  return (
    <Badge variant={getShippingStatusBadgeVariant(status)}>{label}</Badge>
  )
}
