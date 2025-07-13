"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw, Minus, Plus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { mockProducts } from "@/lib/mock-products"
import { mockOrders } from "@/lib/mock-orders"
import { mockReviewImages } from "@/lib/mock-review-images"
import { useReviewImagesSetting } from "@/contexts/review-images-context"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import type { ShippingStatus } from "@/types/order"
import { loadSocialLinks, socialLinks } from "@/lib/mock-settings"
import { RecommendedAddons } from "@/components/RecommendedAddons"

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  const product = mockProducts.find((p) => p.slug === slug)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { dispatch } = useCart()
  const { showImages } = useReviewImagesSetting()
  const { toast } = useToast()
  const [links, setLinks] = useState(socialLinks)
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const reviewImages = mockReviewImages.filter(
    (img) => img.productId === product?.id && img.active,
  )
  const [zoomImg, setZoomImg] = useState<string | null>(null)

  useEffect(() => {
    loadSocialLinks()
    setLinks(socialLinks)
  }, [])

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่พบสินค้า</h1>
          <p className="text-gray-600 mb-8">สินค้าที่คุณค้นหาไม่มีในระบบ</p>
          <Link href="/products">
            <Button>กลับไปหน้าสินค้า</Button>
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const addToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: "กรุณาเลือกขนาดและสี",
        description: "โปรดเลือกขนาดและสีก่อนเพิ่มลงตะกร้า",
        variant: "destructive",
      })
      return
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: `${product.id}-${selectedSize}-${selectedColor}`,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity,
        size: selectedSize,
        color: selectedColor,
      },
    })

    toast({
      title: "เพิ่มลงตะกร้าแล้ว",
      description: `${product.name} ถูกเพิ่มลงตะกร้าเรียบร้อยแล้ว`,
    })
  }

  const shareFacebook = () => {
    const base = links.facebook || "https://www.facebook.com/sharer/sharer.php?u="
    window.open(`${base}${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const shareLine = () => {
    const base = links.line || "https://social-plugins.line.me/lineit/share?url="
    window.open(`${base}${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({ title: 'คัดลอกลิงก์แล้ว' })
  }

  const router = useRouter()
  const { user, isAuthenticated, guestId } = useAuth()
  const demoPurchase = () => {
    const orderId = `DEMO-${Date.now()}`
    mockOrders.push({
      id: orderId,
      customerId: user?.id || guestId || 'guest',
      customerName: 'Demo User',
      customerEmail: user?.email || 'demo@example.com',
      items: [
        {
          productId: product.id,
          productName: product.name,
          quantity,
          price: product.price,
          size: selectedSize || product.sizes?.[0],
          color: selectedColor || product.colors?.[0],
        },
      ],
      total: product.price * quantity,
      status: 'paid',
      depositPercent: 100,
      createdAt: new Date().toISOString(),
      shippingAddress: {
        name: 'Demo',
        address: '-',
        city: '-',
        postalCode: '-',
        phone: '-',
      },
      delivery_method: '',
      tracking_number: '',
      shipping_fee: 0,
      shipping_status: 'pending' as ShippingStatus,
      shipping_date: '',
      delivery_note: '',
      validated: true,
      demo: true,
      guest: !isAuthenticated,
      checklist: { items: [], passed: true },
      timeline: [],
    })
    router.push(`/success/${orderId}`)
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">
            หน้าแรก
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">
            สินค้า
          </Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded-lg border-2 ${
                    selectedImage === index ? "border-primary" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    {product.rating} ({product.reviews} รีวิว)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-primary">฿{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ฿{product.originalPrice.toLocaleString()}
                    </span>
                    <Badge variant="destructive">
                      ลด {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                    </Badge>
                  </>
                )}
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">ขนาด</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกขนาด" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium">สี</label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger>
                  <SelectValue placeholder="เลือกสี" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-sm font-medium">จำนวน</label>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button onClick={addToCart} className="flex-1" size="lg">
                <ShoppingCart className="mr-2 h-5 w-5" />
                เพิ่มลงตะกร้า
              </Button>
              <Link href={`/order/new?product=${product.slug}`} className="flex-1">
                <Button className="w-full" size="lg">สั่งซื้อ</Button>
              </Link>
              <Button onClick={demoPurchase} className="flex-1" size="lg" variant="outline">
                ลองสั่งซื้อ
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={isWishlisted ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
              <Button variant="outline" size="lg" onClick={shareFacebook}>
                <span className="sr-only">share facebook</span>
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={shareLine}>
                <span className="sr-only">share line</span>
                <Share2 className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={copyLink}>
                <span className="sr-only">copy link</span>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium">จัดส่งฟรี</p>
                <p className="text-xs text-gray-600">สั่งซื้อขั้นต่ำ 1,500฿</p>
              </div>
              <div className="text-center">
                <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium">รับประกัน 2 ปี</p>
                <p className="text-xs text-gray-600">คุณภาพมั่นใจ</p>
              </div>
              <div className="text-center">
                <RotateCcw className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium">คืนได้ 30 วัน</p>
                <p className="text-xs text-gray-600">ไม่พอใจคืนเงิน</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">รายละเอียด</TabsTrigger>
              <TabsTrigger value="features">คุณสมบัติ</TabsTrigger>
              <TabsTrigger value="care">การดูแล</TabsTrigger>
              <TabsTrigger value="reviews">รีวิว</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">รายละเอียดสินค้า</h3>
                  <div className="space-y-4">
                    <p>{product.description}</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-medium">วัสดุ:</p>
                        <p className="text-gray-600">{product.material}</p>
                      </div>
                      <div>
                        <p className="font-medium">ขนาดที่มี:</p>
                        <p className="text-gray-600">{product.sizes.join(", ")}</p>
                      </div>
                      <div>
                        <p className="font-medium">สีที่มี:</p>
                        <p className="text-gray-600">{product.colors.join(", ")}</p>
                      </div>
                      <div>
                        <p className="font-medium">หมวดหมู่:</p>
                        <p className="text-gray-600">{product.category}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">คุณสมบัติพิเศษ</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="care" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">วิธีการดูแล</h3>
                  <div className="space-y-2">
                    {product.care.map((instruction, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <span className="text-primary font-medium">{index + 1}.</span>
                        <span>{instruction}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">รีวิวจากลูกค้า</h3>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold">{product.rating}</div>
                        <div className="flex justify-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">{product.reviews} รีวิว</div>
                      </div>
                    </div>

                    {showImages && reviewImages.length > 0 && (
                      <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                          {reviewImages.map((img, idx) => (
                            <img
                              key={idx}
                              src={img.url}
                              alt="review"
                              className="rounded cursor-pointer"
                              onClick={() => setZoomImg(img.url)}
                            />
                          ))}
                        </div>
                        {zoomImg && (
                          <div
                            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
                            onClick={() => setZoomImg(null)}
                          >
                            <img src={zoomImg} className="max-w-full max-h-full" />
                          </div>
                        )}
                      </>
                    )}

                    <div className="space-y-4">
                      {/* Mock reviews */}
                      <div className="border-b pb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="font-medium">คุณสมชาย</span>
                          <span className="text-sm text-gray-600">2 วันที่แล้ว</span>
                        </div>
                        <p className="text-gray-700">สินค้าดีมาก คุณภาพเยี่ยม ใช้งานง่าย แนะนำเลยครับ</p>
                      </div>

                      <div className="border-b pb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                            ))}
                            <Star className="h-4 w-4 text-gray-300" />
                          </div>
                          <span className="font-medium">คุณมาลี</span>
                          <span className="text-sm text-gray-600">1 สัปดาห์ที่แล้ว</span>
                        </div>
                        <p className="text-gray-700">ผ้าคลุมสวยมาก เข้ากับโซฟาได้ดี แต่การจัดส่งช้าไปหน่อย</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <RecommendedAddons slug={product.slug} />

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">สินค้าที่เกี่ยวข้อง</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockProducts
              .filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Card key={relatedProduct.id} className="group hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <Link href={`/products/${relatedProduct.slug}`}>
                      <div className="relative overflow-hidden rounded-t-lg">
                        <Image
                          src={relatedProduct.images[0] || "/placeholder.svg"}
                          alt={relatedProduct.name}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold line-clamp-2 mb-2">{relatedProduct.name}</h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-primary">
                            ฿{relatedProduct.price.toLocaleString()}
                          </span>
                          {relatedProduct.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ฿{relatedProduct.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
