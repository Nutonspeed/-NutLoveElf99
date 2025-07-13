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
import { Switch } from "@/components/ui/switch"
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
  const [images, setImages] = useState<string[]>([])
  const [sizes, setSizes] = useState<string[]>([])
  const [colors, setColors] = useState<string[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [isCurated, setIsCurated] = useState(false)
  const [status, setStatus] = useState<"active" | "draft">("draft")
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
      images,
      originalPrice: undefined,
      inStock: true,
      rating: 0,
      reviews: 0,
      sizes,
      colors,
      features,
      material: "",
      care: [],
      curated: isCurated,
      status,
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
                <Label htmlFor="status">สถานะ</Label>
                <Select value={status} onValueChange={(v) => setStatus(v as "active" | "draft")}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="เลือกสถานะ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">เปิดใช้งาน</SelectItem>
                    <SelectItem value="draft">ร่าง</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="images">รูปภาพ (คั่นด้วย comma)</Label>
                <Input
                  id="images"
                  value={images.join(',')}
                  onChange={(e) =>
                    setImages(
                      e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sizes">ขนาด (คั่นด้วย comma)</Label>
                <Input
                  id="sizes"
                  value={sizes.join(',')}
                  onChange={(e) =>
                    setSizes(
                      e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="colors">สี (คั่นด้วย comma)</Label>
                <Input
                  id="colors"
                  value={colors.join(',')}
                  onChange={(e) =>
                    setColors(
                      e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="features">คุณสมบัติ (คั่นด้วย comma)</Label>
                <Input
                  id="features"
                  value={features.join(',')}
                  onChange={(e) =>
                    setFeatures(
                      e.target.value
                        .split(',')
                        .map((s) => s.trim())
                        .filter(Boolean),
                    )
                  }
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="curated" checked={isCurated} onCheckedChange={setIsCurated} />
                <Label htmlFor="curated">แสดงใน Curated Picks</Label>
              </div>
              <div className="pt-4 flex justify-end">
                <Button type="submit">บันทึก</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
