"use client"

import { Heart } from "lucide-react"
import { useWishlist } from "@/contexts/wishlist-context"

export function WishlistButton({ slug }: { slug: string }) {
  const { wishlist, toggleWishlist } = useWishlist()
  const active = wishlist.includes(slug)

  return (
    <button onClick={() => toggleWishlist(slug)} aria-label="toggle wishlist">
      <Heart
        className={`h-6 w-6 ${active ? "text-red-500" : "text-gray-500"}`}
        fill={active ? "currentColor" : "none"}
      />
    </button>
  )
}
