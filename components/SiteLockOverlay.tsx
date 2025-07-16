"use client"
import { useEffect, useState } from "react"
import { siteLock, loadSiteLock } from "@/lib/mock-site-lock"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"

export default function SiteLockOverlay() {
  const [ready, setReady] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [code, setCode] = useState("")

  useEffect(() => {
    loadSiteLock()
    const unlockedFlag =
      typeof window !== "undefined" && localStorage.getItem("siteUnlocked") === "1"
    setUnlocked(unlockedFlag || !siteLock.enabled)
    setReady(true)
  }, [])

  const verify = () => {
    if (code === siteLock.code) {
      if (typeof window !== "undefined") {
        localStorage.setItem("siteUnlocked", "1")
      }
      setUnlocked(true)
    } else {
      alert("รหัสไม่ถูกต้อง")
    }
  }

  if (!ready) return null
  if (unlocked && siteLock.enabled) return null
  if (!siteLock.enabled) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="rounded bg-white p-4">ระบบยังไม่เปิดใช้งาน</div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="rounded bg-white p-4 space-y-2">
        <p>กรอกรหัสผู้ดูแล</p>
        <Input value={code} onChange={(e) => setCode(e.target.value)} />
        <Button onClick={verify}>ยืนยัน</Button>
      </div>
    </div>
  )
}
