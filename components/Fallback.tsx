"use client"
import { ReactNode } from "react"
import { Loader2, AlertTriangle, Construction } from "lucide-react"

export type FallbackType = "loading" | "error" | "under-construction" | "404"

interface FallbackProps {
  type?: FallbackType
  title?: string
  subtitle?: string
}

export default function Fallback({
  type = "loading",
  title,
  subtitle,
}: FallbackProps) {
  let icon: ReactNode = null
  switch (type) {
    case "loading":
      icon = <Loader2 className="h-10 w-10 animate-spin" />
      title = title || "กำลังโหลดข้อมูล"
      break
    case "error":
      icon = <AlertTriangle className="h-10 w-10 text-destructive" />
      title = title || "เกิดข้อผิดพลาด"
      break
    case "under-construction":
      icon = <Construction className="h-10 w-10" />
      title = title || "อยู่ระหว่างการพัฒนา"
      break
    case "404":
      icon = <AlertTriangle className="h-10 w-10" />
      title = title || "ไม่พบข้อมูล"
      break
  }
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center space-y-2">
      {icon}
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  )
}
