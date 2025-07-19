"use client"
import { useEffect, useState } from "react"
import EmptyState from "@/components/ui/EmptyState"
import { Smartphone } from "lucide-react"

export default function MobileOnlyPage() {
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= 768)
    checkWidth()
    window.addEventListener("resize", checkWidth)
    return () => window.removeEventListener("resize", checkWidth)
  }, [])

  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>เนื้อหาสำหรับมือถือ</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <EmptyState icon={<Smartphone className="h-8 w-8" />} title="หน้านี้ใช้ได้บนมือถือเท่านั้น" />
    </div>
  )
}
