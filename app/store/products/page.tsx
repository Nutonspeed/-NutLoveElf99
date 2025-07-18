import StoreProductCard from '@/components/store/StoreProductCard'
import { Navbar } from '@/components/navbar'
import { mockProducts } from '@/lib/mock-products'

export default function StoreProductsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockProducts.map(p=> <StoreProductCard key={p.id} id={p.id} />)}
      </div>
    </div>
  )
}
