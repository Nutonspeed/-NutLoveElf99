"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { mockFabrics } from "@/lib/mock-fabrics"
import { mockCollections } from "@/lib/mock-collections"
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
  manufacturer?: string
  purchaseSource?: string
  productionNote?: string
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
      if (!params.id) {
        setLoading(false)
        return
      }
      if (!supabase) {
        const f = mockFabrics.find((m) => m.id === params.id)
        if (f) {
          setFabric({
            id: f.id,
            name: f.name,
            sku: f.sku,
            collection_id: f.collectionSlug,
            image_urls: f.images,
            price_min: f.price,
            price_max: f.price,
            manufacturer: f.manufacturer,
            purchaseSource: f.purchaseSource,
            productionNote: f.productionNote,
          })
          const col = mockCollections.find((c) => c.slug === f.collectionSlug)
          if (col) setCollectionName(col.name)
        }
        setLoading(false)
        return
      }
      const { data, error } = await supabase
        .from("fabrics")
        .select(
          "id, name, sku, collection_id, image_urls, price_min, price_max, manufacturer, purchase_source, production_note"
        )
        .eq("id", params.id)
        .single()
      if (error || !data) {
        console.error("Failed to fetch fabric", error)
        router.push("/admin/fabrics")
        return
      }
      setFabric({
        ...data,
        manufacturer: (data as any).manufacturer || undefined,
        purchaseSource: (data as any).purchase_source || undefined,
        productionNote: (data as any).production_note || undefined,
      })
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
                {fabric.manufacturer || fabric.purchaseSource || fabric.productionNote ? (
                  <>
                    {fabric.manufacturer && <p>ผู้ผลิต: {fabric.manufacturer}</p>}
                    {fabric.purchaseSource && <p>แหล่งซื้อ: {fabric.purchaseSource}</p>}
                    {fabric.productionNote && <p>หมายเหตุ: {fabric.productionNote}</p>}
                  </>
                ) : (
                  <p className="text-gray-500">ข้อมูลผู้ผลิตว่างเปล่า</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
