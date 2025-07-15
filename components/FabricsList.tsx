"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/buttons/button"
import { useCompare } from "@/contexts/compare-context"
import { mockCoViewLog } from "@/lib/mock-co-view-log"
import { Dialog, DialogContent } from '@/components/ui/modals/dialog'

const colorMap: Record<string, string> = {
  "น้ำเงิน": "#1e3a8a",
  "เทา": "#4b5563",
  "ครีม": "#fef3c7",
  "กรม": "#1e40af",
  "ชมพู": "#f472b6",
  "ขาว": "#ffffff",
}

interface Fabric {
  id: string
  slug: string | null
  name: string
  sku?: string | null
  colors?: string[] | null
  type?: 'Solid' | 'Pattern' | 'Print'
  image_url?: string | null
  image_urls?: string[] | null
}

export function FabricsList({ fabrics }: { fabrics: Fabric[] }) {
  const { items, toggleCompare } = useCompare()
  const router = useRouter()
  const [zoomSrc, setZoomSrc] = useState<string | null>(null)

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
              <Link href={`/fabrics/${slug}`} onClick={(e) => e.stopPropagation()}>
                <div
                  className="relative aspect-square cursor-zoom-in"
                  onClick={(e) => {
                    e.preventDefault()
                    setZoomSrc(
                      fabric.image_urls?.[0] || fabric.image_url || '/placeholder.svg'
                    )
                  }}
                >
                  <Image
                    src={
                      fabric.image_urls?.[0] || fabric.image_url || '/placeholder.svg'
                    }
                    alt={fabric.name}
                    fill
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="/placeholder.svg"
                  />
                </div>
                <div className="p-2 text-center space-y-2">
                  <p className="font-medium line-clamp-2">{fabric.name}</p>
                  {fabric.colors && (
                    <div className="flex items-center justify-center space-x-1">
                      {fabric.colors.map((c) => (
                        <span
                          key={c}
                          className="h-4 w-4 rounded-full border"
                          style={{ backgroundColor: colorMap[c] || '#eee' }}
                          title={c}
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
      <Dialog open={!!zoomSrc} onOpenChange={() => setZoomSrc(null)}>
        <DialogContent className="max-w-3xl p-0 bg-transparent shadow-none">
          {zoomSrc && (
            <Image
              src={zoomSrc}
              alt="zoom"
              width={800}
              height={800}
              className="object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
