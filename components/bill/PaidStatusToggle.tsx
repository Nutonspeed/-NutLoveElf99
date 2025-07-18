"use client"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"

export default function PaidStatusToggle({ defaultPaid = false, onChange }: { defaultPaid?: boolean; onChange?: (paid: boolean) => void }) {
  const [paid, setPaid] = useState(defaultPaid)
  const toggle = () => {
    const newVal = !paid
    setPaid(newVal)
    onChange?.(newVal)
  }
  return (
    <div className="flex items-center gap-2">
      <Switch checked={paid} onCheckedChange={toggle} />
      <span className="text-sm">{paid ? "ชำระแล้ว" : "ยังไม่ชำระ"}</span>
    </div>
  )
}
