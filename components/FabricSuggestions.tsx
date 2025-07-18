"use client"

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { fabrics } from '@/lib/mock-fabrics'
import { mockFabricSimilarity } from '@/lib/mock-fabric-similarity'
import { recordFabricClick, getFabricPreference } from '@/lib/mock-user-preference'

interface Props {
  slug: string
}

export function FabricSuggestions({ slug }: Props) {
  const [items, setItems] = useState<typeof fabrics>([])

  useEffect(() => {
    recordFabricClick(slug)
    const prefs = getFabricPreference()
    const similar = mockFabricSimilarity[slug] || []
    const list = fabrics.filter((f) => similar.includes(f.slug))
    list.sort((a, b) => (prefs[b.slug] || 0) - (prefs[a.slug] || 0))
    setItems(list.slice(0, 4))
  }, [slug])

  if (items.length === 0) return null

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">คุณอาจชอบลายนี้</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((f) => (
          <Link key={f.slug} href={`/fabrics/${f.slug}`}>\
            <div className="border rounded-lg overflow-hidden bg-white">
              <div className="relative aspect-square">
                <Image src={f.images[0]} alt={f.name} fill className="object-cover" />
              </div>
              <p className="p-2 text-center text-sm">{f.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
