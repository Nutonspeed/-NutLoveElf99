"use client"
import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/modals/dialog'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { addQuickBill, getBillLink } from '@/lib/mock-quick-bills'
import { addCustomChatMessage } from '@/lib/mock-chat-messages'
import { getActiveConversation } from '@/lib/mock-conversations'

interface Item {
  name: string
  qty: number
  price: number
}

export default function QuickBillModal({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [note, setNote] = useState('')
  const [items, setItems] = useState<Item[]>([{ name: '', qty: 1, price: 0 }])

  const addItem = () => setItems([...items, { name: '', qty: 1, price: 0 }])
  const updateItem = (index: number, field: keyof Item, value: string) => {
    setItems(items.map((it, i) => (i === index ? { ...it, [field]: field === 'name' ? value : Number(value) } : it)))
  }

  const save = () => {
    const id = 'QB-' + Math.random().toString(36).slice(2, 8).toUpperCase()
    addQuickBill({ id, customerName, phone, note, items })
    const link = getBillLink(id)
    const convId = getActiveConversation()
    if (convId && link) {
      addCustomChatMessage(convId, `ชำระบิลที่นี่: ${link}`)
    }
    setOpen(false)
    // reset form
    setCustomerName('')
    setPhone('')
    setNote('')
    setItems([{ name: '', qty: 1, price: 0 }])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>เปิดบิลด่วน</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="space-y-2">
            <Input placeholder="ชื่อลูกค้า" value={customerName} onChange={e => setCustomerName(e.target.value)} />
            <Input placeholder="เบอร์ติดต่อ" value={phone} onChange={e => setPhone(e.target.value)} />
            <Input placeholder="หมายเหตุ" value={note} onChange={e => setNote(e.target.value)} />
          </div>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อสินค้า</TableHead>
                  <TableHead>จำนวน</TableHead>
                  <TableHead>ราคา</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <Input value={item.name} onChange={e => updateItem(idx, 'name', e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <Input type="number" value={item.qty} onChange={e => updateItem(idx, 'qty', e.target.value)} />
                    </TableCell>
                    <TableCell>
                      <Input type="number" value={item.price} onChange={e => updateItem(idx, 'price', e.target.value)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button variant="outline" className="mt-2" onClick={addItem}>เพิ่มสินค้าใหม่</Button>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={save}>บันทึกบิล</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
