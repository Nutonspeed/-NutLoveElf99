"use client"
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { fabrics } from '@/mock/fabrics'
import { Button } from '@/components/ui/buttons/button'

export default function FabricDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const fabric = fabrics.find(f => f.id === id)

  if (!fabric) return <div className="p-8">กำลังโหลด...</div>

  return (
    <div className="container mx-auto py-8 space-y-4">
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => router.back()}>กลับ</Button>
        <Button onClick={() => router.push(`/dashboard/fabrics/edit/${id}`)}>แก้ไข</Button>
      </div>
      <div className="space-y-2">
        <div className="relative w-64 h-64">
          <Image src={fabric.imageUrl} alt={fabric.name} fill className="object-cover rounded" />
        </div>
        <h1 className="text-xl font-bold">{fabric.name}</h1>
        {fabric.variants?.length ? (
          <ul className="list-disc pl-4 text-sm">
            {fabric.variants.map((v, i) => (
              <li key={i}>{v.color} - {v.size}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">ไม่มีตัวเลือก</p>
        )}
      </div>
    </div>
  )
}
