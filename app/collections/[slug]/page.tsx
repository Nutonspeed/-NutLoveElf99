import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { getCollections } from "@/lib/mock-collections"

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
      .select("name, slug, price_range, description, all_images")
      .eq("slug", params.slug)
      .single()

    if (error || !dbData) {
      notFound()
    }

    data = dbData
  }

  const images: string[] = (data as any).all_images || []

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
        {data.price_range && (
          <p className="text-gray-700 mb-2">{data.price_range}</p>
        )}
        {data.description && (
          <p className="text-gray-600 mb-8 whitespace-pre-line">{data.description}</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.slice(0, 12).map((img, idx) => (
            <div key={idx} className="space-y-2">
              <div className="relative aspect-square">
                <Image src={img || "/placeholder.svg"} alt={`fabric ${idx + 1}`} fill className="object-cover" />
              </div>
              <a
                href={`https://m.me/nutsofacover?ref=${data.slug}-${idx + 1}`}
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
