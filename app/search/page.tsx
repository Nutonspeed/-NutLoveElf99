"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Star, Search, Filter, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { db } from "@/lib/database"
import { getCollections } from "@/lib/mock-collections"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [products, setProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("relevance")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const [minRating, setMinRating] = useState(0)
  const [collectionMap, setCollectionMap] = useState<Record<string, string>>({})

  useEffect(() => {
    loadProducts()
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, searchQuery, sortBy, priceRange, selectedCategories, selectedColors, selectedSizes, minRating])

  const loadProducts = async () => {
    try {
      const data = await db.getProducts()
      const cols = await getCollections()
      const map: Record<string, string> = {}
      cols.forEach((c) => {
        map[c.id] = c.slug
      })
      setCollectionMap(map)
      setProducts(data)
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterProducts = () => {
    const filtered = products.filter((product) => {
      // Search query filter
      const query = searchQuery.toLowerCase()
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.tags && product.tags.some((t: string) => t.toLowerCase().includes(query))) ||
        (collectionMap[product.collectionId]?.toLowerCase().includes(query) ?? false)

      // Price range filter
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

      // Category filter
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)

      // Color filter
      const matchesColor =
        selectedColors.length === 0 || product.colors.some((color: string) => selectedColors.includes(color))

      // Size filter
      const matchesSize =
        selectedSizes.length === 0 || product.sizes.some((size: string) => selectedSizes.includes(size))

      // Rating filter
      const matchesRating = product.rating >= minRating

      return matchesSearch && matchesPrice && matchesCategory && matchesColor && matchesSize && matchesRating
    })

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        // Mock newest sort
        filtered.sort((a, b) => b.id.localeCompare(a.id))
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default: // relevance
        // Keep original order for relevance
        break
    }

    setFilteredProducts(filtered)
  }

  const categories = [...new Set(products.map((p) => p.category))]
  const allColors = [...new Set(products.flatMap((p) => p.colors))]
  const allSizes = [...new Set(products.flatMap((p) => p.sizes))]

  const clearFilters = () => {
    setSearchQuery("")
    setPriceRange([0, 10000])
    setSelectedCategories([])
    setSelectedColors([])
    setSelectedSizes([])
    setMinRating(0)
    setSortBy("relevance")
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังค้นหา...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{searchQuery ? `ผลการค้นหา "${searchQuery}"` : "ค้นหาสินค้า"}</h1>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="ค้นหาสินค้า..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" onClick={clearFilters}>
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              ล้างตัวกรอง
            </Button>
          </div>
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

                {/* Price Range */}
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-medium">ช่วงราคา</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      placeholder="ต่ำสุด"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value) || 0, priceRange[1]])}
                      className="w-20"
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="สูงสุด"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value) || 10000])}
                      className="w-20"
                    />
                  </div>
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

                {/* Colors */}
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-medium">สี</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {allColors.map((color) => (
                      <div key={color} className="flex items-center space-x-2">
                        <Checkbox
                          id={color}
                          checked={selectedColors.includes(color)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedColors([...selectedColors, color])
                            } else {
                              setSelectedColors(selectedColors.filter((c) => c !== color))
                            }
                          }}
                        />
                        <label htmlFor={color} className="text-sm">
                          {color}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="space-y-2 mb-6">
                  <label className="text-sm font-medium">ขนาด</label>
                  <div className="space-y-2">
                    {allSizes.map((size) => (
                      <div key={size} className="flex items-center space-x-2">
                        <Checkbox
                          id={size}
                          checked={selectedSizes.includes(size)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSizes([...selectedSizes, size])
                            } else {
                              setSelectedSizes(selectedSizes.filter((s) => s !== size))
                            }
                          }}
                        />
                        <label htmlFor={size} className="text-sm">
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">คะแนนขั้นต่ำ</label>
                  <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">ทั้งหมด</SelectItem>
                      <SelectItem value="1">1 ดาวขึ้นไป</SelectItem>
                      <SelectItem value="2">2 ดาวขึ้นไป</SelectItem>
                      <SelectItem value="3">3 ดาวขึ้นไป</SelectItem>
                      <SelectItem value="4">4 ดาวขึ้นไป</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:w-3/4">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                พบ {filteredProducts.length} สินค้า
                {searchQuery && ` สำหรับ "${searchQuery}"`}
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">เรียงตามความเกี่ยวข้อง</SelectItem>
                  <SelectItem value="newest">ใหม่ล่าสุด</SelectItem>
                  <SelectItem value="price-low">ราคาต่ำ-สูง</SelectItem>
                  <SelectItem value="price-high">ราคาสูง-ต่ำ</SelectItem>
                  <SelectItem value="rating">คะแนนสูงสุด</SelectItem>
                  <SelectItem value="name">ชื่อ A-Z</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <Link href={`/products/${product.slug}`}> 
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

                          <Badge variant="outline">{product.category}</Badge>
                        </div>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="h-24 w-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4">ไม่พบสินค้าที่ค้นหา</h2>
                <p className="text-gray-600 mb-8">ลองปรับเปลี่ยนคำค้นหาหรือตัวกรองเพื่อค้นหาสินค้าที่ต้องการ</p>
                <Button onClick={clearFilters}>ล้างตัวกรองทั้งหมด</Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
