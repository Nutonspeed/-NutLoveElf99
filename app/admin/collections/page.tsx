"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { ArrowLeft, Plus, Edit, Trash2, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Collection } from "@/data/mock-collections"

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
      cover_image_url: "",
      id: "",
    },
  })

  useEffect(() => {
    const fetchCollections = async () => {
      if (!supabase) return
      const { data: cols } = await supabase
        .from("collections")
        .select("id, name, slug, description, cover_image_url")
      if (!cols) return
      const { data: fabs } = await supabase
        .from("fabrics")
        .select("id, name, collection_id")
      const map: Record<string, { id: string; name: string }[]> = {}
      fabs?.forEach((f) => {
        if (!map[f.collection_id]) map[f.collection_id] = []
        map[f.collection_id].push({ id: f.id, name: f.name })
      })
      setCollections(
        cols.map((c) => ({ ...c, fabrics: map[c.id] || [] })) as CollectionWithFabrics[],
      )
    }
    fetchCollections()
  }, [])

  const resetForm = () => {
    form.reset({ id: "", name: "", slug: "", description: "", cover_image_url: "" })
  }

  const handleSubmit = async (values: Collection) => {
    if (!supabase) return
    if (editingCollection) {
      const { data, error } = await supabase
        .from("collections")
        .update({
          name: values.name,
          slug: values.slug,
          description: values.description,
          cover_image_url: values.cover_image_url,
        })
        .eq("id", editingCollection.id)
        .select()
        .single()
      if (!error && data) {
        setCollections((prev) =>
          prev.map((c) => (c.id === editingCollection.id ? data : c)),
        )
      }
    } else {
      const { data, error } = await supabase
        .from("collections")
        .insert({
          name: values.name,
          slug: values.slug,
          description: values.description,
          cover_image_url: values.cover_image_url,
        })
        .select()
        .single()
      if (!error && data) {
        setCollections((prev) => [...prev, data])
      }
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

  const handleDeleteCollection = async (id: string) => {
    if (!supabase) return
    const previous = collections
    setCollections(collections.filter((c) => c.id !== id))
    const { error } = await supabase.from("collections").delete().eq("id", id)
    if (error) {
      setCollections(previous)
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
                    name="cover_image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ลิงก์รูปปก</FormLabel>
                        <FormControl>
                          <Input placeholder="URL รูปปก" {...field} />
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
                  <TableHead className="text-right">การจัดการ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCollections.map((collection) => (
                  <TableRow key={collection.id}>
                    <TableCell>
                      <Image
                        src={collection.cover_image_url || "/placeholder.svg"}
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
