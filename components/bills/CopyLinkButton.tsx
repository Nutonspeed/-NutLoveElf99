"use client"
import { Copy } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { toast } from 'sonner'

export default function CopyLinkButton({ link }: { link: string }) {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(link)
      .then(() => toast.success('คัดลอกลิงก์แล้ว'))
      .catch(() => toast.error('ไม่สามารถคัดลอกลิงก์ได้'))
  }
  return (
    <Button variant="outline" size="sm" onClick={handleCopy} aria-label="copy link">
      <Copy className="h-4 w-4" />
    </Button>
  )
}
