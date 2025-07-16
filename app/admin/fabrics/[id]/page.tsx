"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/modals/dialog"
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
  tags?: string[]
  rating?: number
  recommended?: boolean
}

export default function FabricDetailPage({ params }: FabricDetailPageProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  const [fabric, setFabric] = useState<Fabric | null>(null)
  const [collectionName, setCollectionName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [recommended, setRecommended] = useState(false)
  const [showSuggest, setShowSuggest] = useState(false)

  useEffect(() => {
    setFabric((f) => (f ? { ...f, tags, recommended } : f))
  }, [tags, recommended])

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
        const { mockFabrics } = await import("@/lib/mock-fabrics")
        const f = mockFabrics.find((m) => m.id === params.id || m.slug === params.id)
        if (f) {
          setFabric({
            id: f.id,
            name: f.name,
            sku: f.sku,
            collection_id: f.collectionSlug,
            image_urls: f.images,
            price_min: f.price,
            price_max: f.price,
            tags: f.tags || [],
            rating: f.rating,
            recommended: f.recommended,
          })
          setTags(f.tags || [])
          setRecommended(!!f.recommended)
        }
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
      setTags(data.tags || [])
      setRecommended(!!data.recommended)
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
                <div className="flex flex-wrap gap-2 items-center">
                  {tags.map((t) => (
                    <span key={t} className="px-2 py-1 bg-gray-100 rounded border text-sm">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2 items-center pt-2">
                  <input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="border rounded px-2 py-1 text-sm"
                    placeholder="เพิ่มแท็ก"
                  />
                  <Button
                    size="sm"
                    onClick={() => {
                      if (!newTag) return
                      setTags([...tags, newTag])
                      setNewTag("")
                    }}
                  >
                    เพิ่ม
                  </Button>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    checked={recommended}
                    onChange={(e) => setRecommended(e.target.checked)}
                  />
                  <span>⭐ Recommended</span>
                </div>
                <Button size="sm" variant="outline" onClick={() => setShowSuggest(true)}>
                  Suggest Short Name
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        {showSuggest && (
          <Dialog open={showSuggest} onOpenChange={setShowSuggest}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>ยืนยันชื่อสั้น</DialogTitle>
              </DialogHeader>
              {(() => {
                const shortName = fabric!.name.replace(/^[A-Z0-9-]+\s*/, "")
                return (
                  <div className="space-y-4">
                    <p>เปลี่ยนชื่อเป็น "{shortName}" ?</p>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setShowSuggest(false)}>
                        ยกเลิก
                      </Button>
                      <Button
                        onClick={() => {
                          setFabric((f) => (f ? { ...f, name: shortName } : f))
                          setShowSuggest(false)
                        }}
                      >
                        ยืนยัน
                      </Button>
                    </div>
                  </div>
                )
              })()}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
