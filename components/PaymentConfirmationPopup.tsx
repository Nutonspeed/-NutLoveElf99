"use client"
import { useState } from 'react'
import ModalWrapper from '@/components/ui/ModalWrapper'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { addPaymentConfirmation } from '@/core/mock/store'
import { useToast } from '@/hooks/use-toast'

export default function PaymentConfirmationPopup({
  billId,
  open,
  onClose,
  onSubmitted,
}: {
  billId: string
  open: boolean
  onClose: () => void
  onSubmitted?: () => void
}) {
  const { toast } = useToast()
  const [amount, setAmount] = useState('')
  const [method, setMethod] = useState('Bank')
  const [datetime, setDatetime] = useState(() => new Date().toISOString().slice(0,16))
  const [slip, setSlip] = useState<File | null>(null)
  const [preview, setPreview] = useState(false)

  const handleSubmit = () => {
    if (!amount || !method || !datetime) {
      toast({ title: 'กรุณากรอกข้อมูลให้ครบ', variant: 'destructive' })
      return
    }
    setPreview(true)
  }

  const handleConfirm = () => {
    addPaymentConfirmation({
      billId,
      amount: parseFloat(amount),
      method,
      datetime: new Date(datetime).toISOString(),
      slip: slip?.name,
    })
    toast({ title: 'แจ้งชำระเงินสำเร็จ' })
    onSubmitted?.()
    onClose()
  }

  return (
    <ModalWrapper open={open} onClose={onClose}>
      {preview ? (
        <div className="space-y-4 w-72">
          <h2 className="text-lg font-bold">ตรวจสอบข้อมูล</h2>
          <p>จำนวนเงิน: {amount}</p>
          <p>ช่องทางโอน: {method}</p>
          <p>วันที่เวลา: {datetime}</p>
          {slip && <p>สลิป: {slip.name}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setPreview(false)}>
              แก้ไข
            </Button>
            <Button onClick={handleConfirm}>ยืนยัน</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4 w-72">
          <h2 className="text-lg font-bold">แจ้งชำระเงิน</h2>
          <div>
            <label className="text-sm">จำนวนเงินที่โอน</label>
            <Input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div>
            <label className="text-sm">ช่องทางโอน</label>
            <Select value={method} onValueChange={setMethod}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="เลือกช่องทาง" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Bank">Bank</SelectItem>
                <SelectItem value="PromptPay">PromptPay</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm">วันที่-เวลาโอน</label>
            <Input type="datetime-local" value={datetime} onChange={e => setDatetime(e.target.value)} />
          </div>
          <div>
            <label className="text-sm">แนบสลิป (ไม่บังคับ)</label>
            <Input type="file" onChange={e => setSlip(e.target.files?.[0] ?? null)} />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>ยกเลิก</Button>
            <Button onClick={handleSubmit}>ส่งข้อมูล</Button>
          </div>
        </div>
      )}
    </ModalWrapper>
  )
}
