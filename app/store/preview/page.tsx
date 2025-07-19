"use client"
import { useEffect, useState } from 'react'
import { getConfig } from '@/core/mock/store'
import type { LayoutComponent } from '@/types/storefront'
import { HeroBannerSection } from '@/components/HeroBannerSection'
import { Footer } from '@/components/footer'

function renderItem(item: LayoutComponent) {
  switch (item.type) {
    case 'banner':
      return <HeroBannerSection key={item.id} />
    case 'product':
      return (
        <section key={item.id} className="p-8 text-center bg-gray-50">
          Product List (mock)
        </section>
      )
    case 'cta':
      return (
        <section key={item.id} className="p-8 text-center bg-blue-600 text-white">
          CTA Section (mock)
        </section>
      )
    case 'review':
      return (
        <section key={item.id} className="p-8 text-center bg-gray-100">
          Review Section (mock)
        </section>
      )
    default:
      return null
  }
}

export default function StorePreviewPage() {
  const [layout, setLayout] = useState<LayoutComponent[]>([])

  useEffect(() => {
    const cfg = getConfig()
    setLayout(cfg.layout)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      {layout.map(renderItem)}
      <Footer />
    </div>
  )
}
