"use client"
import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { mockProducts } from "@/lib/mock-products"

const categories = Array.from(new Set(mockProducts.map((p) => p.category)))

export default function StoreProductsPage() {
  const [category, setCategory] = useState<string>("all")
  const [layout, setLayout] = useState<"grid" | "list">("grid")

  const filtered = mockProducts.filter(
    (p) => category === "all" || p.category === category,
  )

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="หมวดหมู่" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex space-x-2">
            <Button
              variant={layout === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setLayout("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={layout === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setLayout("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          className={`grid gap-6 ${layout === "grid" ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1"}`}
        >
          {filtered.map((p) => (
            <Card key={p.id} className="group hover:shadow">
              <CardContent className="p-0">
                {layout === "grid" ? (
                  <Link href={`/store/products/${p.id}`}>
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={p.images[0] || "/placeholder.svg"}
                        alt={p.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold line-clamp-2">{p.name}</h3>
                      <p className="font-bold text-primary">฿{p.price.toLocaleString()}</p>
                    </div>
                  </Link>
                ) : (
                  <div className="flex p-4 space-x-4">
                    <div className="relative w-32 h-32 flex-shrink-0">
                      <Image
                        src={p.images[0] || "/placeholder.svg"}
                        alt={p.name}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold">{p.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{p.description}</p>
                      <Link href={`/store/products/${p.id}`}>
                        <Button size="sm">ดูรายละเอียด</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
