"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addCollection } from "@/lib/mock-collections"

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "")
}

export default function CreateCollectionPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState("")

  useEffect(() => {
    if (!name) return
    const auto = slugify(name)
    if (!slug || slug === slugify(slug)) {
      setSlug(auto)
    }
  }, [name])

  useEffect(() => {
    if (typeof window === "undefined") return
    try {
      const raw = window.localStorage.getItem("uploaded-fabrics")
      if (raw) {
        const names = JSON.parse(raw) as string[]
        if (names.length > 1) {
          const base = `${names[0]} Collection`
          setName(base)
          setSlug(slugify(base))
        }
      }
    } catch {}
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    addCollection({
      name,
      slug,
      description,
      priceRange: "",
      images: images
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    })
    router.push("/admin/collections")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/collections">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">สร้างคอลเลกชันใหม่</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ข้อมูลคอลเลกชัน</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">ชื่อคอลเลกชัน</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">คำอธิบาย</Label>
                <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="images">รูปภาพ (คั่นด้วย comma)</Label>
                <Input id="images" value={images} onChange={(e) => setImages(e.target.value)} />
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

