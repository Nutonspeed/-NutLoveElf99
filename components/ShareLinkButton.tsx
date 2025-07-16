"use client"
import { Button } from "@/components/ui/buttons/button"
import { useToast } from "@/hooks/use-toast"

export default function ShareLinkButton({ className }: { className?: string }) {
  const { toast } = useToast()
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const copy = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({ title: "คัดลอกลิงก์เรียบร้อยแล้ว" })
  }
  return (
    <Button variant="outline" size="lg" onClick={copy} className={className}>
      แชร์ลิงก์
    </Button>
  )
}
