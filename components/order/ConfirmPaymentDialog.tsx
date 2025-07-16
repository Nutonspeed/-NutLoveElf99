"use client"
import BillPreview from "@/components/BillPreview"
import { Button } from "@/components/ui/buttons/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/modals/dialog"
import type { Order } from "@/types/order"

interface ConfirmPaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  order: Order
  onConfirm: () => void
}

export default function ConfirmPaymentDialog({
  open,
  onOpenChange,
  order,
  onConfirm,
}: ConfirmPaymentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>ยืนยันการชำระเงิน</DialogTitle>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <BillPreview order={order} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">ยกเลิก</Button>
          </DialogClose>
          <Button onClick={onConfirm}>ยืนยัน</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
