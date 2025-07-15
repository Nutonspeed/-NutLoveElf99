"use client"
import { useFallbackPreview } from "@/contexts/fallback-preview-context"
import { Button } from "@/components/ui/buttons/button"

export default function FallbackPreviewBanner() {
  const { enabled, reset } = useFallbackPreview()
  if (!enabled) return null
  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded bg-black/80 px-3 py-2 text-white text-sm">
      <span>Fallback Preview Mode</span>
      <Button size="sm" variant="secondary" onClick={reset}>
        รีเซ็ตโหมด
      </Button>
    </div>
  )
}
