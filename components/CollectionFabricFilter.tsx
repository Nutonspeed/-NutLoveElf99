"use client"
import { useState } from "react"
import { FabricsList } from "./FabricsList"

interface Fabric {
  id: string
  slug: string | null
  name: string
  sku?: string | null
  images: string[]
  collectionSlug: string
  tags?: string[]
}

export function CollectionFabricFilter({ fabrics, tags }: { fabrics: Fabric[]; tags: string[] }) {
  const [active, setActive] = useState<string>("all")
  const filtered = active === "all" ? fabrics : fabrics.filter((f) => f.tags?.includes(active))
  return (
    <div className="space-y-4">
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            className={`px-3 py-1 rounded border text-sm ${active === "all" ? "bg-primary text-white" : ""}`}
            onClick={() => setActive("all")}
          >
            ทั้งหมด
          </button>
          {tags.map((t) => (
            <button
              key={t}
              className={`px-3 py-1 rounded border text-sm ${active === t ? "bg-primary text-white" : ""}`}
              onClick={() => setActive(t)}
            >
              {t}
            </button>
          ))}
        </div>
      )}
      <FabricsList fabrics={filtered} />
    </div>
  )
}
