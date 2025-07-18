"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { prepareFabricImage } from "@/lib/fabric/compress"
import { Button } from "@/components/ui/buttons/button"
import FabricForm, { FabricFormData } from "@/components/fabric/FabricForm"

export default function CreateFabricPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()


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

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  const handleSubmit = async ({ name, collectionId, imageFile }: FabricFormData) => {
    if (!supabase) return

    let uploadedUrl = ""

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
        .from('fabric-images')
        .upload(fileName, processedFile)
      if (uploadError) {
        console.error('Failed to upload image', uploadError)
        return
      }
      const { data } = supabase.storage.from('fabric-images').getPublicUrl(fileName)
      uploadedUrl = data.publicUrl
    }

    const { data: last } = await supabase
      .from("fabrics")
      .select("sku")
      .order("sku", { ascending: false })
      .limit(1)
      .single()
    const lastNum = last?.sku ? parseInt(last.sku.split("-")[1]) : 0
    const sku = `FBC-${String(lastNum + 1).padStart(3, "0")}`

    const { error } = await supabase.from("fabrics").insert({
      name,
      sku,
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

        <FabricForm onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
