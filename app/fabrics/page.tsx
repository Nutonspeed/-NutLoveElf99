import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FabricsList } from "@/components/FabricsList"
import type { Metadata } from "next"
import { supabase } from "@/lib/supabase"
import { mockFabrics } from "@/lib/mock-fabrics"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { FabricsFilters } from "@/components/FabricsFilters"

export const metadata: Metadata = {
  title: "แกลเลอรี่ลายผ้า | SofaCover Pro",
  description: "เลือกชมลายผ้าคลุมโซฟาที่เรามีให้บริการทั้งหมด",
}

interface Fabric {
  id: string
  slug: string | null
  name: string
  sku?: string | null
  color?: string | null
  category?: string | null
  collectionSlug?: string | null
  image_url?: string | null
  image_urls?: string[] | null
}

export default async function FabricsPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  let fabrics: Fabric[] = []
  if (!supabase) {
    fabrics = mockFabrics.map((f) => ({
      id: f.id,
      slug: f.slug,
      name: f.name,
      sku: f.sku,
      color: f.color,
      category: f.category,
      collectionSlug: f.collectionSlug,
      badge: f.badge,
      image_urls: f.images,
    }))
  } else {
    const { data, error } = await supabase
      .from("fabrics")
      .select("id, slug, name, sku, color, category, collection_slug, badge, image_url, image_urls")

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

  const q = typeof searchParams?.q === 'string' ? searchParams.q : ''
  const color = typeof searchParams?.color === 'string' ? searchParams.color.split(',') : []
  const category = typeof searchParams?.category === 'string' ? searchParams.category.split(',') : []
  const collection = typeof searchParams?.collection === 'string' ? searchParams.collection.split(',') : []

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">แกลเลอรี่ลายผ้า</h1>
        <FabricsFilters fabrics={fabrics} />
        <FabricsList
          fabrics={fabrics}
          search={q}
          colors={color}
          categories={category}
          collections={collection}
        />
      </div>
      <Footer />
      <AnalyticsTracker event="ViewContent" />
    </div>
  )
}
