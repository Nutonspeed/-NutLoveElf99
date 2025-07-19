"use client"

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Input } from '@/components/ui/inputs/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useAdminProducts } from '@/contexts/admin-products-context'
import { useAdminProductGroups } from '@/contexts/admin-product-groups-context'
import type { Product } from '@/types/product'

export default function AdminProductGroupsPage() {
  const { products } = useAdminProducts()
  const { groups, addGroup } = useAdminProductGroups()
  const [name, setName] = useState('')
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  const handleAdd = () => {
    if (!name || selected.length === 0) return
    addGroup({ name, productIds: selected, preview: '/placeholder.svg?height=100&width=100' })
    setName('')
    setSelected([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/products">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">กลุ่มสินค้าเสริม</h1>
        </div>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>สร้างกลุ่มใหม่</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="ชื่อกลุ่ม" value={name} onChange={(e) => setName(e.target.value)} />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-40 overflow-y-auto border p-2 rounded">
              {products.map((p: Product) => (
                <label key={p.id} className="flex items-center space-x-2 text-sm">
                  <Checkbox checked={selected.includes(p.id)} onCheckedChange={() => toggle(p.id)} id={`cb-${p.id}`} />
                  <span>{p.name}</span>
                </label>
              ))}
            </div>
            <Button onClick={handleAdd}>บันทึก</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>รายการกลุ่มสินค้า</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {groups.map((g) => (
                <li key={g.id} className="border p-2 rounded">
                  <p className="font-medium">{g.name}</p>
                  <p className="text-sm text-gray-600">{g.productIds.length} รายการ</p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
