"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'
import type { Product } from '@/types/product'

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg overflow-hidden bg-white flex flex-col">
      <div className="relative aspect-square">
        <Image
          src={product.images?.[0] || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-3 flex-1 flex flex-col space-y-2 text-center">
        <h3 className="font-medium line-clamp-2">{product.name}</h3>
        {product.sizes && (
          <p className="text-sm text-gray-600">ขนาด {product.sizes.join(', ')}</p>
        )}
        <Link href={`/product/${product.id}`} className="mt-auto">
          <Button className="w-full" size="sm">
            ดูรายละเอียด
          </Button>
        </Link>
      </div>
    </div>
  )
}
