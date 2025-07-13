"use client"

import { useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CampaignBanner } from "@/components/CampaignBanner"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { mockCampaigns } from "@/lib/mock-campaigns"
import { mockProducts } from "@/lib/mock-products"

export default function CampaignPage({ params }: { params: { slug: string } }) {
  const campaign = mockCampaigns.find((c) => c.slug === params.slug)
  const products = mockProducts.filter((p) =>
    campaign?.productIds.includes(p.id),
  )
  const router = useRouter()
  useEffect(() => {
    if (!campaign) {
      router.replace("/not-found")
    }
  }, [campaign, router])
  if (!campaign) return null
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <CampaignBanner
          title={campaign.title}
          subtitle={campaign.subtitle}
          bannerUrl={campaign.bannerUrl}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="border rounded-md p-4 space-y-2">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {p.description}
              </p>
              <Link href={`/products/${p.slug}`}> 
                <Button size="sm">ดูสินค้า</Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
