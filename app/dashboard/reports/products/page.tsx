"use client"
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { mockOrders } from '@/lib/mock-orders'
import { mockProducts } from '@/lib/mock-products'
import { collections } from '@/mock/collections'

export default function DashboardReportProducts() {
  const categories = Array.from(new Set(mockProducts.map(p => p.category)))
  const [category, setCategory] = useState<string>('all')
  const [collection, setCollection] = useState<string>('all')

  const data = useMemo(() => {
    const counts: Record<string, number> = {}
    mockOrders.forEach(o => {
      o.items.forEach(i => {
        counts[i.productName] = (counts[i.productName] || 0) + i.quantity
      })
    })
    return mockProducts
      .filter(p => (category === 'all' || p.category === category) && (collection === 'all' || p.collectionId === collection))
      .map(p => ({ name: p.name, count: counts[p.name] || 0 }))
      .sort((a,b) => b.count - a.count)
  }, [category, collection])

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">รายงานสินค้า (mock)</h1>
      <div className="flex gap-2">
        <select className="border rounded p-2" value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="all">ทุกหมวดหมู่</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="border rounded p-2" value={collection} onChange={e=>setCollection(e.target.value)}>
          <option value="all">ทุกคอลเลกชัน</option>
          {collections.map(col => <option key={col.id} value={col.id}>{col.name}</option>)}
        </select>
      </div>
      {data.length > 0 ? (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" hide />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="text-center text-muted-foreground">ไม่มีข้อมูล</p>
      )}
    </div>
  )
}
