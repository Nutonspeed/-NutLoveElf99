"use client"
import { Button } from "@/components/ui/buttons/button"

export default function CopyTextButton({ text }: { text: string }) {
  const handleClick = () => {
    navigator.clipboard.writeText(text).catch((err) => {
      console.error("Failed to copy", err)
    })
  }
  return (
    <Button variant="outline" size="sm" onClick={handleClick}>
      คัดลอกข้อความ
    </Button>
  )
}
