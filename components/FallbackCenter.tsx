import { type ReactNode } from "react"

interface FallbackCenterProps {
  icon?: ReactNode
  title?: string
  subtitle?: string
}

export default function FallbackCenter({
  icon = "🚧",
  title = "หน้านี้ยังไม่พร้อมใช้งาน",
  subtitle = "อยู่ระหว่างการพัฒนา เตรียมพบกันเร็ว ๆ นี้",
}: FallbackCenterProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center py-16 text-gray-500">
      <div className="text-5xl mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-sm">{subtitle}</p>
    </div>
  )
}
