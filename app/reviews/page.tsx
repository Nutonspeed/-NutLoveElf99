"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, ThumbsUp, MessageSquare, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { db } from "@/lib/database"
import { DevelopmentNotice } from "@/components/development-notice"

export default function ReviewsPage() {
  const [products, setProducts] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterRating, setFilterRating] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [showNotice, setShowNotice] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const productsData = await db.getProducts()
      setProducts(productsData)

      // Generate mock reviews
      const mockReviews = generateMockReviews(productsData)
      setReviews(mockReviews)
    } catch (error) {
      console.error("Error loading data:", error)
    } finally {
      setLoading(false)
    }
  }

  const generateMockReviews = (products: any[]) => {
    const mockReviews = []
    const reviewTexts = [
      "สินค้าดีมาก คุณภาพเยี่ยม ใช้งานง่าย แนะนำเลยครับ",
      "ผ้าคลุมสวยมาก เข้ากับโซฟาได้ดี แต่การจัดส่งช้าไปหน่อย",
      "คุณภาพดีเกินราคา ใช้มาหลายเดือนแล้วยังคงสภาพดี",
      "สีสวย วัสดุดี แต่ขนาดเล็กกว่าที่คิดไว้นิดหน่อย",
      "ประทับใจมาก บริการดี จัดส่งรวดเร็ว สินค้าตรงตามที่โฆษณา",
      "ใช้ได้ดี แต่ราคาแพงไปหน่อย โดยรวมพอใจ",
      "คุณภาพดีมาก ใช้งานง่าย ทำความสะอาดสะดวก",
      "สินค้าดี แต่สีไม่ตรงกับที่เห็นในรูป",
    ]

    const reviewerNames = ["คุณสมชาย", "คุณมาลี", "คุณสมศักดิ์", "คุณสุดา", "คุณวิชัย", "คุณนิดา", "คุณประยุทธ", "คุณสมหญิง"]

    products.forEach((product) => {
      const numReviews = Math.floor(Math.random() * 5) + 1
      for (let i = 0; i < numReviews; i++) {
        mockReviews.push({
          id: `${product.id}-${i}`,
          productId: product.id,
          productName: product.name,
          productImage: product.images[0],
          userName: reviewerNames[Math.floor(Math.random() * reviewerNames.length)],
          userAvatar: `/placeholder.svg?height=40&width=40`,
          rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars mostly
          title: `รีวิว ${product.name}`,
          content: reviewTexts[Math.floor(Math.random() * reviewTexts.length)],
          createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
          helpful: Math.floor(Math.random() * 20),
          verified: Math.random() > 0.3,
        })
      }
    })

    return mockReviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }

  const filteredReviews = reviews.filter((review) => {
    if (filterRating === "all") return true
    return review.rating === Number.parseInt(filterRating)
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      case "rating-high":
        return b.rating - a.rating
      case "rating-low":
        return a.rating - b.rating
      case "helpful":
        return b.helpful - a.helpful
      default: // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดรีวิว...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">รีวิวจากลูกค้า</h1>
          <p className="text-gray-600">ความคิดเห็นและประสบการณ์จากลูกค้าที่ใช้สินค้าจริง</p>
        </div>

        {showNotice && (
          <div className="mb-6">
            <DevelopmentNotice
              feature="ระบบรีวิวแบบละเอียด"
              description="ระบบรีวิวขั้นสูง เช่น การอัพโหลดรูปภาพ การตอบกลับรีวิว ยังอยู่ระหว่างการพัฒนา"
              onClose={() => setShowNotice(false)}
            />
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">กรองตาม:</span>
          </div>

          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="คะแนน" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทุกคะแนน</SelectItem>
              <SelectItem value="5">5 ดาว</SelectItem>
              <SelectItem value="4">4 ดาว</SelectItem>
              <SelectItem value="3">3 ดาว</SelectItem>
              <SelectItem value="2">2 ดาว</SelectItem>
              <SelectItem value="1">1 ดาว</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="เรียงตาม" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">ใหม่ล่าสุด</SelectItem>
              <SelectItem value="oldest">เก่าสุด</SelectItem>
              <SelectItem value="rating-high">คะแนนสูง-ต่ำ</SelectItem>
              <SelectItem value="rating-low">คะแนนต่ำ-สูง</SelectItem>
              <SelectItem value="helpful">มีประโยชน์มากสุด</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {sortedReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <Link href={`/products/${review.productId}`}>
                    <Image
                      src={review.productImage || "/placeholder.svg"}
                      alt={review.productName}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                  </Link>

                  <div className="flex-1 space-y-3">
                    {/* Product Name */}
                    <Link href={`/products/${review.productId}`}>
                      <h3 className="font-semibold text-lg hover:text-primary transition-colors">
                        {review.productName}
                      </h3>
                    </Link>

                    {/* User Info and Rating */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={review.userAvatar || "/placeholder.svg"} />
                          <AvatarFallback>{review.userName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.userName}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                ซื้อแล้ว
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              {new Date(review.createdAt).toLocaleDateString("th-TH")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Review Content */}
                    <div className="space-y-2">
                      <h4 className="font-medium">{review.title}</h4>
                      <p className="text-gray-700">{review.content}</p>
                    </div>

                    {/* Review Actions */}
                    <div className="flex items-center space-x-4 pt-2">
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        มีประโยชน์ ({review.helpful})
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <MessageSquare className="mr-1 h-4 w-4" />
                        ตอบกลับ
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedReviews.length === 0 && (
          <div className="text-center py-16">
            <Star className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">ไม่พบรีวิวที่ตรงกับเงื่อนไข</h2>
            <p className="text-gray-600">ลองปรับเปลี่ยนตัวกรองเพื่อดูรีวิวอื่นๆ</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
