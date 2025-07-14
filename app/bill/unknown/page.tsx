"use client"
import { Button } from "@/components/ui/buttons/button"

export default function BillUnknown() {
  const chatwootUrl = process.env.NEXT_PUBLIC_CHATWOOT_URL || "http://localhost:3000"
  const handleBack = () => {
    const w = window.open(chatwootUrl, "_blank")
    if (!w) {
      window.location.href = "/chat"
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">ไม่พบบิลนี้</h1>
        <Button onClick={handleBack} variant="outline">
          กลับไปคุยกับแอดมิน
        </Button>
      </div>
    </div>
  )
}
