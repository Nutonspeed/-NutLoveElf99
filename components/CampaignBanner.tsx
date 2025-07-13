"use client"

import Image from "next/image"

interface CampaignBannerProps {
  title: string
  subtitle: string
  bannerUrl: string
}

export function CampaignBanner({ title, subtitle, bannerUrl }: CampaignBannerProps) {
  return (
    <div className="relative w-full h-48 mb-6">
      <Image src={bannerUrl || "/placeholder.svg"} alt={title} fill className="object-cover" />
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-lg">{subtitle}</p>
      </div>
    </div>
  )
}
