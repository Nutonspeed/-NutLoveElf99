"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import JSZip from 'jszip'
import { addCollection, collections } from '@/mock/collections'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'

type ImportItem = { name: string; preview: string }

export default function ImportCollectionsPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [items, setItems] = useState<ImportItem[]>([])
  const [error, setError] = useState('')

  const handleLoad = async () => {
    if (!file) return
    if (!file.name.endsWith('.zip')) {
      setError('ไฟล์ต้องเป็น .zip')
      return
    }
    try {
      const zip = await JSZip.loadAsync(await file.arrayBuffer())
      const entries = Object.keys(zip.files).filter(n => /\.(jpg|png|webp)$/i.test(n))
      if (entries.length === 0) {
        setError('ไม่พบไฟล์ภาพใน zip')
        return
      }
      const list: ImportItem[] = []
      let i = 1
      for (const name of entries) {
        const blob = await zip.files[name].async('blob')
        const url = URL.createObjectURL(blob)
        list.push({ name: `collection_${String(i).padStart(3,'0')}`, preview: url })
        i++
      }
      setItems(list)
      setError('')
    } catch (e) {
      setError('เกิดข้อผิดพลาดในการอ่านไฟล์')
    }
  }

  const handleSave = () => {
    let baseOrder = collections.length
    items.forEach((item, idx) => {
      const name = item.name.trim() || `collection_${String(idx+1).padStart(3,'0')}`
      addCollection({ name })
    })
    router.push('/dashboard/collections')
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">นำเข้าคอลเลกชันจาก ZIP</h1>
      <input type="file" accept=".zip" onChange={e => { setFile(e.target.files?.[0] || null); setItems([]); setError('') }} />
      <Button onClick={handleLoad} disabled={!file}>แตกไฟล์</Button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {items.length > 0 && (
        <div className="space-y-4">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-2">
              <div className="relative w-16 h-16 border rounded overflow-hidden bg-gray-100">
                <Image src={item.preview} alt={item.name} fill className="object-cover" />
              </div>
              <Input value={item.name} onChange={e => {
                const list = items.slice();
                list[idx].name = e.target.value;
                setItems(list);
              }} />
            </div>
          ))}
          <Button onClick={handleSave}>บันทึก</Button>
        </div>
      )}
    </div>
  )
}
