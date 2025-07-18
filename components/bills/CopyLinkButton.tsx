"use client"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { useToast } from "@/hooks/use-toast"

export default function CopyLinkButton({ link }: { link: string }) {
  const { toast } = useToast()
  const handleCopy = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => toast({ description: "คัดลอกลิงก์เรียบร้อย" }))
      .catch(console.error)
  }
  return (
    <Button variant="outline" size="sm" onClick={handleCopy} aria-label="copy link">
      <Copy className="h-4 w-4" />
    </Button>
  )
}
