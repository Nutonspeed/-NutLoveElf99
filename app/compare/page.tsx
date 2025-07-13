"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useCompare } from "@/contexts/compare-context"
import { mockFabrics } from "@/lib/mock-fabrics"

interface Fabric {
  id: string
  slug: string
  name: string
  color: string
  price: number
  images: string[]
}

export default function ComparePage() {
  const { items, clear } = useCompare()
  const [fabrics, setFabrics] = useState<Fabric[]>([])

  useEffect(() => {
    setFabrics(mockFabrics.filter((f) => items.includes(f.slug)))
  }, [items])

  if (fabrics.length === 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <p className="text-gray-600">ไม่มีรายการเปรียบเทียบ</p>
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
        <Dialog defaultOpen>
          <DialogTrigger asChild>
            <Button variant="outline" className="mb-4">เปิดตารางเปรียบเทียบ</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>เปรียบเทียบลายผ้า</DialogTitle>
            </DialogHeader>
            <div className="overflow-x-auto">
                <table className="min-w-full text-center border">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">รายละเอียด</th>
                      {fabrics.map((f) => (
                        <th key={f.slug} className="px-4 py-2">
                          <Image
                            src={f.images[0] || "/placeholder.svg"}
                            alt={f.name}
                            width={100}
                            height={100}
                            className="mx-auto rounded"
                          />
                          <p className="mt-2 font-medium">{f.name}</p>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
              <tr>
                <td className="font-medium">สี</td>
                {fabrics.map((f) => (
                  <td key={f.slug}>{f.color}</td>
                ))}
              </tr>
              <tr>
                <td className="font-medium">ราคา</td>
                {fabrics.map((f) => (
                  <td key={f.slug}>฿{f.price.toLocaleString()}</td>
                ))}
              </tr>
              <tr>
                <td className="font-medium">ความรู้สึก</td>
                {fabrics.map((f) => (
                  <td key={f.slug}>นุ่มสบาย</td>
                ))}
              </tr>
              <tr>
                <td className="font-medium">ผิวสัมผัส</td>
                {fabrics.map((f) => (
                  <td key={f.slug}>ผิวละเอียด</td>
                ))}
              </tr>
            </tbody>
              </table>
            </div>
          </DialogContent>
        </Dialog>
        <div className="mt-6 text-center">
          <Button variant="outline" onClick={clear}>ล้างรายการเปรียบเทียบ</Button>
        </div>
      </div>
      <Footer />
    </div>
  )
}
