"use client"

import { Heart } from 'lucide-react'
import { useFavorites } from '@/contexts/favorites-context'

export function FavoriteButton({ slug, className }: { slug: string; className?: string }) {
  const { favorites, toggleFavorite } = useFavorites()
  const active = favorites.includes(slug)

  return (
    <button
      onClick={() => toggleFavorite(slug)}
      aria-label="toggle favorite"
      className={className}
    >
      <Heart
        className={`h-6 w-6 ${active ? 'text-red-500' : 'text-gray-500'}`}
        fill={active ? 'currentColor' : 'none'}
      />
    </button>
  )
}
