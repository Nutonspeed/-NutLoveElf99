"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/buttons/button'
import { mockProducts } from '@/lib/mock-products'
import { addImportExportLog } from '@/lib/mock-import-log'

interface Row { [key: string]: string }

export default function ImportProductsPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [headers, setHeaders] = useState<string[]>([])
  const [rows, setRows] = useState<Row[]>([])
  const [map, setMap] = useState<{name:string;price:string;stock:string}>({name:'',price:'',stock:''})

  const parseFile = async () => {
    if (!file) return
    const text = await file.text()
    const lines = text.trim().split(/\r?\n/).map(l => l.split(','))
    const h = lines.shift() || []
    setHeaders(h)
    setRows(lines.map(line => {
      const obj: Row = {}
      h.forEach((k,i)=>{ obj[k]=line[i] || '' })
      return obj
    }))
    setMap({name:h[0]||'',price:h[1]||'',stock:h[2]||''})
  }

  const handleImport = () => {
    rows.forEach((r,i) => {
      mockProducts.push({
        id: Date.now().toString() + i,
        slug: r[map.name].toLowerCase().replace(/\s+/g,'-'),
        name: r[map.name],
        description: '',
        price: Number(r[map.price]||0),
        images: ['/placeholder.svg?height=400&width=400'],
        category: '',
        collectionId: '',
        sizes: [],
        colors: [],
        inStock: Number(r[map.stock]||0) > 0,
        rating: 0,
        reviews: 0,
        features: [],
        material: '',
        care: [],
        status: 'active',
        tags: [],
        curated: false,
      })
    })
    addImportExportLog(file?.name || 'import.csv', rows.length)
    router.push('/dashboard/products')
  }

  const preview = rows.map(r => ({
    name: r[map.name],
    price: r[map.price],
    stock: r[map.stock],
  }))

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Import Products from CSV</h1>
      <input type="file" accept=".csv" onChange={e=>setFile(e.target.files?.[0]||null)} />
      <Button onClick={parseFile} disabled={!file}>Preview</Button>
      {preview.length > 0 && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <label>name</label>
            <select className="border p-2" value={map.name} onChange={e=>setMap({...map,name:e.target.value})}>
              {headers.map(h=> <option key={h} value={h}>{h}</option>)}
            </select>
            <label>price</label>
            <select className="border p-2" value={map.price} onChange={e=>setMap({...map,price:e.target.value})}>
              {headers.map(h=> <option key={h} value={h}>{h}</option>)}
            </select>
            <label>stock</label>
            <select className="border p-2" value={map.stock} onChange={e=>setMap({...map,stock:e.target.value})}>
              {headers.map(h=> <option key={h} value={h}>{h}</option>)}
            </select>
          </div>
          <table className="table-auto border w-full">
            <thead>
              <tr><th>name</th><th>price</th><th>stock</th></tr>
            </thead>
            <tbody>
              {preview.map((r,i)=>(
                <tr key={i}><td>{r.name}</td><td>{r.price}</td><td>{r.stock}</td></tr>
              ))}
            </tbody>
          </table>
          <Button onClick={handleImport}>Import</Button>
        </div>
      )}
    </div>
  )
}
