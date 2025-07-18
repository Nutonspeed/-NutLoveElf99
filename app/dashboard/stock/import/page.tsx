"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/buttons/button'
import { mockStock, StockItem } from '@/lib/mock-stock'

export default function ImportStockPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [rows, setRows] = useState<StockItem[]>([])

  const handleRead = async () => {
    if (!file) return
    const XLSX = await import('xlsx')
    const buf = await file.arrayBuffer()
    const wb = XLSX.read(buf, { type: 'array' })
    const ws = wb.Sheets[wb.SheetNames[0]]
    const data: StockItem[] = XLSX.utils.sheet_to_json(ws)
    setRows(data)
  }

  const handleSave = () => {
    rows.forEach(r => mockStock.push(r))
    alert('imported')
    router.push('/dashboard/stock')
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">นำเข้าสต๊อกจาก Excel</h1>
      <input type="file" accept=".xlsx" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <Button onClick={handleRead} disabled={!file}>preview</Button>
      {rows.length > 0 && (
        <div>
          <p>พบ {rows.length} รายการ</p>
          <Button onClick={handleSave}>บันทึก</Button>
        </div>
      )}
    </div>
  )
}
