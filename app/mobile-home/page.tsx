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

let QuickToolbar: React.ComponentType | null = null
try {
  QuickToolbar = require("@/components/MobileActionToolbar").default
} catch {
  QuickToolbar = null
}

const mockUser = { hasSeenIntro: false }

export default function MobileHomePage() {
  return (
    <div className="space-y-4 py-4">
      <EmotionBanner />
      {!mockUser.hasSeenIntro && <WalkthroughModal />}
      {MenuGrid ? <MenuGrid /> : <FallbackCenter title="โหลดเมนูไม่สำเร็จ ลองรีเฟรช" />}
      {QuickToolbar ? (
        <QuickToolbar />
      ) : (
        <div className="mt-4 rounded bg-gray-100 p-4 text-center text-sm text-gray-500">
          ไม่สามารถโหลดทางลัดได้
        </div>
      )}
    </div>
  )
}
