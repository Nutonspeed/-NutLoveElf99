"use client"
import EmotionBanner from "@/components/EmotionBanner"
import Link from "next/link"
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
    <div className="space-y-4 py-4 pb-24">
      <EmotionBanner />
      {!mockUser.hasSeenIntro && <WalkthroughModal />}
      {MenuGrid ? (
        <MenuGrid />
      ) : (
        <FallbackCenter title="มีปัญหาในการโหลดเมนูมือถือ กรุณาติดต่อแอดมิน" />
      )}
      <Link
        href="/quick-bill"
        className="fixed bottom-4 left-1/2 -translate-x-1/2 w-10/12 max-w-xs rounded-full bg-green-500 py-3 text-center font-semibold text-white"
      >
        + เปิดบิลเร็ว
      </Link>
    </div>
  )
}
