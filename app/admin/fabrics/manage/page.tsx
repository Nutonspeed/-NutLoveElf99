"use client"

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Upload, FileDown } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { downloadCSV } from '@/lib/mock-export'
import { mockFabrics, type Fabric } from '@/lib/mock-fabrics'
import { mockFabricCategories, type FabricCategory } from '@/lib/mock-fabric-categories'
import * as XLSX from 'xlsx'

function CategoryTree({ items }: { items: FabricCategory[] }) {
  return (
    <ul className="ml-4 list-disc">
      {items.map((c) => (
        <li key={c.slug} className="mb-1">
          {c.name}
          {c.children && <CategoryTree items={c.children} />}
        </li>
      ))}
    </ul>
  )
}

export default function FabricManagePage() {
  const [items, setItems] = useState<Fabric[]>([...mockFabrics])
  const [preview, setPreview] = useState<Fabric[]>([])
  const [duplicates, setDuplicates] = useState<Record<string, boolean>>({})

  const handleDrag = (from: number, to: number) => {
    const updated = [...items]
    const [moved] = updated.splice(from, 1)
    updated.splice(to, 0, moved)
    setItems(updated)
  }

  const handleImport = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer)
      const wb = XLSX.read(data, { type: 'array' })
      const rows = XLSX.utils.sheet_to_json<any>(wb.Sheets[wb.SheetNames[0]])
      const mapped: Fabric[] = rows.map((r: any, idx: number) => ({
        id: `imp-${idx}`,
        name: r.name || '',
        slug: (r.slug || '').toString().trim(),
        sku: r.sku || '',
        color: r.color || '',
        price: Number(r.price) || 0,
        images: [r.image || '/placeholder.jpg'],
        collectionSlug: r.collection || '',
      }))
      const dup: Record<string, boolean> = {}
      mapped.forEach((m) => {
        if (items.some((f) => f.slug === m.slug)) dup[m.slug] = true
      })
      setDuplicates(dup)
      setPreview(mapped)
    }
    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/fabrics">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">จัดการภาพผ้า</h1>
        </div>
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>หมวดหมู่ผ้า</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryTree items={mockFabricCategories} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>รายการผ้า ({items.length})</CardTitle>
            <div className="space-x-2">
              <input
                id="file"
                type="file"
                accept=".xlsx,.xls"
                onChange={(e) => {
                  const f = e.target.files?.[0]
                  if (f) handleImport(f)
                }}
                className="hidden"
              />
              <label htmlFor="file">
                <Button variant="outline">
                  <Upload className="h-4 w-4 mr-2" /> นำเข้าไฟล์ลายผ้า
                </Button>
              </label>
              <Button onClick={() => downloadCSV(items, 'fabrics.csv')}>
                <FileDown className="h-4 w-4 mr-2" /> Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ภาพ</TableHead>
                  <TableHead>ชื่อ</TableHead>
                  <TableHead>Slug</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((f, idx) => (
                  <TableRow
                    key={f.slug}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', String(idx))
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      const from = Number(e.dataTransfer.getData('text/plain'))
                      handleDrag(from, idx)
                    }}
                  >
                    <TableCell>
                      <div className="w-20 h-20 relative">
                        <Image
                          src={f.images[0]}
                          alt={f.name}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                    </TableCell>
                    <TableCell>{f.name}</TableCell>
                    <TableCell>{f.slug}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {preview.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Preview Import</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ชื่อ</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>สถานะ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {preview.map((p) => (
                    <TableRow key={p.slug} className={duplicates[p.slug] ? 'bg-red-100' : ''}>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>{p.slug}</TableCell>
                      <TableCell>{duplicates[p.slug] ? 'ซ้ำ' : 'ใหม่'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
