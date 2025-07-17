import { cn } from "@/lib/utils"

type Status = "available" | "out" | "discontinued"

const TAG_STYLES: Record<Status, { label: string; className: string }> = {
  available: { label: "พร้อมใช้", className: "bg-green-100 text-green-700" },
  out: { label: "หมดชั่วคราว", className: "bg-yellow-100 text-yellow-700" },
  discontinued: { label: "เลิกผลิต", className: "bg-red-100 text-red-700" },
}

export function AvailabilityTag({ status, className }: { status: Status; className?: string }) {
  const conf = TAG_STYLES[status]
  return (
    <span className={cn("px-2 py-0.5 text-xs rounded-md font-medium", conf.className, className)}>
      {conf.label}
    </span>
  )
}
