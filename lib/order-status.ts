import type { OrderStatus } from "@/types/order"
import type { BadgeProps } from "@/components/ui/badge"
import { orderStatusOptions } from "@/types/order"

export function getOrderStatusText(status: string | OrderStatus): string {
  const opt = orderStatusOptions.find((o) => o.value === status)
  return opt ? opt.label : "Unknown"
}

export function getOrderStatusBadgeVariant(
  status: string | OrderStatus,
): BadgeProps["variant"] {
  switch (status) {
    case "paid":
    case "delivered":
    case "completed":
    case "done":
      return "default"
    case "depositPaid":
    case "shipped":
    case "confirmed":
    case "producing":
    case "packed":
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
