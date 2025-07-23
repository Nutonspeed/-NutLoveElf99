"use client"
import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import { addStoredFile } from '@/lib/mock/files'

export default function VerifyIdPage() {
  const [files, setFiles] = useState<File[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(Array.from(e.target.files || []))
  }

  const handleSubmit = () => {
    files.forEach(f =>
      addStoredFile({
        name: f.name,
        type: 'id',
        user: 'customer',
        url: URL.createObjectURL(f),
      }),
    )
    setFiles([])
  }

  return (
    <div className="container mx-auto space-y-4 p-4">
      <h1 className="text-2xl font-bold">อัปโหลดเอกสารยืนยันตัวตน</h1>
      <Input type="file" multiple onChange={handleChange} />
      <div className="flex flex-wrap gap-2">
        {files.map(f =>
          f.type.startsWith('image') ? (
            <Image key={f.name} src={URL.createObjectURL(f)} alt={f.name} width={120} height={120} className="border" />
          ) : (
            <p key={f.name} className="text-sm">{f.name}</p>
          ),
        )}
      </div>
      <Button onClick={handleSubmit} disabled={files.length === 0}>ส่งเอกสาร</Button>
    </div>
  )
}
