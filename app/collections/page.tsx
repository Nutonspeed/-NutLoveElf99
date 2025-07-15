import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { getCollections } from "@/lib/mock-collections"
import { mockFabrics } from "@/lib/mock-fabrics"
import type { Metadata } from "next"
import type { Collection } from "@/types/collection"

export const metadata: Metadata = {
  title: "คอลเลกชันลายผ้า | SofaCover Pro",
  description: "เลือกชมกลุ่มลายผ้าทั้งหมด",
}

export default async function CollectionsPage() {
  const collections = await getCollections()

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">คอลเลกชันลายผ้า</h1>
        {collections.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {collections.map((collection: Collection) => (
              <Link
                key={collection.slug}
                href={`/collections/${collection.slug}`}
                className="border rounded-lg overflow-hidden hover:shadow transition bg-white"
              >
                <div className="grid grid-cols-2 gap-0 border-b">
                  {collection.images.slice(0, 4).map((img, idx) => (
                    <div key={idx} className="relative aspect-square">
                      <Image src={img || "/placeholder.svg"} alt={collection.name} fill className="object-cover" />
                    </div>
                  ))}
                </div>
                <div className="p-3 md:p-4 space-y-1">
                  <h3 className="font-semibold text-sm md:text-base truncate">
                    {collection.name}
                  </h3>
                  <p className="text-xs text-gray-600">
                    {mockFabrics.filter((f) => f.collectionSlug === collection.slug).length} ลายผ้า
                  </p>
                  <p className="text-xs text-primary underline">ดูรายละเอียด</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">ไม่มีคอลเลกชันให้แสดง</p>
        )}
      </div>
      <Footer />
    </div>
  )
}
