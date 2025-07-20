"use client"

import Image from "next/image"
import Link from "next/link"
import { Copy } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/buttons/button"
import { useCompare } from "@/contexts/compare-context"

interface Fabric {
  id: string
  slug: string | null
  name: string
  sku?: string | null
  image_url?: string | null
  image_urls?: string[] | null
}

export default function FabricItem({
  fabric,
  index,
  coViewed,
}: {
  fabric: Fabric
  index: number
  coViewed?: number
}) {
  const { items, toggleCompare } = useCompare()
  const slug = fabric.slug || fabric.id
  const checked = items.includes(slug)
  const copyText = `ลาย ${index + 1} - ${fabric.name}${fabric.sku ? ` (${fabric.sku})` : ""}`

  const handleCopy = () => {
    navigator.clipboard.writeText(copyText).catch(console.error)
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white hover:shadow transition relative">
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
            src={fabric.image_urls?.[0] || fabric.image_url || "/placeholder.svg"}
            alt={fabric.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-2 text-center">
          <p className="font-medium line-clamp-2">{fabric.name}</p>
        </div>
      </Link>
      <div className="absolute bottom-2 right-2">
        <Button variant="outline" size="icon" onClick={handleCopy} aria-label="copy fabric">
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
