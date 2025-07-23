"use client"
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Input } from '@/components/ui/inputs/input'
import { Button } from '@/components/ui/buttons/button'
import { addStoredFile } from '@/lib/mock/files'

export default function OrderAttachPage() {
  const { id } = useParams<{ id: string }>()
  const [file, setFile] = useState<File | null>(null)

  const handleUpload = () => {
    if (!file) return
    addStoredFile({
      name: file.name,
      type: 'attachment',
      user: 'admin',
      orderId: id,
      url: URL.createObjectURL(file),
      status: 'reviewed',
    })
    setFile(null)
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">แนบไฟล์ให้คำสั่งซื้อ {id}</h1>
      <Input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
      {file && <p className="text-sm">{file.name}</p>}
      <Button onClick={handleUpload} disabled={!file}>บันทึกไฟล์</Button>
    </div>
  )
}
