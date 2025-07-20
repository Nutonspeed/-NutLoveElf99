"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import type { Fabric } from "@/mock/fabrics"
import { getFabrics } from "@/core/mock/store"


export default function CollectionsPage() {
  const [items, setItems] = useState<Fabric[]>([])

  useEffect(() => {
    setItems([...getFabrics()])
  }, [])

  const grouped = items.reduce<Record<string, Fabric[]>>((acc, fabric) => {
    const key = fabric.collectionId || "unknown"
    acc[key] = acc[key] ? [...acc[key], fabric] : [fabric]
    return acc
  }, {})

  const collectionIds = Object.keys(grouped).slice(0, 15)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 space-y-8">
        <h1 className="text-3xl font-bold">คอลเลกชันลายผ้า</h1>
        {collectionIds.length === 0 && (
          <p className="text-center text-gray-600">ไม่มีลายผ้าให้แสดง</p>
        )}
        {collectionIds.map((cid) => (
          <section key={cid} className="space-y-4">
            <h2 className="text-xl font-semibold">หมวด {cid}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {grouped[cid].map((fabric) => (
                <div key={fabric.id} className="border rounded-lg overflow-hidden bg-white">
                  <div className="relative aspect-square">
                    <Image src={fabric.imageUrl} alt={fabric.name} fill className="object-cover" />
                  </div>
                  <div className="p-2 text-center text-sm font-medium truncate">
                    {fabric.name}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
      <Footer />
    </div>
  )
}
