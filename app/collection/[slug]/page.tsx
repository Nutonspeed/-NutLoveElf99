import collections from '@/mock/store/collections.json'
import products from '@/mock/store/products.json'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/ProductCard'
import { notFound } from 'next/navigation'

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = (collections as any[]).find(c => c.slug === params.slug)
  if (!collection) notFound()
  const items = (products as any[]).filter(p => (p.collections || []).includes(collection.id))
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{collection.title}</h1>
          {collection.description && (
            <p className="text-gray-600">{collection.description}</p>
          )}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p as any} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
