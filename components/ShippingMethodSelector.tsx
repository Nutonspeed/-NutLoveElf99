"use client"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/inputs/input"

export type ShippingMethod = "flash" | "kerry" | "ems" | "other"

interface Props {
  value: ShippingMethod | null
  tracking: string
  onChange: (value: ShippingMethod) => void
  onTrackingChange: (value: string) => void
}

const methods: { id: ShippingMethod; label: string; logo?: string }[] = [
  { id: "flash", label: "Flash" },
  { id: "kerry", label: "Kerry" },
  { id: "ems", label: "EMS" },
  { id: "other", label: "Other" },
]

export default function ShippingMethodSelector({
  value,
  tracking,
  onChange,
  onTrackingChange,
}: Props) {
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {methods.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onChange(m.id)}
            className={cn(
              "border rounded px-3 py-2 text-sm flex items-center space-x-2",
              value === m.id && "bg-primary text-white"
            )}
          >
            {m.logo && (
              <Image src={m.logo} alt={m.label} width={24} height={24} />
            )}
            <span>{m.label}</span>
          </button>
        ))}
      </div>
      {value && (
        <Input
          placeholder="Tracking no."
          value={tracking}
          onChange={(e) => onTrackingChange(e.target.value)}
        />
      )}
    </div>
  )
}
