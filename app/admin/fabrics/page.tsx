"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { getFabrics as fetchMockFabrics } from "@/lib/mock-fabrics"
import EmptyState from "@/components/EmptyState"
import { Skeleton } from "@/components/ui/skeleton"
import { AvailabilityTag } from "@/components/AvailabilityTag"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/modals/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, Edit, Plus, Trash2, Search } from "lucide-react"
import { Input } from "@/components/ui/inputs/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface Fabric {
  id: string
  name: string
  sku: string
  collection_id: string
  image_url: string | null
  price_min: number
  price_max: number
  collection_name?: string | null
  availability?: "available" | "out" | "discontinued"
}

export default function AdminFabricsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [fabrics, setFabrics] = useState<Fabric[]>([])
  const [loading, setLoading] = useState(true)
  const [imgError, setImgError] = useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [collectionFilter, setCollectionFilter] = useState("all")
  const [collectionOptions, setCollectionOptions] = useState<{id: string; name: string}[]>([])
  const [optImage, setOptImage] = useState<string | null>(null)
  const [optName, setOptName] = useState("")
  const [optDialog, setOptDialog] = useState(false)

  const handleDelete = async (id: string) => {
    if (
      typeof window !== "undefined" &&
      !window.confirm("คุณต้องการลบลายผ้านี้ใช่หรือไม่?")
    )
      return

    const previous = fabrics
    setFabrics(fabrics.filter((f) => f.id !== id))

    const { error } = await supabase?.from("fabrics").delete().eq("id", id)

    if (error) {
      console.error("Failed to delete fabric", error)
      setFabrics(previous)
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถลบลายผ้าได้",

        variant: "destructive",
      })
    } else {
      toast({ title: "ลบลายผ้าแล้ว" })
    }
  }

  const handleOptimize = (fabric: Fabric) => {
    if (!fabric.image_url) {
      toast({ title: "เกิดข้อผิดพลาด", description: "ไม่สามารถปรับขนาดได้", variant: "destructive" })
      return
    }
    setOptImage(fabric.image_url)
    setOptName(fabric.name)
    setOptDialog(true)
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
    const fetchFabrics = async () => {
      setLoading(true)
      const data = await fetchMockFabrics()
      const { data: collectionsData } = await supabase
        ?.from("collections")
        .select("id, name")
      const collectionMap: Record<string, string> = {}
      collectionsData?.forEach((c) => {
        collectionMap[c.id] = c.name
      })
      if (collectionsData) {
        setCollectionOptions(collectionsData)
      }
      const withCollectionName = data.map((f: Fabric) => ({
        ...f,
        collection_name: collectionMap[f.collection_id] || null,
      }))
      setFabrics(withCollectionName)
      setLoading(false)
    }
    fetchFabrics()
  }, [])

  const filteredFabrics = fabrics.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.collection_name?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCollection =
      collectionFilter === "all" || f.collection_id === collectionFilter
    return matchesSearch && matchesCollection
  })

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">จัดการผ้า</h1>
              <p className="text-gray-600">เพิ่ม แก้ไข และลบผ้าในระบบ</p>
            </div>
          </div>
          <Link href="/admin/fabrics/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              เพิ่มผ้าใหม่
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <CardTitle>รายการผ้า ({filteredFabrics.length})</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหาลายผ้า..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-60"
                  />
                </div>
                <Select value={collectionFilter} onValueChange={setCollectionFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="คอลเลกชัน" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">ทั้งหมด</SelectItem>
                    {collectionOptions.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2 rounded-md border p-4">
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : filteredFabrics.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>รูปภาพ</TableHead>
                    <TableHead>ชื่อผ้า</TableHead>
                    <TableHead>ราคา</TableHead>
                    <TableHead>คอลเลกชัน</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead className="text-right">การจัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFabrics.map((fabric) => (
                    <TableRow key={fabric.id}>
                      <TableCell>
                        <div className="h-20 w-20 flex items-center justify-center">
                          {fabric.image_url && !imgError[fabric.id] ? (
                            <Image
                              src={fabric.image_url}
                              alt={fabric.name}
                              width={80}
                              height={80}
                              className="rounded-md object-cover"
                              onError={() =>
                                setImgError((prev) => ({ ...prev, [fabric.id]: true }))
                              }
                            />
                          ) : (
                            <span className="text-sm text-gray-500">No image</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{fabric.name}</TableCell>
                      <TableCell>
                        ฿{fabric.price_min.toLocaleString()} - ฿{fabric.price_max.toLocaleString()}
                      </TableCell>
                      <TableCell>{fabric.collection_name || "-"}</TableCell>
                      <TableCell>
                        {fabric.availability && (
                          <AvailabilityTag status={fabric.availability} />
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => router.push(`/admin/fabrics/${fabric.id}/edit`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleOptimize(fabric)}
                          >
                            ลดขนาดภาพ
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleDelete(fabric.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-8">
                {fabrics.length === 0 ? (
                  <EmptyState
                    icon={<Image src="/placeholder.svg" alt="empty" width={120} height={120} />}
                    title="ยังไม่มีลายผ้าในระบบ"
                  />
                ) : (
                  <EmptyState title="ไม่พบผ้าที่ตรงกับเงื่อนไขการค้นหา" />
                )}
              </div>
            )}
          </CardContent>
        <Dialog open={optDialog} onOpenChange={setOptDialog}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>ลดขนาดภาพ (จำลอง)</DialogTitle>
            </DialogHeader>
            {optImage && (
              <div className="flex flex-col items-center space-y-2">
                <Image src={optImage} alt={optName} width={200} height={200} className="rounded-md object-cover" />
                <p className="text-sm">ความละเอียดใหม่: 300x300</p>
              </div>
            )}
          </DialogContent>
        </Dialog>
        </Card>
      </div>
    </div>
  )
}
