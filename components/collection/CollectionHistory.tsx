"use client"
import { format } from "date-fns"
import type { CollectionHistory } from "@/types/collection"
import { Button } from "@/components/ui/buttons/button"

interface Props {
  history: CollectionHistory[]
  onRevert?: () => void
}

export function CollectionHistory({ history, onRevert }: Props) {
  const sorted = [...history].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  )
  return (
    <div className="space-y-4">
      <ul className="space-y-2">
        {sorted.map((h, i) => (
          <li key={i} className="flex items-center space-x-2">
            <span className="w-44 text-sm text-gray-500">
              {format(new Date(h.timestamp), "dd MMM yyyy HH:mm")}
            </span>
            <span className="text-sm">v{h.version}</span>
            <span className="text-sm text-muted-foreground">{h.admin}</span>
          </li>
        ))}
      </ul>
      {onRevert && history.length > 0 && (
        <Button variant="outline" onClick={onRevert}>ย้อนกลับเวอร์ชันก่อนหน้า</Button>
      )}
    </div>
  )
}
