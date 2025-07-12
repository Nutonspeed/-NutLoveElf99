import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { getCollections } from "@/lib/mock-collections"
import { WishlistButton } from "@/components/WishlistButton"

export default async function CollectionDetailPage({ params }: { params: { slug: string } }) {
  let data: any

  if (!supabase) {
    const collections = await getCollections()
    data = collections.find((c) => c.slug === params.slug)
    if (!data) {
      notFound()
    }
  } else {
    const { data: dbData, error } = await supabase
      .from("collections")
      .select("id, name, slug, price_range, description, all_images")
      .eq("slug", params.slug)
      .single()

    if (error || !dbData) {
      notFound()
    }

    data = {
      id: dbData.id,
      name: dbData.name,
      slug: dbData.slug,
      priceRange: dbData.price_range,
      description: dbData.description,
      images: dbData.all_images || [],
    }
  }

  const images: string[] = (data as any).images || []

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="flex items-center mb-2 space-x-2">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <WishlistButton slug={data.slug} />
        </div>
        {data.priceRange && (
          <p className="text-gray-700 mb-2">{data.priceRange}</p>
        )}
        {data.description && (
          <p className="text-gray-600 mb-4 whitespace-pre-line">{data.description}</p>
        )}
        <div className="mb-6">
          <a
            href={`https://m.me/elfsofacover?text=${encodeURIComponent(
              `สนใจลายผ้า ${data.slug} ครับ`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm">💬 สอบถามผ่าน Facebook</Button>
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.slice(0, 12).map((img, idx) => (
            <div key={idx} className="space-y-2">
              <div className="relative aspect-square">
                <Image src={img || "/placeholder.svg"} alt={`fabric ${idx + 1}`} fill className="object-cover" />
              </div>
              <a
                href={`https://m.me/elfsofacover?text=${encodeURIComponent(
                  `สนใจลายผ้า ${data.slug} ครับ`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="sm" className="w-full">สนใจลายนี้ ส่งให้แอดมิน</Button>
              </a>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
