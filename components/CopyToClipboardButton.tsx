"use client"

import { Copy } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"

export function CopyToClipboardButton({ text }: { text: string }) {
  const handleClick = () => {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Failed to copy", err)
    })
  }

  return (
    <Button variant="outline" size="lg" onClick={handleClick} aria-label="copy">
      <Copy className="h-5 w-5" />
    </Button>
  )
}
