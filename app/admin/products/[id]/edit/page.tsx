"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { prepareProductImage } from "@/lib/image-handler"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface EditProductPageProps {
  params: { id: string }
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState("")
  const [imageUrls, setImageUrls] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const removeExistingImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index))
  }

  const removeNewImage = (index: number) => {
    setImageFiles(imageFiles.filter((_, i) => i !== index))
    setPreviewUrls(previewUrls.filter((_, i) => i !== index))
  }

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

  useEffect(() => {
    const fetchProduct = async () => {
      if (!supabase || !params.id) {
        setLoading(false)
        return
      }
      const { data } = await supabase
        .from("products")
        .select("name, description, price, category, images")
        .eq("id", params.id)
        .single()
      if (data) {
        setName(data.name || "")
        setDescription(data.description || "")
        setPrice(data.price?.toString() || "")
        setCategory(data.category || "")
        setImageUrls(Array.isArray(data.images) ? data.images : [])
      }
      setLoading(false)
    }
    fetchProduct()
  }, [params.id])

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!supabase) return

    const slug = name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")

    const uploaded: string[] = [...imageUrls]

    for (const [idx, file] of imageFiles.entries()) {
      const processed = await prepareProductImage(file, slug, uploaded.length + idx + 1)
      const fileName = processed.name
      const { error } = await supabase.storage
        .from("product-images")
        .upload(fileName, processed)
      if (error) {
        console.error("Failed to upload image", error)
        continue
      }
      const { data } = supabase.storage
        .from("product-images")
        .getPublicUrl(fileName)
      uploaded.push(data.publicUrl)
    }

    setImageUrls(uploaded)

    await supabase
      .from("products")
      .update({
        name,
        description,
        price: Number(price),
        category,
        images: uploaded,
      })
      .eq("id", params.id)

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
                <Label htmlFor="images">รูปภาพสินค้า</Label>
                <Input
                  id="images"
                  type="file"
                  multiple
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    const files = e.target.files
                    if (files) {
                      const arr = Array.from(files)
                      setImageFiles(arr)
                      setPreviewUrls(arr.map((f) => URL.createObjectURL(f)))
                    }
                  }}
                />
                {(imageUrls.length > 0 || previewUrls.length > 0) && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {imageUrls.map((url, idx) => (
                      <div key={`existing-${idx}`} className="relative">
                        <img
                          src={url}
                          alt={`existing-${idx}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={() => removeExistingImage(idx)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                    {previewUrls.map((url, idx) => (
                      <div key={`new-${idx}`} className="relative">
                        <img
                          src={url}
                          alt={`new-${idx}`}
                          className="h-24 w-full object-cover rounded-md"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6"
                          onClick={() => removeNewImage(idx)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
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
