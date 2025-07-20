"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useRecentProducts } from '@/contexts/recent-products-context'
import { mockProducts } from '@/lib/mock-products'
import { Card, CardContent } from '@/components/ui/cards/card'

export function RecentProductsSection() {
  const { recents } = useRecentProducts()
  const products = recents
    .map(slug => mockProducts.find(p => p.slug === slug))
    .filter(Boolean) as typeof mockProducts

  if (products.length === 0) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">สินค้าที่คุณดูล่าสุด</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(p => (
            <Card key={p!.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <Link href={`/products/${p!.slug}`}>\
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={p!.images[0] || '/placeholder.svg'}
                      alt={p!.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold line-clamp-2 mb-2">{p!.name}</h3>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-primary">฿{p!.price.toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
