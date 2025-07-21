"use client"
import { Button } from "@/components/ui/buttons/button"

interface BillFooterActionsProps {
  validate: () => boolean
  onSubmit: () => void
  onClear: () => void
  submitting: boolean
}

export default function BillFooterActions({
  validate,
  onSubmit,
  onClear,
  submitting,
}: BillFooterActionsProps) {
  const handleSubmit = () => {
    if (validate()) {
      onSubmit()
    }
  }

  return (
    <div className="flex gap-2 sm:flex-row flex-col">
      <Button variant="outline" className="sm:w-auto w-full" onClick={onClear}>
        ล้างฟอร์ม
      </Button>
      <Button className="w-full" onClick={handleSubmit} disabled={submitting}>
        บันทึกบิล
      </Button>
    </div>
  )
}
