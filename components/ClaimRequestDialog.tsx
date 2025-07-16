"use client"
import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/modals/dialog'
import { Button } from '@/components/ui/buttons/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/inputs/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { createClaim } from '@/lib/mock-claims'
import { toast } from 'sonner'

export default function ClaimRequestDialog({ orderId }: { orderId: string }) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState('damage')
  const [desc, setDesc] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const handleSubmit = () => {
    const send = (image: string) => {
      const res = createClaim({ orderId, image, reason: desc || reason })
      if (!res) {
        toast.error('ไม่สามารถส่งคำขอเคลม กรุณาลองใหม่อีกครั้ง')
      } else {
        toast.success('คำขอเคลมถูกส่งแล้ว รอเจ้าหน้าที่ติดต่อกลับ')
        setOpen(false)
      }
    }
    if (file) {
      const reader = new FileReader()
      reader.onload = () => send(reader.result as string)
      reader.readAsDataURL(file)
    } else {
      send('')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">แจ้งเคลมสินค้า</Button>
      </DialogTrigger>
      <DialogContent className="space-y-4 max-w-sm">
        <DialogHeader>
          <DialogTitle>แจ้งเคลมสินค้า</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <Label>สาเหตุ</Label>
          <Select value={reason} onValueChange={setReason}>
            <SelectTrigger>
              <SelectValue placeholder="เลือกสาเหตุ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="damage">สินค้าเสียหาย</SelectItem>
              <SelectItem value="missing">ได้รับไม่ครบ</SelectItem>
              <SelectItem value="wrong">สินค้าไม่ตรงปก</SelectItem>
            </SelectContent>
          </Select>
          <Label htmlFor="desc">รายละเอียดเพิ่มเติม</Label>
          <textarea id="desc" rows={3} className="w-full border rounded p-2" value={desc} onChange={e=>setDesc(e.target.value)} />
          <Input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)} />
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit}>ส่งเคลม</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
