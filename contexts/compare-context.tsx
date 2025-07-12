"use client"

import { createContext, useContext, type ReactNode } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

interface CompareContextValue {
  items: string[]
  toggleCompare: (slug: string) => void
  clear: () => void
}

const CompareContext = createContext<CompareContextValue | null>(null)

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<string[]>("compare", [])

  const toggleCompare = (slug: string) => {
    setItems((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug)
      if (prev.length >= 3) return prev
      return [...prev, slug]
    })
  }

  const clear = () => setItems([])

  return (
    <CompareContext.Provider value={{ items, toggleCompare, clear }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const ctx = useContext(CompareContext)
  if (!ctx) throw new Error("useCompare must be used within CompareProvider")
  return ctx
}
