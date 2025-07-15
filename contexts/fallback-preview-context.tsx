"use client"
import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface FallbackPreviewState {
  enabled: boolean
  toggle: () => void
  reset: () => void
}

const FallbackPreviewContext = createContext<FallbackPreviewState | null>(null)

export function FallbackPreviewProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("fallbackPreview")
    if (stored === "on") setEnabled(true)
  }, [])

  useEffect(() => {
    localStorage.setItem("fallbackPreview", enabled ? "on" : "off")
  }, [enabled])

  const toggle = () => setEnabled(v => !v)
  const reset = () => setEnabled(false)

  return (
    <FallbackPreviewContext.Provider value={{ enabled, toggle, reset }}>
      {children}
    </FallbackPreviewContext.Provider>
  )
}

export function useFallbackPreview() {
  const ctx = useContext(FallbackPreviewContext)
  if (!ctx) throw new Error("useFallbackPreview must be used within FallbackPreviewProvider")
  return ctx
}
