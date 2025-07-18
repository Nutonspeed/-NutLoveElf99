"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent } from '@/components/ui/cards/card'
import { getActiveFlashSale } from '@/lib/mock-flash-sales'
import { mockProducts } from '@/lib/mock-products'

export default function StoreProductCard({ id }: { id: string }) {
  const product = mockProducts.find(p => p.id === id)
  if (!product) return null
  const flash = getActiveFlashSale(id)
  return (
    <Card className="group hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image src={product.images[0] || '/placeholder.svg'} alt={product.name} width={300} height={300} className="w-full h-48 object-cover" />
          {flash && (
            <Badge className="absolute top-2 left-2 bg-red-500">Flash Sale</Badge>
          )}
        </div>
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">฿{flash? flash.price.toLocaleString(): product.price.toLocaleString()}</span>
            {flash && (
              <span className="text-sm text-gray-500 line-through">฿{product.price.toLocaleString()}</span>
            )}
          </div>
          <Link href={`/products/${product.slug}`}> <Button className="w-full mt-2">ดูรายละเอียด</Button></Link>
        </div>
      </CardContent>
    </Card>
  )
}
