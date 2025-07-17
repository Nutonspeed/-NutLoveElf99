"use client"
import { useState, useCallback } from "react"

export function useMockTooltipOnce(key: string) {
  const [open, setOpen] = useState(false)
  const trigger = useCallback(() => {
    if (typeof window === "undefined") return
    if (!sessionStorage.getItem(key)) {
      sessionStorage.setItem(key, "1")
      setOpen(true)
      setTimeout(() => setOpen(false), 1500)
    }
  }, [key])
  return { open, trigger, setOpen }
}
