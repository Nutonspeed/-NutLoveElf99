"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/buttons/button"
import { useCompare } from "@/contexts/compare-context"
import { mockCoViewLog } from "@/lib/mock-co-view-log"

function highlightName(name: string, term: string) {
  if (!term) return name
  const regex = new RegExp(`(${term})`, 'gi')
  const parts = name.split(regex)
  return parts.map((part, i) =>
    regex.test(part) ? (
      <mark key={i} className="bg-yellow-200">
        {part}
      </mark>
    ) : (
      part
    ),
  )
}

interface Fabric {
  id: string
  slug: string | null
  name: string
  sku?: string | null
  image_url?: string | null
  image_urls?: string[] | null
  color?: string
  category?: string
  collectionSlug?: string
  badge?: 'new' | 'recommend'
}
interface Filters {
  colors?: string[]
  categories?: string[]
  collections?: string[]
  search?: string
}

export function FabricsList({ fabrics, ...filters }: { fabrics: Fabric[] } & Filters) {
  const { items, toggleCompare } = useCompare()
  const router = useRouter()

  const handleCompare = () => {
    router.push(`/compare`)
  }

  const search = filters.search?.toLowerCase() || ''
  const filtered = fabrics.filter(f => {
    const matchSearch = !search || f.name.toLowerCase().includes(search)
    const matchColor = !filters.colors || filters.colors.length === 0 || (f.color && filters.colors.includes(f.color))
    const matchCategory = !filters.categories || filters.categories.length === 0 || (f.category && filters.categories.includes(f.category))
    const matchCollection = !filters.collections || filters.collections.length === 0 || (f.collectionSlug && filters.collections.includes(f.collectionSlug))
    return matchSearch && matchColor && matchCategory && matchCollection
  })

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filtered.map((fabric) => {
          const slug = fabric.slug || fabric.id
          const checked = items.includes(slug)
          const coViewed = mockCoViewLog[slug]?.length
          return (
            <div
              key={slug}
              className="border rounded-lg overflow-hidden bg-white hover:shadow transition relative"
            >
              {coViewed && (
                <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                  ดูด้วยกันบ่อย
                </span>
              )}
              {fabric.badge && (
                <span className="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                  {fabric.badge === 'new' ? 'ใหม่' : 'แนะนำ'}
                </span>
              )}
              <Checkbox
                checked={checked}
                onCheckedChange={() => toggleCompare(slug)}
                className="absolute top-2 left-2 z-10 bg-white/80"
              />
              <Link href={`/fabrics/${slug}`}>
                <div className="relative aspect-square">
                  <Image
                    src={
                      fabric.image_urls?.[0] || fabric.image_url || "/placeholder.svg"
                    }
                    alt={fabric.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-2 text-center space-y-1">
                  <p className="font-medium line-clamp-2">
                    {highlightName(fabric.name, search)}
                  </p>
                  {fabric.sku && (
                    <p className="text-xs text-muted-foreground">{fabric.sku}</p>
                  )}
                </div>
              </Link>
            </div>
          )
        })}
      </div>
      {items.length > 1 && (
        <div className="mt-4 text-center">
          <Button onClick={handleCompare}>เปรียบเทียบตอนนี้</Button>
        </div>
      )}
      {filtered.length === 0 && (
        <p className="text-center text-sm text-muted-foreground mt-8">
          ไม่พบลายผ้าที่ตรงกับเงื่อนไข
        </p>
      )}
    </>
  )
}
