"use client"

import { Button } from "@/components/ui/buttons/button"

export function SharePageButton() {
  const handleClick = () => {
    const link = window.location.href
    const message = `แนะนำลายผ้านี้ให้เพื่อน 👉 ${link}`
    navigator.clipboard.writeText(message).catch(() => {})
  }
  return (
    <Button onClick={handleClick}>ส่งต่อเพื่อน</Button>
  )
}
