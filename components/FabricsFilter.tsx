"use client"
import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { FabricsList } from "./FabricsList"

interface Fabric {
  id: string
  slug: string | null
  name: string
  sku?: string | null
  image_url?: string | null
  image_urls?: string[] | null
  tags?: string[]
  rating?: number
  recommended?: boolean
}

export function FabricsFilter({ fabrics }: { fabrics: Fabric[] }) {
  const [tag, setTag] = useState<string>("all")
  const tags = Array.from(new Set(fabrics.flatMap(f => f.tags || [])))
  const filtered = tag === "all" ? fabrics : fabrics.filter(f => f.tags?.includes(tag))

  return (
    <div className="space-y-4">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={tag === "all" ? "default" : "outline"}
            onClick={() => setTag("all")}
          >
            ทั้งหมด
          </Button>
          {tags.map(t => (
            <Button
              key={t}
              size="sm"
              variant={tag === t ? "default" : "outline"}
              onClick={() => setTag(t)}
            >
              {t}
            </Button>
          ))}
        </div>
      )}
      <FabricsList fabrics={filtered} />
    </div>
  )
}
