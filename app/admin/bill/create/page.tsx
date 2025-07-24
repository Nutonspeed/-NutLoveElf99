"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
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
import { getFabrics, getBills } from '@/core/mock/store'
import customersData from '@/mock/customers.json'
import type { Customer } from '@/types/customer'
import { copyToClipboard } from '@/helpers/clipboard'
import { parseMessage } from '@/lib/messageToBill'
import { getLead, markBilled, convertLeadToCustomer } from '@/lib/mock-facebook-leads'

export default function AdminBillCreatePage() {
  const router = useRouter()
  const params = useSearchParams()
  const { toast } = useToast()
  const addBill = useBillStore(s => s.addBill)

  const [fabrics, setFabrics] = useState<Fabric[]>([])
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerId, setCustomerId] = useState<string | null>(null)
  const [fabricId, setFabricId] = useState('')
  const [sofaType, setSofaType] = useState('1-seater')
  const [customSizeNote, setCustomSizeNote] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [tag, setTag] = useState('ด่วน')
  const [customerAddress, setCustomerAddress] = useState('')
  const [deliveryNote, setDeliveryNote] = useState('')
  const [billLink, setBillLink] = useState<string | null>(null)

  useEffect(() => {
    setFabrics(getFabrics())
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('selectedFabric')
      if (stored) {
        try {
          const obj = JSON.parse(stored) as { id: string }
          setFabricId(obj.id)
        } catch {
          setFabricId(stored)
        }
        localStorage.removeItem('selectedFabric')
      }
    }
  }, [])

  useEffect(() => {
    const from = params.get('from')
    const lead = params.get('leadId')
    if (lead) {
      const l = getLead(lead)
      if (l) {
        setCustomerName(l.name)
        setCustomerPhone(l.phone)
      }
    }
    if (from === 'cart') {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('cart')
        if (stored) {
          try {
            const cart = JSON.parse(stored) as Array<{id:string;qty:number}>
            if (cart[0]) {
              setFabricId(cart[0].id)
              setQuantity(cart[0].qty)
            }
          } catch {}
        }
      }
    } else if (from === 'message') {
      const text = params.get('text') || ''
      if (text) {
        const { items, customerName: name, customerPhone: phone } = parseMessage(text)
        if (items[0]) {
          setFabricId(items[0].productId)
          setQuantity(items[0].quantity)
        }
        if (name) setCustomerName(name)
        if (phone) setCustomerPhone(phone)
      }
    } else if (from) {
      const b = getBills().find(x => x.id === from)
      if (b) {
        setCustomerName(b.customer)
        const parts = Object.fromEntries(
          String(b.items).split(';').map(p => {
            const [k, v] = p.split(':')
            return [k, v]
          }),
        ) as Record<string, string>
        setFabricId(parts['fabric'] || '')
        setSofaType(parts['sofa'] || '1-seater')
        setCustomSizeNote(parts['note'] || '')
        setCustomerAddress(parts['addr'] || '')
        setDeliveryNote(parts['delivery'] || '')
      }
    }
  }, [params])

  const selectedFabric = fabrics.find(f => f.id === fabricId) || null
  const pricePerItem = selectedFabric?.price ?? 0
  const total = quantity * pricePerItem

  const customers = customersData as Customer[]
  const suggestions = customers.filter(c =>
    (customerPhone && c.phone.includes(customerPhone)) ||
    (customerName && c.name.includes(customerName))
  ).slice(0, 5)

  const isValid =
    customerName.trim() !== '' &&
    fabricId !== '' &&
    quantity > 0 &&
    (customerPhone.trim() !== '' || customerId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) {
      toast({ title: 'บอกฟอร์มพัง', variant: 'destructive' })
      return
    }

    const id = genBillId()
    addBill({
      id,
      customerId: customerId || undefined,
      customer: customerName,
      items: `fabric:${fabricId};sofa:${sofaType};note:${customSizeNote};addr:${customerAddress};delivery:${deliveryNote}`,
      amount: total,
      status: 'draft',
    })
    const leadId = params.get('leadId')
    if (leadId) {
      const l = getLead(leadId)
      if (l) {
        convertLeadToCustomer(l)
        markBilled(leadId)
      }
    }
    toast({ title: 'สร้างบิลแล้ว! พร้อมส่งลูกค้า' })
    setBillLink(`/bill/${id}`)
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
        <div className="space-y-2 relative">
          <label className="text-sm">เบอร์โทร</label>
          <Input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} />
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border w-full shadow text-sm">
              {suggestions.map(s => (
                <li key={s.id} className="px-2 py-1 hover:bg-gray-100 cursor-pointer" onClick={() => {
                  setCustomerId(s.id)
                  setCustomerName(s.name)
                  setCustomerPhone(s.phone || '')
                  setCustomerAddress(s.address || '')
                }}>{s.name} ({s.phone})</li>
              ))}
            </ul>
          )}
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
          {selectedFabric && (
            <div className="mt-2">
              <Image
                src={selectedFabric.imageUrl}
                alt={selectedFabric.name}
                width={200}
                height={200}
                className="rounded"
              />
            </div>
          )}
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
          <label className="text-sm">ที่อยู่ลูกค้า</label>
          <Input value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} />
        </div>
        <div className="space-y-2">
          <label className="text-sm">หมายเหตุการส่ง</label>
          <Textarea value={deliveryNote} onChange={e => setDeliveryNote(e.target.value)} />
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

        <Button type="submit" className="w-full" disabled={!isValid}>สร้างบิล</Button>
        {billLink && (
          <div className="space-y-2 text-center border p-4 rounded-md">
            <p>{billLink}</p>
            <Button variant="outline" onClick={() => copyToClipboard(window.location.origin + billLink)}>
              คัดลอกลิงก์
            </Button>
          </div>
        )}
        <Link href="/admin/bills" className="text-sm text-primary underline block text-center">
          กลับไปหน้าบิล
        </Link>
      </form>
    </PageWrapper>
  )
}
