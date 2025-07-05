import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { mockCollections, mockFabrics } from "@/lib/mock-collections"

export default function CollectionsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">คอลเลกชันลายผ้า</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCollections.map((collection) => {
            const fabrics = mockFabrics.filter((f) => f.collection_id === collection.id).slice(0, 4)
            const previewImages = fabrics.map((f) => f.image_urls[0]).slice(0, 4)
            return (
              <Link key={collection.id} href={`/collections/${collection.slug}`}>
                <div className="border rounded-lg overflow-hidden hover:shadow-lg transition bg-white">
                  <div className="grid grid-cols-2 gap-1 h-40">
                    {previewImages.map((url, idx) => (
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
            )
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}
