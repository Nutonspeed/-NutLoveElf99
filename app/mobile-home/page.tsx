"use client"
import EmotionBanner from "@/components/EmotionBanner"
import WalkthroughModal from "@/components/WalkthroughModal"
import FallbackCenter from "@/components/FallbackCenter"
import LoadingSpinner from "@/components/LoadingSpinner"
import { useAdminGuard } from "@/contexts/use-admin-guard"

let MenuGrid: React.ComponentType | null = null
try {
  MenuGrid = require("@/components/MobileMainMenuGrid").default
} catch {
  MenuGrid = null
}


export default function MobileHomePage() {
  const { loading, isAdmin, conflict } = useAdminGuard()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner label="กำลังตรวจสอบสิทธิ์..." />
      </div>
    )
  }

  if (conflict) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>session conflict detected</p>
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="space-y-4 py-4">
      <EmotionBanner />
      <WalkthroughModal />
      {MenuGrid ? <MenuGrid /> : <FallbackCenter title="โหลดเมนูไม่สำเร็จ ลองรีเฟรช" />}
    </div>
  )
}
