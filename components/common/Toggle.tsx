"use client"
import { Switch } from "@/components/ui/switch"

export function Toggle({
  label,
  ...props
}: React.ComponentProps<typeof Switch> & { label?: string }) {
  return (
    <label className="flex items-center space-x-2">
      <Switch {...props} />
      {label && <span>{label}</span>}
    </label>
  )
}
