"use client"
import { useEffect, useState } from 'react'
import { getBills, updateBillStatus } from '@/core/mock/store'
import { useBillStore } from '@/core/store'
import { Button } from '@/components/ui/buttons/button'
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
  useEffect(() => {
    fetch(`/api/receipt/${params.id}/payment`).then(r => r.json()).then(setPayments)
  }, [params.id])

  if (!bill) return <div className="p-4">ไม่พบบิล</div>

  const confirm = () => {
    updateBillStatus(bill.id, 'paid')
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
      <h1 className="text-xl font-bold">บิล {bill.id}</h1>
      <p className="text-sm">สถานะ: {bill.status}</p>
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
      <div>
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
