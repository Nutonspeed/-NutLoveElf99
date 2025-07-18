import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import Link from "next/link"
import { WishlistButton } from "@/components/WishlistButton"
import { FavoriteButton } from "@/components/FavoriteButton"
import type { Metadata } from "next"
import { supabase } from "@/lib/supabase"
import { fabrics } from "@/lib/mock-fabrics"
import { notFound } from "next/navigation"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { MessageSquare, Share2, Receipt } from "lucide-react"
import { CopyToClipboardButton } from "@/components/CopyToClipboardButton"
import { FabricSuggestions } from "@/components/FabricSuggestions"
import { FabricVariantDropdown } from "@/components/FabricVariantDropdown"

interface Fabric {
  id: string
  slug: string | null
  name: string
  sku?: string | null
  description?: string | null
  size?: string | null
  collection_id?: string | null
  image_url?: string | null
  image_urls?: string[] | null
  price_min?: number | null
  price_max?: number | null
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  if (!supabase) {
    const fabric = fabrics.find((f) => f.slug === params.slug)
    if (!fabric) return {}
    const title = `${fabric.name} | SofaCover Pro`
    const description = `รายละเอียดลายผ้า ${fabric.name}`
    const image = fabric.images[0]
    return {
      title,
      description,
      openGraph: { title, description, images: [{ url: image }] },
    }
  }
  const { data } = await supabase
    .from("fabrics")
    .select("name, description, sku, image_url, image_urls")
    .eq("slug", params.slug)
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

export default async function FabricDetailPage({ params }: { params: { slug: string } }) {
  let fabric: Fabric | null = null
  let collection: { name: string; slug: string } | null = null

  if (!supabase) {
    const f = fabrics.find((fab) => fab.slug === params.slug)
    if (!f) {
      notFound()
    }
    fabric = {
      id: f!.id,
      slug: f!.slug,
      name: f!.name,
      sku: f!.sku,
      description: '',
      image_urls: f!.images,
      price_min: f!.price,
      price_max: f!.price,
    }
  } else {
    const { data, error } = await supabase
      .from("fabrics")
      .select("id, slug, name, sku, description, size, collection_id, image_url, image_urls, price_min, price_max")
      .eq("slug", params.slug)
      .single()

    if (error || !data) {
      notFound()
    }
    fabric = data as Fabric

    if (fabric.collection_id) {
      const { data: col } = await supabase
        .from("collections")
        .select("name, slug")
        .eq("id", fabric.collection_id)
        .single()
      if (col) collection = col
    }
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
          <FabricVariantDropdown
            slug={params.slug}
            defaultImage={fabric.image_urls?.[0] || fabric.image_url || "/placeholder.svg"}
          />
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-bold">{fabric.name}</h1>
              <WishlistButton slug={fabric.slug || fabric.id} />
              <FavoriteButton slug={fabric.slug || fabric.id} />
            </div>
            {fabric.price_min && fabric.price_max && (
              <p className="text-lg text-gray-700">
                ฿{fabric.price_min.toLocaleString()} - ฿{fabric.price_max.toLocaleString()}
              </p>
            )}
            {fabric.size && (
              <p className="text-gray-600">ขนาด: {fabric.size}</p>
            )}
            {fabric.sku && (
              <p className="text-gray-600">SKU: {fabric.sku}</p>
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
            <div className="flex space-x-4 pt-2">
              <a
                href={`https://m.me/elfsofacover?text=${encodeURIComponent(
                  `สนใจลายผ้า ${fabric.slug || fabric.id} ครับ`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button className="w-full" size="lg">
                  <MessageSquare className="h-5 w-5 mr-2" />สอบถามผ่าน Facebook
                </Button>
              </a>
              <Button variant="outline" size="lg">
                <Receipt className="h-5 w-5 mr-2" />เปิดบิล
              </Button>
              <CopyToClipboardButton text={fabric.slug || fabric.sku || fabric.id} />
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <FabricSuggestions slug={params.slug} />
      <Footer />
      <AnalyticsTracker event="ViewContent" />
    </div>
  )
}
