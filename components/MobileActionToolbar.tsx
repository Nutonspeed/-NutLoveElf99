"use client"

import { MessageCircle, Percent, Images } from "lucide-react"

export default function MobileActionToolbar() {
  const openChat = () => {
    const base = process.env.NEXT_PUBLIC_CHATWOOT_URL || "http://localhost:3000"
    window.open(`${base}/app/accounts/1/conversations/42`, "_blank")
  }

  const sendPromo = () => {
    alert("📣 โปรเดือนนี้! \nดูสินค้าได้ที่ https://example.com/product/123")
  }

  const sendFabrics = () => {
    alert(
      "🧵 ลายผ้าล่าสุด:\n1. Floral\n2. Geometric\n3. Minimal"
    )
  }

  return (
    <nav className="fixed bottom-14 left-0 right-0 z-20 flex justify-around border-t bg-background py-2 md:hidden">
      <button className="flex flex-col items-center text-xs" onClick={openChat}>
        <MessageCircle className="h-5 w-5" />
        <span>เปิดแชท</span>
      </button>
      <button className="flex flex-col items-center text-xs" onClick={sendPromo}>
        <Percent className="h-5 w-5" />
        <span>ส่งโปร</span>
      </button>
      <button className="flex flex-col items-center text-xs" onClick={sendFabrics}>
        <Images className="h-5 w-5" />
        <span>ส่งลาย</span>
      </button>
    </nav>
  )
}
