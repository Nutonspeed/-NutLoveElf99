import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FabricsList } from "@/components/FabricsList"
import type { Metadata } from "next"
import { supabase } from "@/lib/supabase"
import { fabrics } from "@/lib/mock-fabrics"
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
  let items: Fabric[] = []
  if (!supabase) {
    items = fabrics.map((f) => ({
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
    items = data as Fabric[]
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">แกลเลอรี่ลายผ้า</h1>
        <FabricsList fabrics={items} />
      </div>
      <Footer />
      <AnalyticsTracker event="ViewContent" />
    </div>
  )
}
