import Image from "next/image"
import { mockProducts } from "@/lib/mock-products"
import { mockFabrics } from "@/lib/mock-fabrics"

export default function PreviewPage({ params }: { params: { id: string } }) {
  const { id } = params
  const product = mockProducts.find((p) => p.slug === id)
  const fabric = mockFabrics.find((f) => f.slug === id)
  const item = product || fabric

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        ไม่พบเนื้อหาที่คุณต้องการแชร์
      </div>
    )
  }

  const title = item.name
  const description = (product ? product.description : '') || ''
  const image = (product ? product.images[0] : fabric?.images[0]) || "/placeholder.svg"

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-sm rounded border p-4 space-y-2">
        <Image src={image} alt={title} width={400} height={400} className="w-full h-40 object-cover rounded" />
        <h1 className="font-bold text-lg">{title}</h1>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  )
}
