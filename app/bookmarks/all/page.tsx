"use client"

import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { mockBookmarks, Bookmark } from '@/lib/mock-bookmark'
import { mockFabrics } from '@/lib/mock-fabrics'
import { mockOrders } from '@/lib/mock-orders'

interface BookmarkView {
  href: string
  name: string
  image?: string
  type: Bookmark['type']
}

export default function AllBookmarksPage() {
  const items: BookmarkView[] = mockBookmarks
    .map((b) => {
      if (b.type === 'fabric') {
        const f = mockFabrics.find((f) => f.slug === b.ref)
        return f
          ? {
              href: `/fabrics/${f.slug}`,
              name: f.name,
              image: f.images[0],
              type: 'fabric' as const,
            }
          : null
      }
      if (b.type === 'order') {
        const o = mockOrders.find((o) => o.id === b.ref)
        return o
          ? {
              href: `/orders/${o.id}`,
              name: `คำสั่งซื้อ ${o.id}`,
              type: 'order' as const,
            }
          : null
      }
      // chat bookmark just links to chat page
      return {
        href: '/chat',
        name: 'แชท',
        type: 'chat' as const,
      }
    })
    .filter(Boolean) as BookmarkView[]

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">บุ๊กมาร์กทั้งหมด</h1>
        {items.length === 0 ? (
          <p className="text-center text-gray-600">ยังไม่มีรายการที่ถูกบันทึกไว้</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border rounded-lg overflow-hidden bg-white hover:shadow transition flex"
              >
                {item.image && (
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                )}
                <div className="p-4 flex-1">
                  <p className="font-medium mb-1">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.type === 'fabric' && 'ผ้า'}
                    {item.type === 'order' && 'คำสั่งซื้อ'}
                    {item.type === 'chat' && 'แชท'}
                  </p>
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
