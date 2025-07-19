"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/buttons/button'
import { mockProducts } from '@/lib/mock-products'
import { addImportExportLog } from '@/lib/mock-import-log'

interface Row { id: string; price: number; stock: number }

export default function BulkUpdateProductsPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [rows, setRows] = useState<Row[]>([])

  const parseFile = async () => {
    if (!file) return
    const text = await file.text()
    const lines = text.trim().split(/\r?\n/).map(l => l.split(','))
    lines.shift()
    setRows(lines.map(l => ({ id: l[0], price: Number(l[1]||0), stock: Number(l[2]||0) })))
  }

  const apply = () => {
    rows.forEach(r => {
      const p = mockProducts.find(p => p.id === r.id)
      if (p) {
        p.price = r.price
        p.inStock = r.stock > 0
      }
    })
    addImportExportLog(file?.name || 'update.csv', rows.length)
    router.push('/dashboard/products')
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Bulk Update Products</h1>
      <input type="file" accept=".csv" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <Button onClick={parseFile} disabled={!file}>Preview</Button>
      {rows.length > 0 && (
        <div className="space-y-4">
          <table className="table-auto border w-full">
            <thead><tr><th>ID</th><th>Price</th><th>Stock</th></tr></thead>
            <tbody>
              {rows.map((r,i)=>(<tr key={i}><td>{r.id}</td><td>{r.price}</td><td>{r.stock}</td></tr>))}
            </tbody>
          </table>
          <Button onClick={apply}>Apply Update</Button>
        </div>
      )}
    </div>
  )
}
