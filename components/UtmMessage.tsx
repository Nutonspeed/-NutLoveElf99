"use client"

import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { toast } from "@/hooks/use-toast"
import { useDebug } from "@/contexts/debug-context"

export function UtmMessage() {
  const params = useSearchParams()
  const { debug } = useDebug()
  useEffect(() => {
    const source = params.get("utm_source")
    if (!source) return
    if (debug) {
      toast({ title: "UTM", description: `utm_source=${source}` })
    } else {
      console.log("utm_source", source)
    }
  }, [params, debug])
  return null
}
