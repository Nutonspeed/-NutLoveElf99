"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowLeft, Edit, Plus, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Fabric {
  id: string
  name: string
  collection_id: string
  image_urls: string[]
  price_min: number
  price_max: number
  collection_name?: string | null
}

export default function AdminFabricsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [fabrics, setFabrics] = useState<Fabric[]>([])

  const handleDelete = async (id: string) => {
    if (!window.confirm("คุณต้องการลบลายผ้านี้ใช่หรือไม่?")) return

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
      if (!supabase) return
      const { data: fabricsData, error } = await supabase
        .from("fabrics")
        .select("id, name, collection_id, image_urls, price_min, price_max")
      if (error || !fabricsData) {
        console.error("Failed to fetch fabrics", error)
        return
      }
      const { data: collectionsData } = await supabase
        .from("collections")
        .select("id, name")
      const collectionMap: Record<string, string> = {}
      collectionsData?.forEach((c) => {
        collectionMap[c.id] = c.name
      })
      const withCollectionName = fabricsData.map((f) => ({
        ...f,
        collection_name: collectionMap[f.collection_id] || null,
      }))
      setFabrics(withCollectionName)
    }
    fetchFabrics()
  }, [])

  if (!isAuthenticated || user?.role !== "admin") {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/admin">
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
            <CardTitle>รายการผ้า ({fabrics.length})</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            {fabrics.length > 0 ? (
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
                  {fabrics.map((fabric) => (
                    <TableRow key={fabric.id}>
                      <TableCell>
                        {fabric.image_urls?.[0] && (
                          <Image
                            src={fabric.image_urls[0]}
                            alt={fabric.name}
                            width={50}
                            height={50}
                            className="rounded-md object-cover"
                          />
                        )}
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
              <div className="text-center py-8">ยังไม่มีผ้าในระบบ</div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
