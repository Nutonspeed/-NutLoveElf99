"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { getCollections, addCollectionTag } from "@/lib/mock-collections"
import { mockFabrics } from "@/lib/mock-fabrics"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/modals/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { ArrowLeft, Plus, Edit, Trash2, Search } from "lucide-react"
import { Layers, Scissors } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Collection } from "@/types/collection"
import { addAdminLog } from "@/lib/mock-admin-logs"

interface CollectionWithFabrics extends Collection {
  fabrics: { id: string; name: string }[]
}

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<CollectionWithFabrics[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [mergeTarget, setMergeTarget] = useState<string | null>(null)
  const [mergeSource, setMergeSource] = useState<CollectionWithFabrics | null>(null)
  const [isMergeOpen, setIsMergeOpen] = useState(false)
  const [splitSource, setSplitSource] = useState<CollectionWithFabrics | null>(null)
  const [isSplitOpen, setIsSplitOpen] = useState(false)
  const [editingCollection, setEditingCollection] = useState<CollectionWithFabrics | null>(null)
  const form = useForm<Collection>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      priceRange: "",
      images: [],
      tags: [],
      id: "",
    },
  })

  useEffect(() => {
    const fetchCollections = async () => {
      const cols = await getCollections()
      const mapped = cols.map((c) => ({
        ...c,
        fabrics: mockFabrics
          .filter((f) => f.collectionSlug === c.slug)
          .map((f) => ({ id: f.id, name: f.name })),
      })) as CollectionWithFabrics[]
      setCollections(mapped)
    }
    fetchCollections()
  }, [])

  const resetForm = () => {
    form.reset({ id: "", name: "", slug: "", description: "", priceRange: "", images: [], tags: [] })
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

  const openMergeDialog = (source: CollectionWithFabrics) => {
    setMergeSource(source)
    setMergeTarget(null)
    setIsMergeOpen(true)
  }

  const openSplitDialog = (source: CollectionWithFabrics) => {
    setSplitSource(source)
    setIsSplitOpen(true)
  }

  const handleDeleteCollection = (id: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== id))
  }

  const filteredCollections = collections.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.fabrics.some((f) => f.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.tags || []).some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())),
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
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                  <FormField
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ชื่อคอลเลกชัน</FormLabel>
                        <FormControl>
                          <Input placeholder="ชื่อคอลเลกชัน" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="slug" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>คำอธิบาย</FormLabel>
                        <FormControl>
                          <Input placeholder="คำอธิบาย" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="priceRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ช่วงราคา</FormLabel>
                        <FormControl>
                          <Input placeholder="เช่น ฿100 - ฿300" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>รูปทั้งหมด (คั่นด้วย comma)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="url1,url2"
                            value={field.value.join(',')}
                            onChange={(e) => field.onChange(e.target.value.split(','))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>แท็ก (คั่นด้วย comma)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="tag1,tag2"
                            value={field.value.join(',')}
                            onChange={(e) => field.onChange(e.target.value.split(','))}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)} type="button">
                      ยกเลิก
                    </Button>
                    <Button type="submit">บันทึก</Button>
                  </div>
                </form>
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
                  <TableHead>แท็ก</TableHead>
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
                    <TableCell className="max-w-xs truncate">
                      {(collection.tags || []).join(', ') || '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="outline" size="icon" onClick={() => openEditDialog(collection)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => openMergeDialog(collection)}>
                          <Layers className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" onClick={() => openSplitDialog(collection)}>
                          <Scissors className="h-4 w-4" />
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
        <Dialog open={isMergeOpen} onOpenChange={setIsMergeOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>รวมคอลเลกชัน</DialogTitle>
            </DialogHeader>
            {mergeSource && (
              <div className="space-y-4">
                <p>เลือกคอลเลกชันที่จะรวมกับ {mergeSource.name}</p>
                <select
                  className="w-full border rounded p-2"
                  value={mergeTarget || ''}
                  onChange={(e) => setMergeTarget(e.target.value)}
                >
                  <option value="" disabled>
                    เลือกคอลเลกชัน
                  </option>
                  {collections
                    .filter((c) => c.id !== mergeSource.id)
                    .map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                </select>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsMergeOpen(false)}>
                    ยกเลิก
                  </Button>
                  <Button
                    onClick={() => {
                      if (mergeSource && mergeTarget) {
                        addAdminLog(`merge ${mergeSource.slug} -> ${mergeTarget}`, 'admin')
                      }
                      setIsMergeOpen(false)
                    }}
                  >
                    บันทึก
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
        <Dialog open={isSplitOpen} onOpenChange={setIsSplitOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>แยกคอลเลกชัน</DialogTitle>
            </DialogHeader>
            {splitSource && (
              <div className="space-y-4">
                <p>ยืนยันการแยกคอลเลกชัน {splitSource.name}</p>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsSplitOpen(false)}>
                    ยกเลิก
                  </Button>
                  <Button
                    onClick={() => {
                      if (splitSource) {
                        addAdminLog(`split ${splitSource.slug}`, 'admin')
                      }
                      setIsSplitOpen(false)
                    }}
                  >
                    บันทึก
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>

    </div>
  )
}
