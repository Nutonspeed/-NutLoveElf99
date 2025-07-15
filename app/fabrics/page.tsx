import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FabricsList } from "@/components/FabricsList"
import Link from "next/link"
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
  tags?: string[]
  category?: string
}

export default async function FabricsPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  let fabrics: Fabric[] = []
  if (!supabase) {
    fabrics = mockFabrics.map((f) => ({
      id: f.id,
      slug: f.slug,
      name: f.name,
      sku: f.sku,
      image_urls: f.images,
      tags: f.tags,
      category: f.category,
    }))
  } else {
    const { data, error } = await supabase
      .from("fabrics")
      .select("id, slug, name, sku, image_url, image_urls, tags, category")

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

  const categories = Array.from(new Set(mockFabrics.map((f) => f.category)))

  if (searchParams.category) {
    fabrics = fabrics.filter((f) => f.category === searchParams.category)
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">แกลเลอรี่ลายผ้า</h1>
        <div className="flex flex-wrap gap-2 mb-6">
          <Link href="/fabrics" className="underline text-sm">
            ทั้งหมด
          </Link>
          {categories.map((c) => (
            <Link key={c} href={`/fabrics?category=${c}`} className="underline text-sm">
              {c}
            </Link>
          ))}
        </div>
        <FabricsList fabrics={fabrics} />
      </div>
      <Footer />
      <AnalyticsTracker event="ViewContent" />
    </div>
  )
}
