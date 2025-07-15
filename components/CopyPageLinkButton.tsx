"use client"

import { Button } from "@/components/ui/buttons/button"
import { toast } from "sonner"

export function CopyPageLinkButton() {
  const handleClick = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        toast.success("คัดลอกลิงก์สำเร็จ ส่งให้ลูกค้าได้เลย")
      })
      .catch(() => {
        toast.error("ไม่สามารถคัดลอกลิงก์ได้")
      })
  }

  return (
    <Button variant="outline" size="sm" onClick={handleClick}>
      คัดลอกลิงก์หน้านี้
    </Button>
  )
}
