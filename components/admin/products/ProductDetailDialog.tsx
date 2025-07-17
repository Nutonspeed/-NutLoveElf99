import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/modals/dialog"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/types/product"
import type { Collection } from "@/types/collection"

interface Props {
  product: Product | null
  collections: Collection[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function ProductDetailDialog({ product, collections, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>รายละเอียดสินค้า</DialogTitle>
        </DialogHeader>
        {product && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="rounded-lg object-cover"
              />
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <div className="space-y-1">
                  <p>
                    <strong>หมวดหมู่:</strong> {product.category}
                  </p>
                  <p>
                    <strong>คอลเลกชัน:</strong> {collections.find(c => c.id === product.collectionId)?.name || "-"}
                  </p>
                  <p>
                    <strong>วัสดุ:</strong> {product.material}
                  </p>
                  <p>
                    <strong>ขนาด:</strong> {product.sizes.join(", ")}
                  </p>
                  <p>
                    <strong>สี:</strong> {product.colors.join(", ")}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-2">คุณสมบัติ:</h4>
              <div className="flex flex-wrap gap-2">
                {product.features.map((feature, index) => (
                  <Badge key={index} variant="secondary">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
