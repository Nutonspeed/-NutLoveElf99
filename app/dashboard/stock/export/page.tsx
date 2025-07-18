"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import { downloadExcel } from '@/lib/mock-export'
import { mockStock } from '@/lib/mock-stock'

export default function ExportStockPage() {
  const categories = Array.from(new Set(mockStock.map(i => i.category)))
  const [cat, setCat] = useState('all')

  const handleExport = () => {
    const rows = cat === 'all' ? mockStock : mockStock.filter(i => i.category === cat)
    downloadExcel(rows, 'stock.xlsx')
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">ส่งออกสต๊อก</h1>
      <div className="flex gap-2 max-w-sm">
        <Select value={cat} onValueChange={setCat}>
          <SelectTrigger className="w-32">{cat === 'all' ? 'ทุกหมวด' : cat}</SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทุกหมวด</SelectItem>
            {categories.map(c => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleExport}>ดาวน์โหลด</Button>
      </div>
    </div>
  )
}
