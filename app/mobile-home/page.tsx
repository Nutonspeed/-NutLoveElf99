"use client"
import EmotionBanner from "@/components/EmotionBanner"
import WalkthroughModal from "@/components/WalkthroughModal"
import FallbackCenter from "@/components/FallbackCenter"

let MenuGrid: React.ComponentType | null = null
try {
  MenuGrid = require("@/components/MobileMainMenuGrid").default
} catch {
  MenuGrid = null
}

const mockUser = { hasSeenIntro: false }

export default function MobileHomePage() {
  return (
    <div className="space-y-4 py-4">
      <EmotionBanner />
      {!mockUser.hasSeenIntro && <WalkthroughModal />}
      {MenuGrid ? <MenuGrid /> : <FallbackCenter title="โหลดเมนูไม่สำเร็จ ลองรีเฟรช" />}
    </div>
  )
}
