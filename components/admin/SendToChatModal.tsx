import { useState } from "react"
import { logEvent } from "@/lib/logs"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/modals/dialog"
import { Button } from "@/components/ui/buttons/button"
import { toast } from "sonner"

export function SendToChatModal({ orderId, onClose }: { orderId: string; onClose: () => void }) {
  const [message, setMessage] = useState(`📦 รายการคำสั่งซื้อ #${orderId}\nยอดรวม: 999 บาท`)
  const [customer, setCustomer] = useState("ลูกค้า A (Facebook)")
  const [confirmOpen, setConfirmOpen] = useState(false)

  const sendBill = () => {
    logEvent('send_bill_chat', { orderId, customer })
    toast.success('ส่งข้อความไปยังแชทแล้ว')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">ส่งบิลเข้าแชท</h2>
        <select
          className="w-full border p-2 rounded"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        >
          <option>ลูกค้า A (Facebook)</option>
          <option>ลูกค้า B (Inbox)</option>
          <option>ลูกค้า C (โทรศัพท์)</option>
        </select>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-32 border p-2 rounded"
        />
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>ยกเลิก</Button>
          <Button onClick={() => setConfirmOpen(true)}>ส่งบิล</Button>
        </div>
      </div>
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ยืนยันการส่งบิล?</DialogTitle>
          </DialogHeader>
          <p>คุณต้องการส่งบิลนี้ให้ลูกค้าใช่หรือไม่</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              ยกเลิก
            </Button>
            <Button
              onClick={() => {
                setConfirmOpen(false)
                sendBill()
              }}
            >
              ส่งเลย
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
