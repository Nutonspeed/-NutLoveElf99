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
  slug?: string | null
  name: string
  description?: string | null
  collection_id?: string | null
  image_url?: string | null
  image_urls?: string[] | null
  price_min?: number | null
  price_max?: number | null
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  if (!supabase) return {}
  const { data } = await supabase
    .from("fabrics")
    .select("name, description, image_url, image_urls")
    .or(`id.eq.${params.id},slug.eq.${params.id}`)
    .single()
  if (!data) return {}
  const title = `${data.name} | SofaCover Pro`
  const description = data.description || `รายละเอียดลายผ้า ${data.name}`
  const image = data.image_urls?.[0] || data.image_url || "/placeholder.svg"
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
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
    .select("id, slug, name, description, collection_id, image_url, image_urls, price_min, price_max")
    .or(`id.eq.${params.id},slug.eq.${params.id}`)
    .single()

  if (error || !fabric) {
    notFound()
  }

  let collection: { name: string; slug: string } | null = null
  if (fabric.collection_id) {
    const { data: col } = await supabase
      .from("collections")
      .select("name, slug")
      .eq("id", fabric.collection_id)
      .single()
    if (col) collection = col
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
            {collection && (
              <p className="text-gray-600">
                คอลเลกชัน:{" "}
                <Link href={`/collections/${collection.slug}`} className="underline">
                  {collection.name}
                </Link>
              </p>
            )}
            {fabric.description && <p className="text-gray-700 whitespace-pre-line">{fabric.description}</p>}
          </div>
        </div>
      </div>
      <Footer />
      <AnalyticsTracker event="ViewContent" />
    </div>
  )
}
