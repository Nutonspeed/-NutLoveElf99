"use client"
import { useEffect, useState } from 'react'
import { getBills, addBillActivity } from '@/core/mock/store'
import { useBillStore } from '@/core/store'
import { copyToClipboard } from '@/helpers/clipboard'
import { generateQRUrl } from '@/lib/qr/generate'
import { Button } from '@/components/ui/buttons/button'
import Link from 'next/link'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/modals/dialog'
import { Input } from '@/components/ui/inputs/input'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function AdminBillDetail({ params }: { params: { id: string } }) {
  const bill = getBills().find(b => b.id === params.id)
  const store = useBillStore()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [payments, setPayments] = useState<any[]>([])
  const [edit, setEdit] = useState(false)
  const [items, setItems] = useState(() => bill?.items || [])
  const [statusNote, setStatusNote] = useState('')
  useEffect(() => {
    fetch(`/api/receipt/${params.id}/payment`).then(r => r.json()).then(setPayments)
  }, [params.id])

  const updateStatus = async (status: string) => {
    await fetch('/api/bill/update-status', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ billId: bill.id, newStatus: status }),
    })
    store.updateStatus(bill.id, status as any)
  }

  if (!bill) return <div className="p-4">ไม่พบบิล</div>

  const confirm = async () => {
    await updateStatus('paid')
    alert('ยืนยันแล้ว (mock)')
  }

  const handleDelete = async () => {
    const res = await fetch(`/api/bills/${bill.id}/delete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reason }),
    })
    if (res.ok) {
      store.remove(bill.id)
      toast('Bill deleted', {
        action: {
          label: 'Undo',
          onClick: async () => { await fetch('/api/undo', { method: 'POST' }); router.refresh() },
        },
      })
      router.push('/admin/bills')
    } else {
      toast.error('ลบไม่สำเร็จ')
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <h1 className="text-xl font-bold">บิล {bill.id}</h1>
        <Link href={`/admin/bills/${bill.id}/timeline`} className="text-sm underline text-blue-600">timeline</Link>
      </div>
      <div className="flex items-center space-x-4">
        <img
          src={generateQRUrl(`${window.location.origin}/b/${bill.shortCode}`)}
          alt="QR"
          className="w-24 h-24 border"
        />
        <Button
          variant="outline"
          onClick={() => {
            copyToClipboard(`${window.location.origin}/b/${bill.shortCode}`)
            store.recordShare(bill.id, 'admin')
          }}
        >คัดลอกลิงก์</Button>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm">สถานะ:</span>
        <Select
          value={bill.status}
          onValueChange={async (v) => {
            await updateStatus(v as any)
            addBillActivity({ billId: bill.id, action: `status-${v}`, note: statusNote })
            setStatusNote('')
            router.refresh()
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">draft</SelectItem>
            <SelectItem value="unpaid">unpaid</SelectItem>
            <SelectItem value="paid">paid</SelectItem>
            <SelectItem value="packed">packed</SelectItem>
            <SelectItem value="shipped">shipped</SelectItem>
            <SelectItem value="failed">failed</SelectItem>
          </SelectContent>
        </Select>
        <Textarea
          placeholder="note"
          value={statusNote}
          onChange={(e) => setStatusNote(e.target.value)}
          className="h-8 w-48"
        />
      </div>
      <div className="space-y-2">
        <h2 className="font-semibold">แจ้งโอน</h2>
        {payments.length === 0 && <p className="text-sm">ไม่มีข้อมูล</p>}
        {payments.map(p => (
          <div key={p.id} className="border p-2 rounded space-y-1">
            <p>เวลา: {p.datetime}</p>
            <p>ช่องทาง: {p.method}</p>
            {p.slip && (
              <img src="/placeholder.jpg" alt="slip" className="w-32 border" />
            )}
          </div>
        ))}
        {bill.status !== 'paid' && payments.length > 0 && (
          <Button onClick={confirm}>ยืนยันรับเงินแล้ว</Button>
        )}
      </div>
      <div className="space-y-2">
        <Button variant="outline" onClick={() => setEdit(!edit)}>Edit Items</Button>
        {edit && (
          <div className="space-y-2">
            {items.map((it, idx) => (
              <div key={idx} className="flex items-end space-x-2">
                <Input
                  value={it.name}
                  onChange={e => setItems(items.map((o,i)=>i===idx?{...o,name:e.target.value}:o))}
                />
                <Input
                  type="number"
                  className="w-20"
                  value={it.quantity}
                  onChange={e=>setItems(items.map((o,i)=>i===idx?{...o,quantity:parseInt(e.target.value)||1}:o))}
                />
                <Input
                  type="number"
                  className="w-24"
                  value={it.price}
                  onChange={e=>setItems(items.map((o,i)=>i===idx?{...o,price:parseFloat(e.target.value)||0}:o))}
                />
                <Button variant="outline" size="icon" onClick={()=>setItems(items.filter((_,i)=>i!==idx))}>×</Button>
              </div>
            ))}
            <Button variant="outline" onClick={()=>setItems([...items,{name:'',quantity:1,price:0}])}>เพิ่มสินค้า</Button>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>฿{items.reduce((s,it)=>s+it.price*it.quantity,0)+bill.shipping}</span>
            </div>
            <Button onClick={async () => {await updateStatus(bill.status); store.updateBill(bill.id,{items}); setEdit(false);}}>Save</Button>
          </div>
        )}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="destructive">Delete Bill</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>ยืนยันลบบิล {bill.id}</DialogTitle>
            </DialogHeader>
            <p>ลูกค้า: {bill.customer}</p>
            <p>รวม: {bill.items.reduce((s,i)=>s+i.price*i.quantity,0)+bill.shipping} บาท</p>
            <Input placeholder="เหตุผล" value={reason} onChange={e=>setReason(e.target.value)} className="mt-2" />
            <DialogFooter>
              <Button variant="outline" onClick={()=>setOpen(false)}>ยกเลิก</Button>
              <Button variant="destructive" onClick={handleDelete}>ยืนยันลบ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
