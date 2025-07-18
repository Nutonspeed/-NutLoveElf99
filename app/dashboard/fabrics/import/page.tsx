"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import JSZip from 'jszip'
import { addFabric } from '@/mock/fabrics'
import { Button } from '@/components/ui/buttons/button'

export default function ImportFabricPage() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleImport = async () => {
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
      let i = 1
      for (const name of entries) {
        const fabricName = `fabric_${String(i).padStart(3,'0')}`
        addFabric({ name: fabricName, imageUrl: `/mock/${name}`, collectionId: '' })
        i++
      }
      setDone(true)
    } catch (e) {
      setError('เกิดข้อผิดพลาดในการอ่านไฟล์')
    }
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">นำเข้าลายผ้าจาก ZIP</h1>
      <input type="file" accept=".zip" onChange={e => { setError(''); setFile(e.target.files?.[0] || null) }} />
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <Button onClick={handleImport} disabled={!file || done}>นำเข้า</Button>
      {done && (
        <Button onClick={() => router.push('/dashboard/fabrics')}>เสร็จสิ้น</Button>
      )}
    </div>
  )
}
