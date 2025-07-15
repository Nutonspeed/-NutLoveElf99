"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { prepareFabricImage } from "@/lib/fabric/compress"
import { Button } from "@/components/ui/buttons/button"
import FabricForm, { FabricFormData } from "@/components/fabric/FabricForm"

interface EditFabricPageProps {
  params: { id: string }
}

export default function EditFabricPage({ params }: EditFabricPageProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  const [loading, setLoading] = useState(true)
  const [fabricData, setFabricData] = useState<FabricFormData | null>(null)

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
    const fetchFabric = async () => {
      if (!supabase || !params.id) {
        setLoading(false)
        return
      }
      const { data, error } = await supabase
        .from('fabrics')
        .select('name, image_url, collection_id')
        .eq('id', params.id)
        .single()
      if (error || !data) {
        console.error('Failed to fetch fabric', error)
        router.push('/admin/fabrics')
        return
      }
      setFabricData({
        name: data.name || '',
        imageUrl: data.image_url || '',
        collectionId: data.collection_id || ''
      })
      setLoading(false)
    }
    fetchFabric()
  }, [params.id, router])

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const handleSubmit = async ({ name, collectionId, imageFile }: FabricFormData) => {
    if (!supabase) return

    let uploadedUrl = fabricData?.imageUrl || ''

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

    const { error } = await supabase
      .from("fabrics")
      .update({
        name,
        image_url: uploadedUrl,
        collection_id: collectionId,
      })
      .eq("id", params.id)

    if (error) {
      console.error("Failed to update fabric", error)
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
          <h1 className="text-3xl font-bold">แก้ไขลายผ้า</h1>
        </div>

        <FabricForm fabricData={fabricData || undefined} onSubmit={handleSubmit} />
      </div>
    </div>
  )
}
