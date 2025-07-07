"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, X, ArrowUp, ArrowDown } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
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
  const [images, setImages] = useState<string[]>([])

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
        setImages(Array.isArray(data.images) ? data.images : [])
      }
      setLoading(false)
    }
    fetchProduct()
  }, [params.id])

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
      setImages((prev) => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const moveImage = (index: number, direction: "up" | "down") => {
    setImages((prev) => {
      const arr = [...prev]
      if (direction === "up" && index > 0) {
        ;[arr[index - 1], arr[index]] = [arr[index], arr[index - 1]]
      }
      if (direction === "down" && index < arr.length - 1) {
        ;[arr[index], arr[index + 1]] = [arr[index + 1], arr[index]]
      }
      return arr
    })
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!supabase) return

    await supabase
      .from("products")
      .update({
        name,
        description,
        price: Number(price),
        category,
        images,
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
                <Input id="images" type="file" multiple accept="image/*" onChange={handleImageUpload} />
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {images.map((img, index) => (
                      <div key={index} className="relative">
                        <img src={img} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover rounded-lg" />
                        <div className="absolute top-1 right-1 flex space-x-1">
                          <Button variant="outline" size="icon" className="h-5 w-5" onClick={() => moveImage(index, 'up')} disabled={index === 0}>
                            <ArrowUp className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-5 w-5" onClick={() => moveImage(index, 'down')} disabled={index === images.length - 1}>
                            <ArrowDown className="h-3 w-3" />
                          </Button>
                          <Button variant="destructive" size="icon" className="h-5 w-5" onClick={() => removeImage(index)}>
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
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
