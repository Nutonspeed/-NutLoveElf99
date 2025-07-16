"use client"
import { useSearchParams } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"
import { getGlobalAlertCount } from "@/lib/mock-alerts"

export default function ForceErrorBanner() {
  const searchParams = useSearchParams()
  const force = searchParams.get("forceError") === "true"

  if (!force) return null

  const count = getGlobalAlertCount()

  return (
    <Alert variant="destructive" className="mb-4 flex items-center">
      <AlertTriangle className="mr-2 h-4 w-4" />
      <AlertDescription>
        ระบบทดสอบแจ้งข้อผิดพลาด ({count})
      </AlertDescription>
    </Alert>
  )
}
