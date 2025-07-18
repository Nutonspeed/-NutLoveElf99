import StoreProductCard from '@/components/store/StoreProductCard'
import { HeroBannerSection } from '@/components/HeroBannerSection'
import { mockProducts } from '@/lib/mock-products'

export default function StoreHomePage() {
  const products = mockProducts.slice(0,4)
  return (
    <div className="space-y-8">
      <HeroBannerSection />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto px-4">
        {products.map(p=> <StoreProductCard key={p.id} id={p.id} />)}
      </div>
    </div>
  )
}
