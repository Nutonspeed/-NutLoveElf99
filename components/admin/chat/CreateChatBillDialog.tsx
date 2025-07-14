"use client"
import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/modals/dialog'
import { Button } from '@/components/ui/buttons/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/inputs/input'
import { Label } from '@/components/ui/label'
import { getProducts } from '@/lib/mock-products'
import { createChatBill } from '@/lib/mock-chat-bills'
import { resetChatMessages } from '@/lib/mock-chat-messages'
import { useToast } from '@/hooks/use-toast'

export default function CreateChatBillDialog({
  onCreated,
}: {
  onCreated: (id: string) => void
}) {
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState<Array<{id:string,name:string,price:number}>>([])
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [discount, setDiscount] = useState(0)
  const [fbName, setFbName] = useState('')
  const [fbLink, setFbLink] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [creating, setCreating] = useState(false)
  const { toast } = useToast()
  const total = products.reduce((sum, p) => sum + (selected[p.id] ? p.price : 0), 0)

  useEffect(() => {
    getProducts().then((prods) =>
      setProducts(prods.map((p) => ({ id: p.id, name: p.name, price: p.price })))
    )
  }, [])

  const handleCreate = () => {
    if (creating) return
    setCreating(true)
    toast({ description: 'กำลังสร้างบิล...' })
    const items = products
      .filter((p) => selected[p.id])
      .map((p) => ({ productId: p.id, name: p.name, price: p.price, quantity: 1 }))
    if (items.length === 0) {
      alert('เลือกสินค้าอย่างน้อย 1 รายการ')
      setCreating(false)
      return
    }
    try {
      const bill = createChatBill({
        fbName,
        fbLink,
        sessionId,
        items,
        discount,
        total: items.reduce((s, i) => s + i.price, 0) - discount,
      })
      setOpen(false)
      onCreated(bill.billId)
      resetChatMessages()
      // reset
      setSelected({})
      setDiscount(0)
      setFbName('')
      setFbLink('')
      setSessionId('')
    } catch (err) {
      console.error(err)
      toast({ title: 'เกิดข้อผิดพลาด', variant: 'destructive' })
    }
    setTimeout(() => setCreating(false), 2000)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">สร้างบิลใหม่</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>สร้างบิลจากแชท</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="fbName">ชื่อในเฟสบุ๊ค</Label>
              <Input id="fbName" value={fbName} onChange={(e)=>setFbName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="fbLink">ลิงก์โปรไฟล์</Label>
              <Input id="fbLink" value={fbLink} onChange={(e)=>setFbLink(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="session">Session ID</Label>
              <Input id="session" value={sessionId} onChange={(e)=>setSessionId(e.target.value)} />
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-medium">เลือกสินค้า</p>
            {products.map((p) => (
              <label key={p.id} className="flex items-center space-x-2">
                <Checkbox checked={!!selected[p.id]} onCheckedChange={(v)=>setSelected({ ...selected, [p.id]: Boolean(v) })} />
                <span>{p.name} (฿{p.price.toLocaleString()})</span>
              </label>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="discount">ส่วนลด (บาท)</Label>
              <Input id="discount" type="number" value={discount} onChange={(e)=>setDiscount(Number(e.target.value)||0)} />
            </div>
            <div className="flex items-end">ยอดรวม: ฿{(total - discount).toLocaleString()}</div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleCreate} disabled={creating}>
            สร้างบิล
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
