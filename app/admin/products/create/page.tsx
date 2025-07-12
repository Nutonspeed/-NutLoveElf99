"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAdminProducts } from "@/contexts/admin-products-context"
import { useAdminCollections } from "@/contexts/admin-collections-context"

export default function CreateProductPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [collectionId, setCollectionId] = useState("")
  const [images, setImages] = useState("")
  const [features, setFeatures] = useState("")
  const [sizes, setSizes] = useState("")
  const [colors, setColors] = useState("")
  const [showPreview, setShowPreview] = useState(false)
  const { addProduct } = useAdminProducts()
  const { collections } = useAdminCollections()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }
    if (user?.role !== "admin") {
      router.push("/")
      return
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

    addProduct({
      slug,
      name,
      description,
      price: Number(price),
      category,
      collectionId,
      images: images.split(',').map((s) => s.trim()).filter(Boolean),
      originalPrice: undefined,
      inStock: true,
      rating: 0,
      reviews: 0,
      sizes: sizes.split(',').map((s) => s.trim()).filter(Boolean),
      colors: colors.split(',').map((s) => s.trim()).filter(Boolean),
      features: features.split(',').map((s) => s.trim()).filter(Boolean),
      material: "",
      care: [],
    })

    router.push("/admin/products")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/products">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">เพิ่มสินค้าใหม่</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>ข้อมูลสินค้า</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">ชื่อสินค้า</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">คำอธิบาย</Label>
                <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">ราคา</Label>
                <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">หมวดหมู่</Label>
                <Input id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collection">คอลเลกชัน</Label>
                <Select value={collectionId} onValueChange={setCollectionId}>
                  <SelectTrigger id="collection">
                    <SelectValue placeholder="เลือกคอลเลกชัน" />
                  </SelectTrigger>
                  <SelectContent>
                    {collections.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="images">รูปภาพ (คั่นด้วย comma)</Label>
                <Input id="images" value={images} onChange={(e) => setImages(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="features">คุณสมบัติผ้า (คั่นด้วย comma)</Label>
                <Input id="features" value={features} onChange={(e) => setFeatures(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sizes">ขนาดที่มี (คั่นด้วย comma)</Label>
                <Input id="sizes" value={sizes} onChange={(e) => setSizes(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="colors">สีที่มี (คั่นด้วย comma)</Label>
                <Input id="colors" value={colors} onChange={(e) => setColors(e.target.value)} />
              </div>
              <div className="pt-4 flex justify-end">
                <Button type="button" variant="outline" onClick={() => setShowPreview(!showPreview)} className="mr-2">
                  Preview
                </Button>
                <Button type="submit">บันทึก</Button>
              </div>
            </form>
          </CardContent>
        </Card>
        {showPreview && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>ตัวอย่างสินค้า</CardTitle>
            </CardHeader>
            <CardContent className="flex space-x-4">
              <div className="relative w-32 h-32 flex-shrink-0">
                <img src={images.split(',')[0] || '/placeholder.svg'} alt={name} className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold">{name || 'ชื่อสินค้า'}</p>
                <p className="text-sm text-gray-600">฿{price || 0}</p>
                <p className="text-sm text-gray-600">{features}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
