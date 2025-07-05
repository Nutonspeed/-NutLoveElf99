import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface Collection {
  id: string
  name: string
  slug: string
  description: string
}

interface Fabric {
  image_urls: string[]
  collection_id: string
}
export default async function CollectionsPage() {
  if (!supabase) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-red-500">Supabase client not configured</div>
        <Footer />
      </div>
    )
  }
  const { data: collections, error } = await supabase.from("collections").select("id, name, slug, description")
  if (error || !collections) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-red-500">ไม่สามารถโหลดข้อมูลคอลเลกชันได้</div>
        <Footer />
      </div>
    )
  }

  const collectionsWithPreview = await Promise.all(
    collections.map(async (collection: Collection) => {
      const { data } = await supabase
        .from("fabrics")
        .select("image_urls, collection_id")
        .eq("collection_id", collection.id)
        .limit(4)
      const previewImages = data?.map((f: Fabric) => f.image_urls[0]).filter(Boolean) || []
      return { ...collection, previewImages }
    })
  )

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">คอลเลกชันลายผ้า</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collectionsWithPreview.map((collection) => (
            <Link key={collection.id} href={`/collections/${collection.slug}`}>
              <div className="border rounded-lg overflow-hidden hover:shadow-lg transition bg-white">
                <div className="grid grid-cols-2 gap-1 h-40">
                  {collection.previewImages.map((url, idx) => (
                    <div key={idx} className="relative w-full h-full">
                      <Image src={url} alt={collection.name} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="p-4 space-y-1">
                  <h3 className="font-semibold text-lg">{collection.name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{collection.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
