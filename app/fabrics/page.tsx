import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FabricsList } from "@/components/FabricsList"
import type { Metadata } from "next"
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
  const fabrics: Fabric[] = mockFabrics.map((f) => ({
    id: f.id,
    slug: f.slug,
    name: f.name,
    sku: f.sku,
    image_urls: f.images,
  }))

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">แกลเลอรี่ลายผ้า</h1>
        <FabricsList fabrics={fabrics} />
      </div>
      <Footer />
      <AnalyticsTracker event="ViewContent" />
    </div>
  )
}
