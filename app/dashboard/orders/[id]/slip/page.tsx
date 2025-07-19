"use client"
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/buttons/button'
import { getFilesByOrder, markReviewed, loadStoredFiles, StoredFile } from '@/lib/mock/files'

export default function OrderSlipPage() {
  const { id } = useParams<{ id: string }>()
  const [file, setFile] = useState<StoredFile | null>(null)

  useEffect(() => {
    loadStoredFiles()
    const f = getFilesByOrder(id, 'slip')[0]
    if (f) setFile(f)
  }, [id])

  if (!file) return <div className="p-4">ไม่พบสลิป</div>

  const isImage = file.name.match(/\.(jpg|jpeg|png)$/i)

  const review = () => {
    markReviewed(file.id)
    setFile({ ...file, status: 'reviewed' })
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">สลิปออเดอร์ {id}</h1>
      {isImage ? (
        <Image src={file.url || '/placeholder.svg'} alt={file.name} width={400} height={400} className="border" />
      ) : (
        <p>{file.name}</p>
      )}
      <div className="space-x-2">
        <Button variant="outline">ดูเต็มจอ</Button>
        <Button variant="outline">ดาวน์โหลด</Button>
        {file.status === 'pending' && (
          <Button onClick={review}>ทำเครื่องหมายตรวจแล้ว</Button>
        )}
      </div>
      <p className="text-sm">สถานะ: {file.status === 'pending' ? 'รอตรวจสอบ' : 'ตรวจแล้ว'}</p>
    </div>
  )
}
