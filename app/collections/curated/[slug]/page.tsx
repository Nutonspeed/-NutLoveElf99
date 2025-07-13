import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { notFound } from "next/navigation"
import { mockCurated } from "@/lib/mock-curated"
import { mockProducts } from "@/lib/mock-products"

export default function CuratedPage({ params }: { params: { slug: string } }) {
  const group = mockCurated.find((c) => c.slug === params.slug)
  if (!group) notFound()
  const products = mockProducts.filter((p) => group.productIds.includes(p.id))
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-6">
          <img src={group.coverUrl} alt={group.title} className="w-full h-48 object-cover rounded" />
          <h1 className="text-3xl font-bold mt-4">{group.title}</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="border rounded-md p-4 space-y-2">
              <h3 className="font-semibold">{p.name}</h3>
              <Link href={`/products/${p.slug}`}> <Button size="sm">ดูสินค้า</Button></Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
