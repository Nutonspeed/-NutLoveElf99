"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent } from "@/components/ui/cards/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/inputs/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, Filter, Grid, List } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { mockProducts } from "@/lib/mock-products"
import { mockCoViewLog } from "@/lib/mock-co-view-log"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const categories = ["Premium", "Standard", "Waterproof", "Luxury"]

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">สินค้าทั้งหมด</h1>
          <p className="text-gray-600">ค้นหาผ้าคลุมโซฟาที่เหมาะสมกับความต้องการของคุณ</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4 space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  ตัวกรอง
                </h3>

                {/* Search */}
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-medium">ค้นหา</label>
                  <Input placeholder="ค้นหาสินค้า..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>

                {/* Categories */}
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-medium">หมวดหมู่</label>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories([...selectedCategories, category])
                            } else {
                              setSelectedCategories(selectedCategories.filter((c) => c !== category))
                            }
                          }}
                        />
                        <label htmlFor={category} className="text-sm">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">ช่วงราคา</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="ต่ำสุด"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number.parseInt(e.target.value) || 0, priceRange[1]])}
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="สูงสุด"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value) || 10000])}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">แสดง {sortedProducts.length} สินค้า</span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="เรียงตาม" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">ชื่อ A-Z</SelectItem>
                  <SelectItem value="price-low">ราคาต่ำ-สูง</SelectItem>
                  <SelectItem value="price-high">ราคาสูง-ต่ำ</SelectItem>
                  <SelectItem value="rating">คะแนนสูงสุด</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products */}
            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
              }`}
            >
              {sortedProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    {viewMode === "grid" ? (
                      <>
                        <div className="relative overflow-hidden rounded-t-lg">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {product.originalPrice && (
                            <Badge className="absolute top-2 left-2 bg-red-500">
                              ลด {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </Badge>
                          )}
                          {mockCoViewLog[product.slug] && (
                            <Badge className="absolute top-2 right-2">ดูด้วยกันบ่อย</Badge>
                          )}
                        </div>

                        <div className="p-4 space-y-2">
                          <h3 className="font-semibold text-lg line-clamp-2">{product.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                          <div className="flex items-center space-x-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">({product.reviews})</span>
                          </div>

                          <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-primary">฿{product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ฿{product.originalPrice.toLocaleString()}
                              </span>
                            )}
                          </div>

                          <Link href={`/products/${product.slug}`}> 
                            <Button className="w-full mt-4">ดูรายละเอียด</Button>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <div className="flex p-4 space-x-4">
                        <div className="relative w-32 h-32 flex-shrink-0">
                          <Image
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            width={128}
                            height={128}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          {product.originalPrice && (
                            <Badge className="absolute top-1 left-1 bg-red-500 text-xs">
                              ลด {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                            </Badge>
                          )}
                          {mockCoViewLog[product.slug] && (
                            <Badge className="absolute top-1 right-1 text-xs">ดูด้วยกันบ่อย</Badge>
                          )}
                        </div>

                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-lg">{product.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>

                          <div className="flex items-center space-x-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">({product.reviews})</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="text-xl font-bold text-primary">฿{product.price.toLocaleString()}</span>
                              {product.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  ฿{product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>

                            <Link href={`/products/${product.slug}`}> 
                              <Button>ดูรายละเอียด</Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">ไม่พบสินค้าที่ตรงกับเงื่อนไขการค้นหา</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
