"use client"
import { useState } from "react"
import EmotionBanner from "@/components/EmotionBanner"
import WalkthroughModal from "@/components/WalkthroughModal"
import FallbackCenter from "@/components/FallbackCenter"
import QuickBillModal from "@/components/QuickBillModal"
import { Button } from "@/components/ui/buttons/button"

let MenuGrid: React.ComponentType | null = null
try {
  MenuGrid = require("@/components/MobileMainMenuGrid").default
} catch {
  MenuGrid = null
}

const mockUser = { hasSeenIntro: false }

export default function MobileHomePage() {
  const [openBill, setOpenBill] = useState(false)
  return (
    <div className="space-y-4 py-4">
      <EmotionBanner />
      {!mockUser.hasSeenIntro && <WalkthroughModal />}
      {MenuGrid ? <MenuGrid /> : <FallbackCenter title="โหลดเมนูไม่สำเร็จ ลองรีเฟรช" />}
      <Button
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40"
        onClick={() => setOpenBill(true)}
      >
        + เปิดบิลเร็ว
      </Button>
      <QuickBillModal open={openBill} onClose={() => setOpenBill(false)} />
    </div>
  )
}
