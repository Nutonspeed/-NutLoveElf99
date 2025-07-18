"use client"
import { Copy } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"

export default function CopyLinkButton({ link }: { link: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(link).catch(console.error)
  }
  return (
    <Button variant="outline" size="sm" onClick={handleCopy} aria-label="copy link">
      <Copy className="h-4 w-4" />
    </Button>
  )
}
