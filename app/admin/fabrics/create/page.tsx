"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { prepareFabricImage } from "@/lib/image-handler"
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
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")

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

    let uploadedUrl = imageUrl

    if (imageFile) {
      let slug = 'fabric'
      if (collectionId) {
        const { data } = await supabase
          .from('collections')
          .select('slug')
          .eq('id', collectionId)
          .single()
        if (data?.slug) slug = data.slug
      }
      const processedFile = await prepareFabricImage(imageFile, slug, 1, 'image/webp')
      const fileName = processedFile.name
      const { error: uploadError } = await supabase.storage
        .from("fabric-images")
        .upload(fileName, processedFile)
      if (uploadError) {
        console.error("Failed to upload image", uploadError)
        return
      }
      const { data } = supabase.storage
        .from("fabric-images")
        .getPublicUrl(fileName)
      uploadedUrl = data.publicUrl
      setImageUrl(uploadedUrl)
    }

    const { error } = await supabase.from("fabrics").insert({
      name,
      image_url: uploadedUrl,
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
                <Label htmlFor="image">รูปภาพ</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      setImageFile(file)
                      setPreviewUrl(URL.createObjectURL(file))
                    }
                  }}
                />
                {previewUrl && (
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="h-24 w-24 object-cover rounded-md mt-2"
                  />
                )}
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
