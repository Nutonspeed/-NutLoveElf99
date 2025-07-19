"use client"
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Input } from '@/components/ui/inputs/input'
import { Button } from '@/components/ui/buttons/button'
import { addStoredFile } from '@/lib/mock/files'

export default function SlipUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const params = useSearchParams()
  const orderId = params.get('orderId') || undefined
  const router = useRouter()

  const handleUpload = () => {
    if (!file) return
    addStoredFile({
      name: file.name,
      type: 'slip',
      user: 'customer',
      orderId,
      url: URL.createObjectURL(file),
    })
    router.back()
  }

  const preview = file && file.type.startsWith('image') ? (
    <Image
      src={URL.createObjectURL(file)}
      alt="slip preview"
      width={300}
      height={300}
      className="border"
    />
  ) : file ? (
    <p className="text-sm">{file.name}</p>
  ) : null

  return (
    <div className="container mx-auto space-y-4 p-4">
      <h1 className="text-2xl font-bold">อัปโหลดสลิปโอนเงิน</h1>
      <Input
        type="file"
        accept=".jpg,.png,.pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      {preview}
      <Button onClick={handleUpload} disabled={!file}>
        บันทึกสลิป
      </Button>
    </div>
  )
}
