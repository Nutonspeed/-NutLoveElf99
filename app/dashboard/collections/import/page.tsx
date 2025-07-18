"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import JSZip from 'jszip'
import { collections, addCollection } from '@/mock/collections'
import { Button } from '@/components/ui/buttons/button'

interface Preview { name: string }

export default function ImportCollectionsPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState<Preview[]>([])

  const handleRead = async () => {
    if (!file) return
    if (!file.name.endsWith('.zip')) {
      setError('ไฟล์ต้องเป็น .zip')
      return
    }
    try {
      const zip = await JSZip.loadAsync(await file.arrayBuffer())
      const names = new Set<string>()
      Object.values(zip.files).forEach(f => {
        const [dir] = f.name.split('/')
        if (dir) names.add(dir)
      })
      const arr = Array.from(names)
      if (arr.length === 0) {
        setError('ไม่พบข้อมูลใน zip')
        return
      }
      setPreview(arr.map((n, i) => ({ name: n || `collection_${String(i+1).padStart(3,'0')}` })))
    } catch {
      setError('อ่านไฟล์ไม่สำเร็จ')
    }
  }

  const handleSave = () => {
    preview.forEach(p => addCollection({ name: p.name }))
    router.push('/dashboard/collections')
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">นำเข้าคอลเลกชัน</h1>
      <input type="file" accept=".zip" onChange={e => { setError(''); setPreview([]); setFile(e.target.files?.[0] || null) }} />
      <Button onClick={handleRead} disabled={!file}>อ่านไฟล์</Button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {preview.length > 0 && (
        <div className="space-y-2">
          <ul className="list-disc pl-5">
            {preview.map(p => <li key={p.name}>{p.name}</li>)}
          </ul>
          <Button onClick={handleSave}>บันทึก</Button>
        </div>
      )}
    </div>
  )
}
