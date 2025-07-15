"use client"

import { createContext, useContext, type ReactNode } from 'react'
import { useLocalStorage } from '@/hooks/use-local-storage'

interface FavoritesContextValue {
  favorites: string[]
  counts: Record<string, number>
  toggleFavorite: (slug: string) => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    'favFabrics',
    [],
  )
  const [counts, setCounts] = useLocalStorage<Record<string, number>>(
    'favFabricCounts',
    {},
  )

  const toggleFavorite = (slug: string) => {
    setFavorites(prev => {
      if (prev.includes(slug)) return prev.filter(s => s !== slug)
      setCounts(c => ({ ...c, [slug]: (c[slug] || 0) + 1 }))
      return [...prev, slug]
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, counts, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
