"use client"
import EmptyState from "@/components/ui/EmptyState"
import { Button } from "@/components/ui/buttons/button"
import { AlertTriangle } from "lucide-react"

export default function ErrorFallback() {
  const handleRetry = () => {
    if (typeof window !== "undefined") window.location.reload()
  }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <EmptyState
        icon={<AlertTriangle className="h-8 w-8 text-red-600" />}
        title="เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง"
        action={<Button onClick={handleRetry}>ลองใหม่</Button>}
      />
    </div>
  )
}
