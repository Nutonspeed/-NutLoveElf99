"use client"
import { cn } from "@/lib/utils"

export interface InlineStatusBadgeProps {
  status: "Pending" | "Paid" | "Cancelled"
  className?: string
}

export default function InlineStatusBadge({ status, className }: InlineStatusBadgeProps) {
  const color =
    status === "Paid"
      ? "bg-green-100 text-green-800"
      : status === "Cancelled"
      ? "bg-red-100 text-red-800"
      : "bg-yellow-100 text-yellow-800"
  return (
    <span className={cn("inline-flex rounded px-2 py-0.5 text-xs font-medium", color, className)}>
      {status}
    </span>
  )
}
