"use client"
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/modals/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import { parseMessage } from '@/lib/messageToBill'
import { useBillStore } from '@/core/store'

export default function CreateBillFromMessageDialog({ onCreated }: { onCreated: (id: string) => void }) {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [items, setItems] = useState<{productId:string,quantity:number}[]>([])
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const addBill = useBillStore(s => s.addBill)

  useEffect(() => {
    const parsed = parseMessage(message)
    setItems(parsed.items)
    if (parsed.customerName) setCustomerName(parsed.customerName)
    if (parsed.customerPhone) setCustomerPhone(parsed.customerPhone)
  }, [message])

  const create = () => {
    if (items.length === 0) return
    const bill = addBill({
      customer: customerName || 'ลูกค้า',
      items: items.map(it => ({ name: it.productId, quantity: it.quantity, price: 0 })),
      shipping: 0,
      note: '',
      tags: [],
      paymentStatus: 'unpaid',
    } as any)
    setOpen(false)
    setMessage('')
    setItems([])
    onCreated((bill as any).id)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">สร้างบิลจากแชท</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>สร้างบิลจากข้อความ</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="วางข้อความแชท" value={message} onChange={e=>setMessage(e.target.value)} />
          <Input placeholder="ชื่อลูกค้า" value={customerName} onChange={e=>setCustomerName(e.target.value)} />
          <Input placeholder="เบอร์โทร" value={customerPhone} onChange={e=>setCustomerPhone(e.target.value)} />
          <div className="space-y-1 text-sm">
            {items.map((it,idx)=>(
              <div key={idx} className="flex justify-between">
                <span>{it.productId}</span>
                <span>x{it.quantity}</span>
              </div>
            ))}
            {items.length===0 && <p className="text-center text-gray-500">ไม่พบสินค้า</p>}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={create} disabled={items.length===0}>สร้างบิล</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
