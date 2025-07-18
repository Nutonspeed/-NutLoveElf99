"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { useFavorites } from '@/contexts/favorites-context'
import { fabrics } from '@/lib/mock-fabrics'

export default function FavoritesPage() {
  const { favorites } = useFavorites()
  const items = fabrics.filter(f => favorites.includes(f.slug))

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">ผ้าที่คุณชอบ</h1>
        {items.length === 0 ? (
          <p className="text-center text-gray-600">ยังไม่มีรายการที่ถูกใจ</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {items.map((f) => (
              <Link key={f.slug} href={`/fabrics/${f.slug}`} className="border rounded-lg overflow-hidden bg-white hover:shadow transition">
                <div className="relative aspect-square">
                  <Image src={f.images[0] || '/placeholder.svg'} alt={f.name} fill className="object-cover" />
                </div>
                <div className="p-2 text-center">
                  <p className="font-medium line-clamp-2">{f.name}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
