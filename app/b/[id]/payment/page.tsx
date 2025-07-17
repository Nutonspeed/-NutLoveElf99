"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { addPayment } from "@/lib/mock/payment"
import { mockOrders } from "@/lib/mock-orders"

export default function PaymentPage({ params }: { params: { id: string } }) {
  const { id } = params
  const order = mockOrders.find(o => o.id === id)
  const router = useRouter()
  const [date, setDate] = useState("")
  const [amount, setAmount] = useState("")
  const [slip, setSlip] = useState<File | null>(null)
  const [channel, setChannel] = useState("")
  const [note, setNote] = useState("")

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p>ไม่พบบิลนี้ กรุณาติดต่อแอดมิน</p>
        <Link href="/" className="underline text-primary">กลับหน้าแรก</Link>
      </div>
    )
  }

  const handleSubmit = () => {
    if (!channel) {
      toast.error("กรุณาเลือกช่องทาง")
      return
    }
    const p = addPayment(id, {
      date,
      amount: parseFloat(amount) || 0,
      slip: slip?.name,
      channel,
      note,
    })
    if (p) {
      toast.success("บันทึกการแจ้งโอนแล้ว")
      router.replace(`/b/${id}`)
    } else {
      toast.error("Unable to submit payment")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div>
          <Label htmlFor="date">วันที่โอน</Label>
          <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="amt">จำนวนเงิน</Label>
          <Input id="amt" type="number" value={amount} onChange={e => setAmount(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="channel">ช่องทางชำระเงิน</Label>
          <Select value={channel} onValueChange={setChannel}>
            <SelectTrigger id="channel" className="w-full">
              <SelectValue placeholder="เลือกช่องทาง" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="qr">QR</SelectItem>
              <SelectItem value="transfer">โอนบัญชี</SelectItem>
              <SelectItem value="cash">เงินสด</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="note">หมายเหตุการชำระเงิน</Label>
          <Input id="note" value={note} onChange={e => setNote(e.target.value)} />
        </div>
        <Input type="file" onChange={e => setSlip(e.target.files?.[0] ?? null)} />
        <Button onClick={handleSubmit}>Confirm Payment</Button>
      </div>
    </div>
  )
}
