"use client"

import { Heart } from "lucide-react"
import { useWishlist } from "@/contexts/wishlist-context"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function WishlistButton({ slug }: { slug: string }) {
  const { wishlist, toggleWishlist } = useWishlist()
  const active = wishlist.includes(slug)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true)
    const timer = setTimeout(() => setAnimate(false), 1000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <button onClick={() => toggleWishlist(slug)} aria-label="toggle wishlist">
      <Heart
        className={cn(
          "h-6 w-6",
          active ? "text-red-500" : "text-gray-500",
          animate && "animate-[pulse_1s_ease-in-out]"
        )}
        fill={active ? "currentColor" : "none"}
      />
    </button>
  )
}
