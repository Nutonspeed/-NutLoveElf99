"use client"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/buttons/button"
import { useFallbackPreview } from "@/contexts/fallback-preview-context"

export default function DevTestPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound()
  }
  const { enabled, toggle, reset } = useFallbackPreview()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Dev Test</h1>
      <Button onClick={toggle}>
        {enabled ? "ปิด" : "เปิด"} Fallback Preview Mode
      </Button>
      {enabled && (
        <Button variant="outline" onClick={reset}>
          รีเซ็ตโหมด
        </Button>
      )}
    </div>
  )
}
