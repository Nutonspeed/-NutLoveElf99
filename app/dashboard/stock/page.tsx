"use client"
import { useState } from 'react'
import { mockStock, StockItem } from '@/lib/mock-stock'
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select'
import { Input } from '@/components/ui/inputs/input'
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table'
import { StockAlertSetting, getStockAlert, loadStockAlert } from '@/lib/mock-stock-settings'

export default function StockOverviewPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [items, setItems] = useState<StockItem[]>([...mockStock])
  const [setting, setSetting] = useState<StockAlertSetting>(() => {
    loadStockAlert()
    return getStockAlert()
  })

  const filtered = items.filter(i => {
    const matchName = i.name.toLowerCase().includes(query.toLowerCase())
    const matchCat = category === 'all' || i.category === category
    return matchName && matchCat
  })

  const rowStyle = (stock: number) => {
    if (stock === 0) return 'bg-red-50'
    if (stock < setting.threshold) return 'bg-orange-50'
    if (stock >= 10) return 'bg-green-50'
    return ''
  }

  const categories = Array.from(new Set(mockStock.map(i => i.category)))

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">สต๊อกสินค้า</h1>
      <div className="flex gap-2">
        <Input placeholder="ค้นหา" value={query} onChange={e=>setQuery(e.target.value)} />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-32">{category === 'all' ? 'ทุกหมวด' : category}</SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทุกหมวด</SelectItem>
            {categories.map(c=> (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ชื่อสินค้า</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead className="text-right">คงเหลือ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map(item => (
            <TableRow key={item.id} className={rowStyle(item.currentStock)}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell className="text-right">{item.currentStock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
