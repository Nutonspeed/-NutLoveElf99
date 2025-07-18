import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FabricsList } from "@/components/FabricsList"
import { FabricCarousel } from "@/components/FabricCarousel"
import type { Metadata } from "next"
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
  image_url?: string | null
  image_urls?: string[] | null
}

export default async function FabricsPage() {
  let fabrics: Fabric[] = []
  if (!supabase) {
    fabrics = mockFabrics.map((f) => ({
      id: f.id,
      slug: f.slug,
      name: f.name,
      sku: f.sku,
      image_urls: f.images,
    }))
  } else {
    const { data, error } = await supabase
      .from("fabrics")
      .select("id, slug, name, sku, image_url, image_urls")

    if (error || !data) {
      return (
        <div className="min-h-screen">
          <Navbar />
          <div className="container mx-auto px-4 py-8 text-red-500">ไม่สามารถโหลดข้อมูลผ้าได้</div>
          <Footer />
        </div>
      )
    }
    fabrics = data as Fabric[]
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">แกลเลอรี่ลายผ้า</h1>
        <div className="mb-8">
          <FabricCarousel />
        </div>
        <FabricsList fabrics={fabrics} />
        {fabrics.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">ไม่พบลายผ้าในหมวดนี้</p>
          </div>
        )}
      </div>
      <Footer />
      <AnalyticsTracker event="ViewContent" />
    </div>
  )
}
