"use client"
import ModalWrapper from './ModalWrapper'
import { Button } from './buttons/button'

export default function ConfirmDialog({
  open,
  message,
  onConfirm,
  onCancel,
}: {
  open: boolean
  message: string
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <ModalWrapper open={open} onClose={onCancel}>
      <div className="space-y-4">
        <p className="text-sm">{message}</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel}>
            ยกเลิก
          </Button>
          <Button onClick={onConfirm}>ยืนยัน</Button>
        </div>
      </div>
    </ModalWrapper>
  )
}
