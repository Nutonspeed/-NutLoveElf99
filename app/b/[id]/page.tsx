"use client"
import { useState } from "react"
import QRCode from "react-qr-code"
import { Button } from "@/components/ui/buttons/button"
import { ConfirmationDialog } from "@/components/order/confirmation-dialog"
import { getFastBill, markBillSuccess } from "@/lib/mock-fast-bills"

export default function BillPage({ params }: { params: { id: string } }) {
  const bill = getFastBill(params.id)
  const [open, setOpen] = useState(false)

  if (!bill) {
    return <div className="p-4 text-red-500">ไม่พบบิลนี้</div>
  }

  if (bill.status === "สำเร็จ") {
    return <div className="p-4">บิลนี้ปิดแล้ว</div>
  }

  const billUrl = `https://elfcover.vercel.app/b/${bill.id}`

  const confirm = () => {
    markBillSuccess(bill.id)
    setOpen(false)
  }

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">บิล #{bill.id}</h1>
      <p>ลูกค้า: {bill.customerName}</p>
      <p>ยอดรวม: <strong>{bill.total} บาท</strong></p>
      <QRCode value={billUrl} />
      <p className="text-sm text-gray-400">ลูกค้าสามารถสแกน QR หรือกดลิงก์ด้านล่าง</p>
      <a href={billUrl} className="underline text-blue-600">{billUrl}</a>
      <Button onClick={() => setOpen(true)}>ชำระเงินแล้ว</Button>
      <ConfirmationDialog
        open={open}
        onOpenChange={setOpen}
        title="ยืนยันการชำระเงิน"
        description="ยืนยันว่าชำระเงินเรียบร้อยแล้ว?"
        onConfirm={confirm}
      />
    </div>
  )
}
