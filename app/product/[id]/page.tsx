import products from '@/mock/store/products.json'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Image from 'next/image'
import { Button } from '@/components/ui/buttons/button'
import { notFound } from 'next/navigation'

export default function ProductDetail({ params }: { params: { id: string } }) {
  const product = (products as any[]).find(p => p.id === params.id)
  if (!product) notFound()
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 space-y-6">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {product.images.map((img: string, idx: number) => (
              <div key={idx} className="relative aspect-square">
                <Image src={img} alt={product.name} fill className="object-cover rounded" />
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {product.sizes && <p>ขนาด: {product.sizes.join(', ')}</p>}
            {product.material && <p>ผิวสัมผัส: {product.material}</p>}
            {product.type && <p>เหมาะกับ: {product.type}</p>}
            <a href="https://m.me/elfsofacover" target="_blank" rel="noopener noreferrer">
              <Button className="mt-4">สอบถามเข้าร้าน</Button>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
