"use client"

import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useWishlist } from "@/contexts/wishlist-context"
import { mockFabrics } from "@/lib/mock-fabrics"
import { mockCollections } from "@/lib/mock-collections"

export default function WishlistPage() {
  const { wishlist } = useWishlist()

  const items = wishlist
    .map((slug) =>
      mockFabrics.find((f) => f.slug === slug && !f.hidden) ||
      mockCollections.find((c) => c.slug === slug),
    )
    .filter(Boolean) as (typeof mockFabrics[number] | typeof mockCollections[number])[]

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">รายการโปรด</h1>
        {items.length === 0 ? (
          <p className="text-center text-gray-600">ยังไม่มีรายการที่คุณสนใจ</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {items.map((item) => {
              const isFabric = (item as any).color !== undefined
              const slug = (item as any).slug
              const href = isFabric ? `/fabrics/${slug}` : `/collections/${slug}`
              const name = (item as any).name
              const image = (item as any).images[0] || "/placeholder.svg"
              return (
                <Link key={slug} href={href} className="border rounded-lg overflow-hidden bg-white hover:shadow transition">
                  <div className="relative aspect-square">
                    <Image src={image} alt={name} fill className="object-cover" />
                  </div>
                  <div className="p-2 text-center">
                    <p className="font-medium line-clamp-2">{name}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
