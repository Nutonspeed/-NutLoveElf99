"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/buttons/button"
import { useCompare } from "@/contexts/compare-context"
import { useToast } from "@/hooks/use-toast"
import { mockCoViewLog } from "@/lib/mock-co-view-log"
import { CompareModal } from "./CompareModal"
import { mockFabrics } from "@/lib/mock-fabrics"

interface Fabric {
  id: string
  slug: string | null
  name: string
  sku?: string | null
  image_url?: string | null
  image_urls?: string[] | null
}

export function FabricsList({ fabrics }: { fabrics: Fabric[] }) {
  const { items, toggleCompare } = useCompare()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const handleCompare = () => {
    if (items.length < 2) {
      toast({ title: "กรุณาเลือกอย่างน้อย 2 ลายผ้า" })
    } else {
      setOpen(true)
    }
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
              <label className="absolute top-2 left-2 z-10 bg-white/80 flex items-center gap-1 px-1 rounded">
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggleCompare(slug)}
                />
                <span className="text-xs">เปรียบเทียบผ้า</span>
              </label>
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
                <div className="p-2 text-center">
                  <p className="font-medium line-clamp-2">{fabric.name}</p>
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
      <CompareModal
        open={open}
        onOpenChange={setOpen}
        fabrics={mockFabrics.filter((f) => items.includes(f.slug))}
      />
    </>
  )
}
