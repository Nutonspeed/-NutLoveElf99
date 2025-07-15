"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { mockFabrics } from "@/lib/mock-fabrics"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
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
}

export default function AdminFabricsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [fabrics, setFabrics] = useState<Fabric[]>([])
  const [imgError, setImgError] = useState<Record<string, boolean>>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [collectionFilter, setCollectionFilter] = useState("all")
  const [collectionOptions, setCollectionOptions] = useState<{id: string; name: string}[]>([])

  const handleDelete = (id: string) => {
    if (
      typeof window !== "undefined" &&
      !window.confirm("คุณต้องการลบลายผ้านี้ใช่หรือไม่?")
    )
      return

    setFabrics((prev) => prev.filter((f) => f.id !== id))
    toast({ title: "ลบลายผ้าแล้ว" })
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
    setFabrics(
      mockFabrics.map((f) => ({
        id: f.id,
        name: f.name,
        sku: f.sku,
        collection_id: f.collectionSlug,
        image_url: f.images[0],
        price_min: f.price,
        price_max: f.price,
        collection_name: f.collectionSlug,
      }))
    )
    const collections = Array.from(new Set(mockFabrics.map((f) => f.collectionSlug))).map(
      (slug) => ({ id: slug, name: slug })
    )
    setCollectionOptions(collections)
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
                    placeholder="ค้นหา..."
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
            {filteredFabrics.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>รูปภาพ</TableHead>
                    <TableHead>ชื่อผ้า</TableHead>
                    <TableHead>ราคา</TableHead>
                    <TableHead>คอลเลกชัน</TableHead>
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
              <div className="text-center py-8">
                {fabrics.length === 0
                  ? "ยังไม่มีผ้าในระบบ"
                  : "ไม่พบผ้าที่ตรงกับเงื่อนไขการค้นหา"}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
