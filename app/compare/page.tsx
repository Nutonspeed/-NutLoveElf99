"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { X, Star, ShoppingCart, Plus } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { db } from "@/lib/database"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { DevelopmentNotice } from "@/components/development-notice"

export default function ComparePage() {
  const searchParams = useSearchParams()
  const productIds = searchParams.get("products")?.split(",") || []
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showNotice, setShowNotice] = useState(true)
  const { dispatch } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    loadProducts()
  }, [productIds])

  const loadProducts = async () => {
    try {
      const loadedProducts = []
      for (const id of productIds) {
        const product = await db.getProduct(id)
        if (product) {
          loadedProducts.push(product)
        }
      }
      setProducts(loadedProducts)
    } catch (error) {
      console.error("Error loading products:", error)
    } finally {
      setLoading(false)
    }
  }

  const removeProduct = (productId: string) => {
    setProducts(products.filter((p) => p.id !== productId))
  }

  const addToCart = (product: any) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity: 1,
      },
    })

    toast({
      title: "เพิ่มลงตะกร้าแล้ว",
      description: `${product.name} ถูกเพิ่มลงตะกร้าเรียบร้อยแล้ว`,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดข้อมูลเปรียบเทียบ...</p>
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
          <h1 className="text-3xl font-bold mb-4">เปรียบเทียบสินค้า</h1>
          <p className="text-gray-600">เปรียบเทียบคุณสมบัติและราคาของสินค้าที่คุณสนใจ</p>
        </div>

        {showNotice && (
          <div className="mb-6">
            <DevelopmentNotice
              feature="ระบบเปรียบเทียบสินค้า"
              description="ฟีเจอร์เปรียบเทียบสินค้าแบบละเอียดยังอยู่ระหว่างการพัฒนา ขณะนี้แสดงข้อมูลพื้นฐานเท่านั้น"
              onClose={() => setShowNotice(false)}
            />
          </div>
        )}

        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-6">🔍</div>
            <h2 className="text-2xl font-bold mb-4">ไม่มีสินค้าให้เปรียบเทียบ</h2>
            <p className="text-gray-600 mb-8">เลือกสินค้าที่ต้องการเปรียบเทียบจากหน้ารายการสินค้า</p>
            <Link href="/products">
              <Button size="lg">
                <Plus className="mr-2 h-4 w-4" />
                เลือกสินค้า
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Product Cards Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => removeProduct(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      {product.originalPrice && (
                        <Badge className="absolute top-2 left-2 bg-red-500">
                          ลด {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>

                    <div className="flex items-center space-x-1 mb-2">
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

                    <div className="flex items-center space-x-2 mb-4">
                      <span className="text-2xl font-bold text-primary">฿{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ฿{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Link href={`/products/${product.slug}`} className="flex-1">
                        <Button variant="outline" className="w-full bg-transparent">
                          ดูรายละเอียด
                        </Button>
                      </Link>
                      <Button onClick={() => addToCart(product)} className="flex-1">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        เพิ่มลงตะกร้า
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle>เปรียบเทียบรายละเอียด</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-32">รายการ</TableHead>
                        {products.map((product) => (
                          <TableHead key={product.id} className="text-center min-w-48">
                            <div className="space-y-2">
                              <Image
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.name}
                                width={80}
                                height={80}
                                className="w-20 h-20 object-cover rounded-lg mx-auto"
                              />
                              <p className="font-medium text-sm line-clamp-2">{product.name}</p>
                            </div>
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">ราคา</TableCell>
                        {products.map((product) => (
                          <TableCell key={product.id} className="text-center">
                            <div className="space-y-1">
                              <div className="text-lg font-bold text-primary">฿{product.price.toLocaleString()}</div>
                              {product.originalPrice && (
                                <div className="text-sm text-gray-500 line-through">
                                  ฿{product.originalPrice.toLocaleString()}
                                </div>
                              )}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">คะแนน</TableCell>
                        {products.map((product) => (
                          <TableCell key={product.id} className="text-center">
                            <div className="flex items-center justify-center space-x-1">
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
                              <span className="text-sm">({product.reviews})</span>
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">หมวดหมู่</TableCell>
                        {products.map((product) => (
                          <TableCell key={product.id} className="text-center">
                            <Badge variant="outline">{product.category}</Badge>
                          </TableCell>
                        ))}
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">วัสดุ</TableCell>
                        {products.map((product) => (
                          <TableCell key={product.id} className="text-center">
                            {product.material}
                          </TableCell>
                        ))}
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">ขนาดที่มี</TableCell>
                        {products.map((product) => (
                          <TableCell key={product.id} className="text-center">
                            <div className="space-y-1">
                              {product.sizes.map((size: string, index: number) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {size}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">สีที่มี</TableCell>
                        {products.map((product) => (
                          <TableCell key={product.id} className="text-center">
                            <div className="space-y-1">
                              {product.colors.slice(0, 3).map((color: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {color}
                                </Badge>
                              ))}
                              {product.colors.length > 3 && (
                                <div className="text-xs text-gray-500">+{product.colors.length - 3} อื่นๆ</div>
                              )}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">คุณสมบัติ</TableCell>
                        {products.map((product) => (
                          <TableCell key={product.id} className="text-center">
                            <div className="space-y-1">
                              {product.features.slice(0, 3).map((feature: string, index: number) => (
                                <div key={index} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                                  {feature}
                                </div>
                              ))}
                              {product.features.length > 3 && (
                                <div className="text-xs text-gray-500">+{product.features.length - 3} อื่นๆ</div>
                              )}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>

                      <TableRow>
                        <TableCell className="font-medium">สถานะสินค้า</TableCell>
                        {products.map((product) => (
                          <TableCell key={product.id} className="text-center">
                            <Badge variant={product.inStock ? "default" : "destructive"}>
                              {product.inStock ? "มีสินค้า" : "หมด"}
                            </Badge>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
