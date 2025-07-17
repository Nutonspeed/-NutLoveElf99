"use client"

import { useState, useEffect } from "react"
import { getCollections } from "@/lib/mock-collections"
import { Button } from "@/components/ui/buttons/button"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"
import type { Collection } from "@/types/collection"
import CollectionFormDialog from "@/components/admin/collections/CollectionFormDialog"
import CollectionsTable from "@/components/admin/collections/CollectionsTable"

interface CollectionWithFabrics extends Collection {
  fabrics: { id: string; name: string }[]
}

export default function AdminCollectionsPage() {
  const [collections, setCollections] = useState<CollectionWithFabrics[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCollection, setEditingCollection] = useState<CollectionWithFabrics | null>(null)

  useEffect(() => {
    const fetchCollections = async () => {
      const cols = await getCollections()
      setCollections(
        cols.map((c) => ({ ...c, fabrics: [] })) as CollectionWithFabrics[],
      )
    }
    fetchCollections()
  }, [])

  const handleSave = (values: Collection) => {
    if (editingCollection) {
      setCollections(prev => prev.map(c => (c.id === editingCollection.id ? { ...c, ...values } : c)))
    } else {
      const newCollection: CollectionWithFabrics = {
        ...values,
        id: Date.now().toString(),
        fabrics: [],
      }
      setCollections(prev => [...prev, newCollection])
    }
    setIsDialogOpen(false)
    setEditingCollection(null)
  }

  const openEditDialog = (collection: CollectionWithFabrics) => {
    setEditingCollection(collection)
    setIsDialogOpen(true)
  }

  const handleDeleteCollection = (id: string) => {
    setCollections(prev => prev.filter(c => c.id !== id))
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
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingCollection(null); setIsDialogOpen(true) }}>
              <Plus className="mr-2 h-4 w-4" />
              เพิ่มคอลเลกชันใหม่
            </Button>
          </DialogTrigger>
          <CollectionFormDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            defaultValues={editingCollection}
            onSave={handleSave}
          />
        </div>

        <CollectionsTable
          collections={filteredCollections}
          searchTerm={searchTerm}
          onSearchTermChange={setSearchTerm}
          onEdit={openEditDialog}
          onDelete={handleDeleteCollection}
        />
      </div>

    </div>
  )
}
