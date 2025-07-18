"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { getCollections } from "@/lib/mock-collections"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/modals/dialog"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/modals/alert-dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Search,
  Split,
  Move,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Collection } from "@/types/collection"

interface CollectionWithFabrics extends Collection {
  fabrics: { id: string; name: string }[]
}

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<CollectionWithFabrics[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCollection, setEditingCollection] = useState<CollectionWithFabrics | null>(null)
  const [isSeoOpen, setIsSeoOpen] = useState(false)
  const [isMergeDialogOpen, setIsMergeDialogOpen] = useState(false)
  const [mergeFrom, setMergeFrom] = useState("")
  const [mergeTo, setMergeTo] = useState("")
  const [confirmAction, setConfirmAction] = useState<null | (() => void)>(null)
  const form = useForm<Collection>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      priceRange: "",
      images: [],
      metaTitle: "",
      metaDesc: "",
      isFeatured: false,
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
    form.reset({
      id: "",
      name: "",
      slug: "",
      description: "",
      priceRange: "",
      images: [],
      metaTitle: "",
      metaDesc: "",
      isFeatured: false,
    })
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

  const handleMerge = () => {
    const from = collections.find((c) => c.id === mergeFrom)
    const to = collections.find((c) => c.id === mergeTo)
    if (!from || !to) return
    to.fabrics = [...to.fabrics, ...from.fabrics]
    setCollections((prev) => prev.filter((c) => c.id !== from.id))
    setMergeDialogOpen(false)
    setConfirmAction(null)
    setMergeFrom("")
    setMergeTo("")
  }

  const handleSplit = (collection: CollectionWithFabrics) => {
    if (collection.fabrics.length === 0) return
    const newCol: CollectionWithFabrics = {
      ...collection,
      id: Date.now().toString(),
      name: `${collection.name} (ย่อย)`,
    }
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collection.id ? { ...c, fabrics: [] } : c,
      ).concat(newCol),
    )
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
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Meta title" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="metaDesc"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Meta Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Meta description" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel>แสดงบนหน้าแรก</FormLabel>
                      </FormItem>
                    )}
                  />
                  <Button type="button" variant="secondary" onClick={() => setIsSeoOpen(true)}>
                    แสดงตัวอย่าง SEO
                  </Button>
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
          <Dialog open={isSeoOpen} onOpenChange={setIsSeoOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>SEO Preview</DialogTitle>
              </DialogHeader>
              <div className="border rounded-md overflow-hidden">
                <Image
                  src={form.watch("images")[0] || "/placeholder.jpg"}
                  alt="preview"
                  width={600}
                  height={300}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4 space-y-1">
                  <p className="text-lg font-semibold">
                    {form.watch("metaTitle") || "Meta title"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {form.watch("metaDesc") || "Meta description"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    example.com/collections/{form.watch("slug") || "slug"}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={isMergeDialogOpen} onOpenChange={setIsMergeDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Move className="mr-2 h-4 w-4" />
                รวมคอลเลกชัน
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-sm space-y-4">
              {collections.length < 2 ? (
                <p className="text-center text-sm text-muted-foreground">
                  ไม่มีคอลเลกชันเพียงพอ
                </p>
              ) : (
                <>
                  <div>
                    <FormLabel>จาก</FormLabel>
                    <Select value={mergeFrom} onValueChange={setMergeFrom}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกคอลเลกชัน" />
                      </SelectTrigger>
                      <SelectContent>
                        {collections.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <FormLabel>ไปยัง</FormLabel>
                    <Select value={mergeTo} onValueChange={setMergeTo}>
                      <SelectTrigger>
                        <SelectValue placeholder="เลือกคอลเลกชัน" />
                      </SelectTrigger>
                      <SelectContent>
                        {collections.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            {c.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => setConfirmAction(() => handleMerge)}
                      disabled={!mergeFrom || !mergeTo || mergeFrom === mergeTo}
                    >
                      ถัดไป
                    </Button>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
          <AlertDialog open={!!confirmAction} onOpenChange={() => setConfirmAction(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>ยืนยันการทำรายการ</AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                <AlertDialogAction onClick={() => {
                  confirmAction?.()
                  setConfirmAction(null)
                }}>ยืนยัน</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
                        disabled={collection.fabrics.length === 0}
                        onClick={() => setConfirmAction(() => () => handleSplit(collection))}
                      >
                        <Split className="h-4 w-4" />
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
