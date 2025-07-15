"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { mockFabrics } from "@/lib/mock-fabrics"
import { useAdminCollections } from "@/contexts/admin-collections-context"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/modals/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { ArrowLeft, Plus, Edit, Trash2, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Collection } from "@/types/collection"

export default function AdminCollectionsPage() {
  const { collections, addCollection, updateCollection, deleteCollection } =
    useAdminCollections()
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCollection, setEditingCollection] = useState<Collection | null>(null)
  const [selected, setSelected] = useState<string[]>([])
  const { toast } = useToast()
  const form = useForm<Collection>({
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      priceRange: "",
      images: [],
      id: "",
      fabricIds: [],
    },
  })

  const resetForm = () => {
    form.reset({ id: "", name: "", slug: "", description: "", priceRange: "", images: [] })
    setSelected([])
  }

  const handleSubmit = (values: Collection) => {
    if (editingCollection) {
      updateCollection(editingCollection.id, { ...values, fabricIds: selected })
      toast({ title: "บันทึกการแก้ไขแล้ว" })
    } else {
      addCollection({ ...values, fabricIds: selected })
      toast({ title: "เพิ่มคอลเลกชันแล้ว" })
    }
    setIsDialogOpen(false)
    setEditingCollection(null)
    resetForm()
  }

  const openEditDialog = (collection: Collection) => {
    setEditingCollection(collection)
    form.reset(collection)
    setSelected(collection.fabricIds ?? [])
    setIsDialogOpen(true)
  }

  const handleDeleteCollection = (id: string) => {
    if (window.confirm("ยืนยันการลบคอลเลกชันนี้")) {
      deleteCollection(id)
      toast({ title: "ลบคอลเลกชันแล้ว" })
    }
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
                  setSelected([])
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
                  <div className="space-y-2">
                    <FormLabel>เลือกผ้าในคอลเลกชัน</FormLabel>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border p-2 rounded">
                      {mockFabrics.map((f) => (
                        <label key={f.id} className="flex items-center space-x-2 text-sm">
                          <input
                            type="checkbox"
                            className="h-4 w-4"
                            checked={selected.includes(f.id)}
                            onChange={() =>
                              setSelected((prev) =>
                                prev.includes(f.id)
                                  ? prev.filter((s) => s !== f.id)
                                  : [...prev, f.id],
                              )
                            }
                          />
                          <span>{f.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
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
                      {collection.fabricIds.length} ผ้า
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
            {collections.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">ยังไม่มีคอลเลกชัน</p>
              </div>
            )}
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
