import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { AnalyticsTracker } from "@/components/analytics-tracker"

interface Fabric {
  id: string
  name: string
  image_url?: string | null
  image_urls?: string[] | null
  price_min?: number | null
  price_max?: number | null
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  if (!supabase) return {}
  const { data } = await supabase.from("fabrics").select("name").eq("id", params.id).single()
  if (!data) return {}
  return {
    title: `${data.name} | SofaCover Pro`,
    description: `รายละเอียดลายผ้า ${data.name}`,
  }
}

export default async function FabricDetailPage({ params }: { params: { id: string } }) {
  if (!supabase) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-red-500">Supabase client not configured</div>
        <Footer />
      </div>
    )
  }

  const { data: fabric, error } = await supabase
    .from("fabrics")
    .select("id, name, image_url, image_urls, price_min, price_max")
    .eq("id", params.id)
    .single()

  if (error || !fabric) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4">
          <Link href="/fabrics" className="text-sm text-primary hover:underline">
            ← กลับไปหน้าลายผ้า
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative w-full aspect-square">
            <Image
              src={fabric.image_urls?.[0] || fabric.image_url || "/placeholder.svg"}
              alt={fabric.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{fabric.name}</h1>
            {fabric.price_min && fabric.price_max && (
              <p className="text-lg text-gray-700">
                ฿{fabric.price_min.toLocaleString()} - ฿{fabric.price_max.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <AnalyticsTracker event="ViewContent" />
    </div>
  )
}
