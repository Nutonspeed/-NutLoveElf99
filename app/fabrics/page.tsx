"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FabricsList } from "@/components/FabricsList"
import { useState } from "react"
import type { Metadata } from "next"
import { useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { mockFabrics } from "@/lib/mock-fabrics"
import { AnalyticsTracker } from "@/components/analytics-tracker"

export const metadata: Metadata = {
  title: "แกลเลอรี่ลายผ้า | SofaCover Pro",
  description: "เลือกชมลายผ้าคลุมโซฟาที่เรามีให้บริการทั้งหมด",
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

export default function FabricsPage() {
  const [fabrics, setFabrics] = useState<Fabric[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  useEffect(() => {
    const load = async () => {
      if (!supabase) {
        setFabrics(mockFabrics)
        return
      }
      const { data } = await supabase
        .from('fabrics')
        .select('id, slug, name, sku, colors, type, image_url, image_urls')
      if (data) setFabrics(data as Fabric[])
    }
    load()
  }, [])

  const colors = [...new Set(fabrics.flatMap((f) => f.colors || []))]
  const filtered =
    selectedColors.length === 0
      ? fabrics
      : fabrics.filter((f) => f.colors?.some((c) => selectedColors.includes(c)))

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">แกลเลอรี่ลายผ้า</h1>
        {colors.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {colors.map((c) => (
              <label key={c} className="flex items-center space-x-1 text-sm">
                <input
                  type="checkbox"
                  checked={selectedColors.includes(c)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedColors([...selectedColors, c])
                    } else {
                      setSelectedColors(selectedColors.filter((cl) => cl !== c))
                    }
                  }}
                />
                <span>{c}</span>
              </label>
            ))}
          </div>
        )}
        <FabricsList fabrics={filtered} />
      </div>
      <Footer />
      <AnalyticsTracker event="ViewContent" />
    </div>
  )
}
