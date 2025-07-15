"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FabricsList } from "@/components/FabricsList"
import { AnalyticsTracker } from "@/components/analytics-tracker"
import { useFabrics } from "@/contexts/fabrics-context"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "แกลเลอรี่ลายผ้า | SofaCover Pro",
  description: "เลือกชมลายผ้าคลุมโซฟาที่เรามีให้บริการทั้งหมด",
}

export default function FabricsPage() {
  const { fabrics } = useFabrics()

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">แกลเลอรี่ลายผ้า</h1>
        <FabricsList fabrics={fabrics} />
      </div>
      <Footer />
      <AnalyticsTracker event="ViewContent" />
    </div>
  )
}
