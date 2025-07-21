"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { ConfirmationDialog } from "@/components/order/confirmation-dialog"

interface BillFooterActionsProps {
  validate: () => boolean
  onSubmit: () => Promise<void> | void
  onClear: () => void
  submitting?: boolean
}

export default function BillFooterActions({
  validate,
  onSubmit,
  onClear,
  submitting = false,
}: BillFooterActionsProps) {
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "Enter") {
        e.preventDefault()
        handleSubmit()
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  })

  const handleSubmit = () => {
    if (!validate()) return
    setShowConfirm(true)
  }

  const handleClear = () => {
    if (confirm("ต้องการล้างข้อมูลทั้งหมดหรือไม่?")) {
      onClear()
    }
  }

  const confirmSubmit = async () => {
    await onSubmit()
    setShowConfirm(false)
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 space-x-2 flex">
      <Button onClick={handleSubmit} disabled={submitting} className="px-4">
        ยืนยันบิล
      </Button>
      <Button variant="outline" onClick={handleClear} className="px-4">
        ล้างฟอร์ม
      </Button>
      <Link href="/admin/bills" className="no-underline">
        <Button variant="outline" className="px-4">กลับไปหน้ารายการ</Button>
      </Link>
      <ConfirmationDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        title="ยืนยันการสร้างบิล"
        description="ต้องการยืนยันการสร้างบิลหรือไม่?"
        onConfirm={confirmSubmit}
      />
    </div>
  )
}
