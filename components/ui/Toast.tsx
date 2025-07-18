"use client"
import React from "react"
import { cn } from "@/lib/utils"

interface Props {
  variant?: "success" | "error" | "info"
  children: React.ReactNode
  className?: string
  duration?: number
  onDismiss?: () => void
}

export default function Toast({
  variant = "info",
  children,
  className,
  duration,
  onDismiss,
}: Props) {
  const color =
    variant === "success"
      ? "bg-green-600"
      : variant === "error"
      ? "bg-red-600"
      : "bg-blue-600"
  React.useEffect(() => {
    if (duration) {
      const t = setTimeout(() => {
        onDismiss?.()
      }, duration)
      return () => clearTimeout(t)
    }
  }, [duration, onDismiss])
  return (
    <div className={cn("rounded px-4 py-2 text-white", color, className)}>{children}</div>
  )
}
