"use client"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { FC } from "react"

export type PaymentMethod =
  | "cod"
  | "bank_transfer"
  | "promptpay"
  | "credit_card"

interface Props {
  value: PaymentMethod | null
  onChange: (method: PaymentMethod) => void
}

const labels: Record<PaymentMethod, string> = {
  cod: "COD",
  bank_transfer: "โอนเงิน",
  promptpay: "พร้อมเพย์",
  credit_card: "บัตร",
}

const icons: Record<PaymentMethod, string> = {
  cod: "💵",
  bank_transfer: "🏦",
  promptpay: "📱",
  credit_card: "💳",
}

const PaymentMethodSelector: FC<Props> = ({ value, onChange }) => {
  return (
    <ToggleGroup
      type="single"
      value={value ?? undefined}
      onValueChange={(v) => v && onChange(v as PaymentMethod)}
      className="flex"
    >
      {Object.keys(labels).map((m) => (
        <ToggleGroupItem key={m} value={m} className="flex items-center gap-1">
          {icons[m as PaymentMethod]} {labels[m as PaymentMethod]}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

export default PaymentMethodSelector
