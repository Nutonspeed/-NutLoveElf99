"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { useCompare } from "@/contexts/compare-context"
import { fabrics } from "@/lib/mock-fabrics"

interface Fabric {
  id: string
  slug: string
  name: string
  sku: string
  color: string
  price: number
  images: string[]
}

export default function ComparePage() {
  const { items, clear } = useCompare()
  const [fabrics, setFabrics] = useState<Fabric[]>([])

  useEffect(() => {
    setFabrics(
      fabrics
        .filter((f) => items.includes(f.slug))
        .map((f) => ({ ...f }))
    )
  }, [items])

  if (fabrics.length !== 2) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600">กรุณาเลือกผ้า 2 ลาย</p>
          <Link href="/fabrics">
            <Button className="mt-4">เลือกผ้า</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">เปรียบเทียบลายผ้า</h1>
        <div className="grid grid-cols-2 gap-4">
          {fabrics.map((f) => (
            <div key={f.slug} className="text-center space-y-2">
              <Image
                src={f.images[0] || "/placeholder.svg"}
                alt={f.name}
                width={300}
                height={300}
                className="mx-auto rounded object-cover"
              />
              <p className="font-medium">{f.name}</p>
              <p className="text-sm text-gray-600">สี: {f.color}</p>
              <p className="text-sm text-gray-600">ราคา: ฿{f.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={clear}>ล้างรายการเปรียบเทียบ</Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
