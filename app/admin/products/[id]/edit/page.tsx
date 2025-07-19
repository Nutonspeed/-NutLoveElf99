"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { useAdminProducts } from "@/contexts/admin-products-context"
import { useAdminCollections } from "@/contexts/admin-collections-context"
import type { Product } from "@/types/product"

interface EditProductPageProps {
  params: { id: string }
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [collectionId, setCollectionId] = useState("")
  const [images, setImages] = useState("")
  const [newImage, setNewImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState<"active" | "draft">("draft")
  const [isCurated, setIsCurated] = useState(false)
  const { products, updateProduct } = useAdminProducts()
  const { collections } = useAdminCollections()


  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login")
      return
    }
    if (user?.role !== "admin") {
      router.push("/")
      return
    }
  }, [isAuthenticated, user, router])

  useEffect(() => {
    const p = products.find((pr: Product) => pr.id === params.id)
    if (p) {
      setName(p.name)
      setDescription(p.description)
      setPrice(p.price.toString())
      setCategory(p.category)
      setCollectionId(p.collectionId)
      setImages(p.images.join(','))
      setStatus(p.status ?? 'active')
      setIsCurated(!!p.curated)
    } else {
      setNotFound(true)
    }
    setLoading(false)
  }, [params.id, products])

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        กำลังโหลดข้อมูล...
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="space-y-4 text-center">
          <p>ไม่พบข้อมูล</p>
          <Link href="/admin/dashboard">
            <Button>กลับแดชบอร์ด</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setNewImage(file)
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

    updateProduct(params.id, {
      slug,
      name,
      description,
      price: Number(price),
      category,
      collectionId,
      images: [
        ...images.split(',').map((s) => s.trim()).filter(Boolean),
        ...(preview ? [preview] : []),
      ],
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
          <h1 className="text-3xl font-bold">แก้ไขสินค้า</h1>
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
                <Input id="images" value={images} onChange={(e) => setImages(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="upload">อัพโหลดรูปใหม่</Label>
                <Input id="upload" type="file" accept="image/*" onChange={handleImageChange} />
                {preview && (
                  <img src={preview} alt="preview" className="h-32 w-32 object-cover rounded-md" />
                )}
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
