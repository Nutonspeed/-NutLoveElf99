"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { db } from "@/lib/database"

export default function WishlistPage() {
  const { user, isAuthenticated } = useAuth()
  const { dispatch } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [wishlistItems, setWishlistItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    loadWishlist()
  }, [isAuthenticated, user])

  const loadWishlist = async () => {
    if (!user) return

    try {
      const items = await db.getUserWishlist(user.id)
      setWishlistItems(items)
    } catch (error) {
      console.error("Error loading wishlist:", error)
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดรายการโปรดได้",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const removeFromWishlist = async (productId: string) => {
    if (!user) return

    try {
      await db.removeFromWishlist(user.id, productId)
      setWishlistItems((items) => items.filter((item) => item.id !== productId))
      toast({
        title: "ลบออกจากรายการโปรด",
        description: "สินค้าถูกลบออกจากรายการโปรดแล้ว",
      })
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถลบสินค้าออกจากรายการโปรดได้",
        variant: "destructive",
      })
    }
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

  const addAllToCart = () => {
    wishlistItems.forEach((product) => {
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
    })

    toast({
      title: "เพิ่มทั้งหมดลงตะกร้าแล้ว",
      description: `เพิ่มสินค้า ${wishlistItems.length} รายการลงตะกร้าแล้ว`,
    })
  }

  if (!isAuthenticated) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">กำลังโหลดรายการโปรด...</p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              <Heart className="mr-3 h-8 w-8 text-red-500" />
              รายการโปรด
            </h1>
            <p className="text-gray-600 mt-2">สินค้าที่คุณสนใจและบันทึกไว้</p>
          </div>

          {wishlistItems.length > 0 && (
            <Button onClick={addAllToCart} size="lg">
              <ShoppingCart className="mr-2 h-4 w-4" />
              เพิ่มทั้งหมดลงตะกร้า
            </Button>
          )}
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">รายการโปรดว่างเปล่า</h2>
            <p className="text-gray-600 mb-8">เริ่มเพิ่มสินค้าที่คุณชื่นชอบลงในรายการโปรด</p>
            <Link href="/products">
              <Button size="lg">เริ่มช้อปปิ้ง</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <Card key={product.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Link href={`/products/${product.slug}`}> 
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </Link>

                    {product.originalPrice && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        ลด {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </Badge>
                    )}

                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 hover:text-red-600"
                      onClick={() => removeFromWishlist(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-4 space-y-3">
                    <Link href={`/products/${product.slug}`}> 
                      <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                    </Link>

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

                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{product.category}</Badge>
                      <Badge variant={product.inStock ? "default" : "destructive"}>
                        {product.inStock ? "มีสินค้า" : "หมด"}
                      </Badge>
                    </div>

                    <div className="flex space-x-2">
                      <Link href={`/products/${product.slug}`} className="flex-1"> 
                        <Button variant="outline" className="w-full bg-transparent">
                          ดูรายละเอียด
                        </Button>
                      </Link>
                      <Button onClick={() => addToCart(product)} disabled={!product.inStock} className="flex-1">
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        เพิ่มลงตะกร้า
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
