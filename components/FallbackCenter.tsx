import Link from "next/link"
import { AlertCircle, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FallbackCenterProps {
  icon?: LucideIcon
  title?: string
  subtitle?: string
  href?: string
}

export default function FallbackCenter({
  icon: Icon = AlertCircle,
  title = "Coming soon",
  subtitle,
  href = "/",
}: FallbackCenterProps) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="space-y-4 text-center">
        <Icon className="mx-auto h-10 w-10 text-gray-400" />
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && <p className="text-gray-500">{subtitle}</p>}
        {href && (
          <Link href={href}>
            <Button>กลับหน้าแรก</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
