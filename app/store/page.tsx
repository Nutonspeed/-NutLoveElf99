import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroBannerSection } from "@/components/HeroBannerSection"
import { Card, CardContent } from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import Link from "next/link"
import Image from "next/image"
import { getCollections } from "@/lib/mock-collections"
import { mockProducts } from "@/lib/mock-products"
import type { Collection } from "@/types/collection"

export default async function StoreHomePage() {
  const collections: Collection[] = (await getCollections()).slice(0, 3)
  const featured = mockProducts.slice(0, 4)
  return (
    <div className="min-h-screen">
      <Navbar />

      <HeroBannerSection />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">หมวดหมู่ยอดนิยม</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/store/products?collection=${col.slug}`}
                className="rounded-lg overflow-hidden border bg-white hover:shadow"
              >
                <div className="relative w-full h-40">
                  <Image
                    src={col.images[0] || "/placeholder.jpg"}
                    alt={col.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg truncate">{col.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">สินค้าแนะนำ</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <Card key={product.id} className="group hover:shadow">
                <CardContent className="p-0">
                  <Link href={`/store/products/${product.id}`}>
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                      <p className="font-bold text-primary">฿{product.price.toLocaleString()}</p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
