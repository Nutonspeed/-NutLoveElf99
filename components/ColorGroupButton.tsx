"use client"

import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { mockFabrics } from "@/lib/mock-fabrics"
import { mockFabricSimilarity } from "@/lib/mock-fabric-similarity"

const colorMap: Record<string, string> = {
  "ครีม": "Earth Tone",
  "เทา": "Earth Tone",
  "น้ำเงิน": "Navy Series",
  "กรม": "Navy Series",
  "ชมพู": "Pastel",
}

export function ColorGroupButton({ slug }: { slug: string }) {
  const [group, setGroup] = useState<string | null>(null)

  const handleClick = () => {
    const fabricMap: Record<string, { color: string }> = {}
    mockFabrics.forEach(f => {
      fabricMap[f.slug] = f
    })

    const similar = mockFabricSimilarity[slug] || []
    const slugs = [slug, ...similar]
    const counts: Record<string, number> = {}
    slugs.forEach(s => {
      const color = fabricMap[s]?.color
      const label = colorMap[color]
      if (label) counts[label] = (counts[label] || 0) + 1
    })

    let selected: string | null = null
    let max = 0
    for (const [label, c] of Object.entries(counts)) {
      if (c > max) {
        max = c
        selected = label
      }
    }

    if (selected && max >= 2) {
      setGroup(selected)
    } else {
      setGroup("")
    }
  }

  return (
    <div className="space-y-2">
      <Button onClick={handleClick} size="sm">จัดกลุ่มอัตโนมัติ</Button>
      {group !== null && (
        group ? (
          <div className="text-sm text-green-600">กลุ่มสี: {group}</div>
        ) : (
          <div className="text-sm text-destructive">ไม่สามารถจับกลุ่มสีให้ผ้านี้ได้</div>
        )
      )}
    </div>
  )
}
