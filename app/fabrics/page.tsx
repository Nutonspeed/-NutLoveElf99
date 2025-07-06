import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { supabase } from "@/lib/supabase"
import { AnalyticsTracker } from "@/components/analytics-tracker"

export const metadata: Metadata = {
  title: "แกลเลอรี่ลายผ้า | SofaCover Pro",
  description: "เลือกชมลายผ้าคลุมโซฟาที่เรามีให้บริการทั้งหมด",
}

interface Fabric {
  id: string
  slug: string | null
  name: string
  image_url?: string | null
  image_urls?: string[] | null
}

export default async function FabricsPage() {
  if (!supabase) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-red-500">Supabase client not configured</div>
        <Footer />
      </div>
    )
  }

  const { data: fabrics, error } = await supabase
    .from("fabrics")
    .select("id, slug, name, image_url, image_urls")

  if (error || !fabrics) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-red-500">ไม่สามารถโหลดข้อมูลผ้าได้</div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">แกลเลอรี่ลายผ้า</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {fabrics.map((fabric: Fabric) => (
            <Link
              key={fabric.id}
              href={`/fabrics/${fabric.slug || fabric.id}`}
              className="border rounded-lg overflow-hidden bg-white hover:shadow transition"
            >
              <div className="relative aspect-square">
                <Image
                  src={
                    fabric.image_urls?.[0] || fabric.image_url || "/placeholder.svg"
                  }
                  alt={fabric.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2 text-center">
                <p className="font-medium line-clamp-2">{fabric.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
      <AnalyticsTracker event="ViewContent" />
    </div>
  )
}
