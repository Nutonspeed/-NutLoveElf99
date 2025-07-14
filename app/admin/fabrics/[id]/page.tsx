"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"

interface FabricDetailPageProps {
  params: { id: string }
}

interface Fabric {
  id: string
  name: string
  sku: string
  collection_id: string
  image_urls: string[]
  price_min: number
  price_max: number
}

export default function FabricDetailPage({ params }: FabricDetailPageProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  const [fabric, setFabric] = useState<Fabric | null>(null)
  const [collectionName, setCollectionName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

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
        .from("fabrics")
        .select("id, name, sku, collection_id, image_urls, price_min, price_max")
        .eq("id", params.id)
        .single()
      if (error || !data) {
        console.error("Failed to fetch fabric", error)
        router.push("/admin/fabrics")
        return
      }
      setFabric(data)
      const { data: collection } = await supabase
        .from("collections")
        .select("name")
        .eq("id", data.collection_id)
        .single()
      if (collection) {
        setCollectionName(collection.name)
      }
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

  if (!fabric) {
    return (
      <div className="min-h-screen flex items-center justify-center">ไม่พบข้อมูลลายผ้า</div>
    )
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
          <h1 className="text-3xl font-bold">รายละเอียดลายผ้า</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{fabric.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative w-full h-64 rounded-md overflow-hidden border">
                {fabric.image_urls?.[0] && (
                  <Image
                    src={fabric.image_urls[0]}
                    alt={fabric.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="space-y-2 text-gray-700">
                {collectionName && (
                  <p>คอลเลกชัน: {collectionName}</p>
                )}
                <p>รหัสคอลเลกชัน: {fabric.collection_id}</p>
                <p>SKU: {fabric.sku}</p>
                <p>
                  ราคา: ฿{fabric.price_min.toLocaleString()} - ฿{fabric.price_max.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
