"use client"

import { Button } from "@/components/ui/buttons/button"
import { Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SharePanel() {
  const { toast } = useToast()
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({ title: "คัดลอกลิงก์เรียบร้อยแล้ว" })
  }

  const shareFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank")
  }

  const shareLine = () => {
    const url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`
    window.open(url, "_blank")
  }

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm" onClick={copyLink}>
        แชร์ลิงก์
      </Button>
      <Button variant="outline" size="sm" onClick={shareFacebook} aria-label="share facebook">
        <Share2 className="h-4 w-4 mr-1" /> Facebook
      </Button>
      <Button variant="outline" size="sm" onClick={shareLine} aria-label="share line">
        <Share2 className="h-4 w-4 mr-1" /> LINE
      </Button>
    </div>
  )
}
