import Image from "next/image"
import { mockOgImages } from "@/lib/mock-og-images"

export default function OgImagePage({ params }: { params: { slug: string } }) {
  const entry = mockOgImages.find((o) => o.slug === params.slug) ||
    mockOgImages.find((o) => o.slug === "default")
  const url = entry?.url || "/placeholder.svg"
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Image src={url} alt={params.slug} width={600} height={315} />
    </div>
  )
}
