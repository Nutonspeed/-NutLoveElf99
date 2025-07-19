"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/inputs/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { addPayment } from "@/core/mock/payments"
import { mockOrders } from "@/core/mock/orders"

export default function PaymentPage({ params }: { params: { id: string } }) {
  const { id } = params
  const order = mockOrders.find(o => o.id === id)
  const router = useRouter()
  const [date, setDate] = useState("")
  const [amount, setAmount] = useState("")
  const [slip, setSlip] = useState<File | null>(null)

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <p>ไม่พบบิลนี้ กรุณาติดต่อแอดมิน</p>
        <Link href="/" className="underline text-primary">กลับหน้าแรก</Link>
      </div>
    )
  }

  const handleSubmit = () => {
    const p = addPayment(id, {
      date,
      amount: parseFloat(amount) || 0,
      slip: slip?.name,
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
        <Input type="file" onChange={e => setSlip(e.target.files?.[0] ?? null)} />
        <Button onClick={handleSubmit}>Confirm Payment</Button>
      </div>
    </div>
  )
}
