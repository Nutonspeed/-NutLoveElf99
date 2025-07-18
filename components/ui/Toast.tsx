"use client"
import { cn } from "@/lib/utils"

interface Props {
  variant?: "success" | "error" | "info"
  children: React.ReactNode
  className?: string
}

export default function Toast({ variant = "info", children, className }: Props) {
  const color =
    variant === "success"
      ? "bg-green-600"
      : variant === "error"
      ? "bg-red-600"
      : "bg-blue-600"
  return (
    <div className={cn("rounded px-4 py-2 text-white", color, className)}>{children}</div>
  )
}
