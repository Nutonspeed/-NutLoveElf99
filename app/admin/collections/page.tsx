"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { getCollections } from "@/lib/mock-collections"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/modals/dialog"
import { Form } from "@/components/ui/form"
import { ArrowLeft, Plus, Edit, Trash2, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Collection } from "@/types/collection"
import { CollectionForm } from "@/components/collection/CollectionForm"

interface CollectionWithFabrics extends Collection {
  fabrics: { id: string; name: string }[]
}

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<CollectionWithFabrics[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCollection, setEditingCollection] = useState<CollectionWithFabrics | null>(null)
  const form = useForm<Collection>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      priceRange: "",
      images: [],
      id: "",
    },
  })

  useEffect(() => {
    const fetchCollections = async () => {
      const cols = await getCollections()
      setCollections(
        cols.map((c) => ({ ...c, fabrics: [] })) as CollectionWithFabrics[],
      )
    }
    fetchCollections()
  }, [])

  const resetForm = () => {
    form.reset({ id: "", name: "", slug: "", description: "", priceRange: "", images: [] })
  }

  const handleSubmit = (values: Collection) => {
    if (editingCollection) {
      setCollections((prev) =>
        prev.map((c) =>
          c.id === editingCollection.id ? { ...c, ...values } : c,
        ),
      )
    } else {
      const newCollection: CollectionWithFabrics = {
        ...values,
        id: Date.now().toString(),
        fabrics: [],
      }
      setCollections((prev) => [...prev, newCollection])
    }
    setIsDialogOpen(false)
    setEditingCollection(null)
    resetForm()
  }

  const openEditDialog = (collection: CollectionWithFabrics) => {
    setEditingCollection(collection)
    form.reset(collection)
    setIsDialogOpen(true)
  }

  const handleDeleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id))
  }

  const filteredCollections = collections.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
              <h1 className="text-3xl font-bold">จัดการคอลเลกชัน</h1>
              <p className="text-gray-600">เพิ่ม แก้ไข และลบคอลเลกชันลายผ้า</p>
            </div>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  resetForm()
                  setEditingCollection(null)
                  setIsDialogOpen(true)
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                เพิ่มคอลเลกชันใหม่
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingCollection ? "แก้ไขคอลเลกชัน" : "เพิ่มคอลเลกชันใหม่"}
                </DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <CollectionForm form={form} onSubmit={handleSubmit} />
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>รายการคอลเลกชัน ({filteredCollections.length})</CardTitle>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="ค้นหา..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>รูปปก</TableHead>
                  <TableHead>ชื่อ</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>คำอธิบาย</TableHead>
                  <TableHead>ลายผ้า</TableHead>
                  <TableHead className="text-right">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCollections.map((collection) => (
                  <TableRow key={collection.id}>
                    <TableCell>
                      <Image
                        src={collection.images[0] || "/placeholder.svg"}
                        alt={collection.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell>{collection.name}</TableCell>
                    <TableCell>{collection.slug}</TableCell>
                    <TableCell className="line-clamp-2 max-w-xs">{collection.description}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {collection.fabrics.map((f) => f.name).join(', ') || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="outline" size="icon" onClick={() => openEditDialog(collection)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteCollection(collection.id)}
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
            {filteredCollections.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">ไม่พบคอลเลกชันที่ตรงกับเงื่อนไขการค้นหา</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
