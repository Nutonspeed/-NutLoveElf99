"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import PageWrapper from '@/components/admin/PageWrapper'
import { Input } from '@/components/ui/inputs/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { useToast } from '@/hooks/use-toast'
import { useBillStore } from '@/stores/billStore'
import { genBillId } from '@/lib/genBillId'
import type { Fabric } from '@/mock/fabrics'
import { getFabrics } from '@/core/mock/store'

export default function AdminBillCreatePage() {
  const router = useRouter()
  const { toast } = useToast()
  const addBill = useBillStore(s => s.addBill)

  const [fabrics, setFabrics] = useState<Fabric[]>([])
  const [customerName, setCustomerName] = useState('')
  const [fabricId, setFabricId] = useState('')
  const [sofaType, setSofaType] = useState('1-seater')
  const [customSizeNote, setCustomSizeNote] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [tag, setTag] = useState('ด่วน')

  useEffect(() => {
    setFabrics(getFabrics())
  }, [])

  const pricePerItem = 299
  const total = quantity * pricePerItem

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerName || !fabricId || quantity <= 0) return

    const id = genBillId()
    addBill({
      id,
      customer: customerName,
      items: `fabric:${fabricId};sofa:${sofaType};note:${customSizeNote}`,
      amount: total,
      status: 'draft',
    })
    toast({ title: 'สร้างบิลสำเร็จ' })
    router.push(`/admin/bill/${id}`)
  }

  return (
    <PageWrapper
      title="สร้างบิลใหม่"
      breadcrumb={[
        { title: 'แดชบอร์ด', href: '/admin' },
        { title: 'บิล', href: '/admin/bills' },
        { title: 'สร้างใหม่' },
      ]}
    >
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
        <div className="space-y-2">
          <label className="text-sm">ชื่อลูกค้า</label>
          <Input value={customerName} onChange={e => setCustomerName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm">ลายผ้า</label>
          <Select value={fabricId} onValueChange={setFabricId}>
            <SelectTrigger>
              <SelectValue placeholder="เลือกลายผ้า" />
            </SelectTrigger>
            <SelectContent>
              {fabrics.map(f => (
                <SelectItem key={f.id} value={f.id}>
                  <div className="flex items-center gap-2">
                    <Image src={f.imageUrl} alt={f.name} width={40} height={40} className="rounded" />
                    <span>{f.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm">ประเภทโซฟา</label>
          <Select value={sofaType} onValueChange={setSofaType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-seater">1 ที่นั่ง</SelectItem>
              <SelectItem value="2-seater">2 ที่นั่ง</SelectItem>
              <SelectItem value="L-shape">L shape</SelectItem>
              <SelectItem value="custom">กำหนดเอง</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {sofaType === 'custom' && (
          <div className="space-y-2">
            <label className="text-sm">ระบุขนาด</label>
            <Textarea value={customSizeNote} onChange={e => setCustomSizeNote(e.target.value)} />
          </div>
        )}
        <div className="space-y-2">
          <label className="text-sm">จำนวน</label>
          <Input type="number" min={1} value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
        </div>
        <div className="space-y-2">
          <label className="text-sm">แท็ก</label>
          <Select value={tag} onValueChange={setTag}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ด่วน">ด่วน</SelectItem>
              <SelectItem value="สั่งตัด">สั่งตัด</SelectItem>
              <SelectItem value="พร้อมส่ง">พร้อมส่ง</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>สรุปยอด</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>ราคาต่อชิ้น</span>
              <span>฿{pricePerItem.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>จำนวน</span>
              <span>{quantity}</span>
            </div>
            <div className="flex justify-between font-semibold border-t pt-2">
              <span>รวมทั้งหมด</span>
              <span className="text-primary">฿{total.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" className="w-full">สร้างบิล</Button>
        <Link href="/admin/bills" className="text-sm text-primary underline block text-center">
          กลับไปหน้าบิล
        </Link>
      </form>
    </PageWrapper>
  )
}
