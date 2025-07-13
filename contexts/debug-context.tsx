"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface DebugContextValue {
  debug: boolean
  setDebug: (v: boolean) => void
}

const DebugContext = createContext<DebugContextValue | null>(null)

export function DebugProvider({ children }: { children: ReactNode }) {
  const [debug, setDebug] = useLocalStorage("debug-mode", false)
  return (
    <DebugContext.Provider value={{ debug, setDebug }}>
      {children}
    </DebugContext.Provider>
  )
}

export function useDebug() {
  const ctx = useContext(DebugContext)
  if (!ctx) throw new Error("useDebug must be used within DebugProvider")
  return ctx
}
