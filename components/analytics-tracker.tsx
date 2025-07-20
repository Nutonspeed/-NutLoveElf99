"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { isPixelEnabled } from "@/lib/system-config"

export function AnalyticsTracker({ event = "PageView" }: { event?: string }) {
  const searchParams = useSearchParams()
  useEffect(() => {
    const utm: Record<string, string | null> = {
      utm_source: searchParams.get("utm_source"),
      utm_medium: searchParams.get("utm_medium"),
      utm_campaign: searchParams.get("utm_campaign"),
    }
    // Placeholder for sending UTM data to analytics service
    console.debug("UTM", utm)

    if (
      isPixelEnabled() &&
      typeof window !== "undefined" &&
      typeof (window as any).fbq === "function"
    ) {
      ;(window as any).fbq("track", event)
    }
  }, [searchParams, event])
  return null
}
