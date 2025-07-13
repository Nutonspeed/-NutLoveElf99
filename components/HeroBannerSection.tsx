"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { heroBanner, loadHeroBanner } from "@/lib/mock-hero-banner"

export function HeroBannerSection() {
  const [banner, setBanner] = useState(heroBanner)

  useEffect(() => {
    loadHeroBanner()
    setBanner(heroBanner)
  }, [])

  return (
    <section className="relative h-[600px] bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center text-white">
      <Image src={banner.image} alt={banner.title} fill className="object-cover opacity-40" />
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 text-center space-y-6 px-4">
        <h1 className="text-4xl md:text-6xl font-bold whitespace-pre-line">{banner.title}</h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">{banner.subtitle}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              ดูสินค้าทั้งหมด
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent">
            เรียนรู้เพิ่มเติม
          </Button>
        </div>
      </div>
    </section>
  )
}
