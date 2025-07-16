"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/buttons/button"
import { useCompare } from "@/contexts/compare-context"
import { mockCoViewLog } from "@/lib/mock-co-view-log"
import { Star } from "lucide-react"

interface Fabric {
  id: string
  slug: string | null
  name: string
  sku?: string | null
  image_url?: string | null
  image_urls?: string[] | null
  rating?: number
  recommended?: boolean
}

export function FabricsList({ fabrics }: { fabrics: Fabric[] }) {
  const { items, toggleCompare } = useCompare()
  const router = useRouter()

  const handleCompare = () => {
    router.push(`/compare`)
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {fabrics.map((fabric) => {
          const slug = fabric.slug || fabric.id
          const checked = items.includes(slug)
          const coViewed = mockCoViewLog[slug]?.length
          return (
            <div
              key={slug}
              className="border rounded-lg overflow-hidden bg-white hover:shadow transition relative"
            >
              {fabric.recommended && (
                <span className="absolute top-2 right-2 bg-yellow-400 text-white text-xs px-2 py-1 rounded">
                  ⭐ แนะนำ
                </span>
              )}
              {coViewed && (
                <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                  ดูด้วยกันบ่อย
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
                  <p className="font-medium line-clamp-2">{fabric.name}</p>
                  {fabric.rating && (
                    <div className="flex items-center justify-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < (fabric.rating || 0) ? 'fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
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
    </>
  )
}
