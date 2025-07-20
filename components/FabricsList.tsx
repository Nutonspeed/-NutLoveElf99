"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/buttons/button"
import { mockCoViewLog } from "@/lib/mock-co-view-log"
import FabricItem from "./FabricItem"
import { useCompare } from "@/contexts/compare-context"

interface Fabric {
  id: string
  slug: string | null
  name: string
  sku?: string | null
  image_url?: string | null
  image_urls?: string[] | null
}

export function FabricsList({ fabrics }: { fabrics: Fabric[] }) {
  const { items } = useCompare()
  const router = useRouter()

  const handleCompare = () => {
    router.push(`/compare`)
  }

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {fabrics.map((fabric, idx) => {
          const slug = fabric.slug || fabric.id
          const coViewed = mockCoViewLog[slug]?.length
          return (
            <FabricItem
              key={slug}
              fabric={fabric}
              index={idx}
              coViewed={coViewed}
            />
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
