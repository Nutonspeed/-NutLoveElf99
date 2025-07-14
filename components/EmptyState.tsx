import { ReactNode } from "react"
import FallbackCenter from "./FallbackCenter"

export default function EmptyState({
  icon = "📭",
  title = "ไม่พบข้อมูล",
  subtitle = "",
}: {
  icon?: ReactNode
  title?: string
  subtitle?: string
}) {
  return <FallbackCenter icon={icon} title={title} subtitle={subtitle} />
}
