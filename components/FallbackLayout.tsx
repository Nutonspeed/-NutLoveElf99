"use client"
import { ReactNode } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import FallbackCenter from "./FallbackCenter"

export default function FallbackLayout({
  children,
  mobileOnly = false,
  icon,
  title,
  subtitle,
}: {
  children?: ReactNode
  mobileOnly?: boolean
  icon?: ReactNode
  title?: string
  subtitle?: string
}) {
  const isMobile = useIsMobile()

  if (mobileOnly && !isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FallbackCenter icon={icon} title={title} subtitle={subtitle} />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {children ?? (
        <FallbackCenter icon={icon} title={title} subtitle={subtitle} />
      )}
    </div>
  )
}
