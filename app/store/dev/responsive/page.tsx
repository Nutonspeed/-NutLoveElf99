"use client"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useLocalStorage } from "@/hooks/use-local-storage"

export default function ResponsivePreviewPage() {
  if (process.env.NODE_ENV !== "development") {
    return <div className="p-4">Available only in development mode.</div>
  }
  const [device, setDevice] = useLocalStorage<"desktop" | "tablet" | "mobile">(
    "preview-device",
    "desktop",
  )
  const width = device === "desktop" ? "100%" : device === "tablet" ? "768px" : "375px"
  return (
    <div className="p-4 space-y-4">
      <ToggleGroup type="single" value={device} onValueChange={(v) => setDevice(v as any)}>
        <ToggleGroupItem value="desktop">Desktop</ToggleGroupItem>
        <ToggleGroupItem value="tablet">Tablet</ToggleGroupItem>
        <ToggleGroupItem value="mobile">Mobile</ToggleGroupItem>
      </ToggleGroup>
      <div className="border mx-auto" style={{ width }}>
        <iframe src="/" className="w-full h-[800px]" />
      </div>
    </div>
  )
}
