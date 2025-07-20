"use client"
import { Badge } from "@/components/ui/badge"
import type { ShippingStatus } from "@/types/order"
import { shippingStatusOptions } from "@/types/order"

export default function ShippingStatusBadge({ status }: { status: ShippingStatus }) {
  const label = shippingStatusOptions.find(s => s.value === status)?.label || status
  const color =
    status === "delivered" ? "bg-green-100 text-green-800" :
    status === "shipped" ? "bg-blue-100 text-blue-800" :
    "bg-gray-100 text-gray-800"
  return <Badge className={color}>{label}</Badge>
}
