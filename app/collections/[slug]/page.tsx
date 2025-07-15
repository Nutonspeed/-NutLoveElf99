import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { supabase } from "@/lib/supabase"
import { getCollections } from "@/lib/mock-collections"
import { WishlistButton } from "@/components/WishlistButton"
import { mockFabrics } from "@/lib/mock-fabrics"
import { FabricsList } from "@/components/FabricsList"
import { SharePageButton } from "@/components/SharePageButton"

export default async function CollectionDetailPage({ params }: { params: { slug: string } }) {
  let data: any

  if (!supabase) {
    const collections = await getCollections()
    data = collections.find((c) => c.slug === params.slug)
    if (!data) {
      return <div className="p-4 text-red-500">ไม่พบคอลเลกชันนี้</div>
    }
  } else {
    const { data: dbData, error } = await supabase
      .from("collections")
      .select("id, name, slug, price_range, description, all_images")
      .eq("slug", params.slug)
      .single()

    if (error || !dbData) {
      return <div className="p-4 text-red-500">ไม่พบคอลเลกชันนี้</div>
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

  const fabrics = mockFabrics
    .filter((f) => f.collectionSlug === data.slug)
    .map((f) => ({
      id: f.id,
      slug: f.slug,
      name: f.name,
      image_urls: f.images,
    }))

  const suggestions = fabrics.length
    ? [...fabrics].sort(() => 0.5 - Math.random()).slice(0, 4)
    : []

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
        <FabricsList fabrics={fabrics} />
        <div className="mt-10">
          <h2 className="text-xl font-bold mb-4">ลายผ้าอื่น ๆ ที่คุณอาจชอบ</h2>
          {suggestions.length > 0 ? (
            <FabricsList fabrics={suggestions} />
          ) : (
            <div className="text-center text-muted text-sm">ไม่มีลายผ้าอื่นในกลุ่มนี้</div>
          )}
          <div className="mt-4 text-center">
            <SharePageButton />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
