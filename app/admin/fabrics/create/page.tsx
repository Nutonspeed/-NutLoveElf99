"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CreateFabricPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  const [name, setName] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [collectionId, setCollectionId] = useState("")

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!supabase) return

    const { error } = await supabase.from("fabrics").insert({
      name,
      image_url: imageUrl,
      collection_id: collectionId,
    })

    if (error) {
      console.error("Failed to create fabric", error)
      return
    }

    router.push("/admin/fabrics")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/fabrics">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">เพิ่มลายผ้าใหม่</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>ข้อมูลผ้า</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">ชื่อผ้า</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ชื่อผ้า"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">URL รูปภาพ</Label>
                <Input
                  id="image_url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="collection_id">รหัสคอลเลกชัน</Label>
                <Input
                  id="collection_id"
                  value={collectionId}
                  onChange={(e) => setCollectionId(e.target.value)}
                  placeholder="เช่น 1"
                />
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
