"use client"

import { createContext, useContext, type ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'

interface RecentProductsContextValue {
  recents: string[]
  addRecent: (slug: string) => void
}

const RecentProductsContext = createContext<RecentProductsContextValue | null>(null)

export function RecentProductsProvider({ children }: { children: ReactNode }) {
  const [recents, setRecents] = useLocalStorage<string[]>('recent-products', [])

  const addRecent = (slug: string) => {
    setRecents(prev => {
      const updated = [slug, ...prev.filter(s => s !== slug)]
      return updated.slice(0, 5)
    })
  }

  return (
    <RecentProductsContext.Provider value={{ recents, addRecent }}>
      {children}
    </RecentProductsContext.Provider>
  )
}

export function useRecentProducts() {
  const ctx = useContext(RecentProductsContext)
  if (!ctx) throw new Error('useRecentProducts must be used within RecentProductsProvider')
  return ctx
}
