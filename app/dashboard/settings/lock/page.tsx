"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { loadLockPassword, setLockPassword, verifyLockPassword } from "@/lib/mock-lock"
import { useToast } from "@/hooks/use-toast"

export default function LockSettingsPage() {
  const [current, setCurrent] = useState("")
  const [newPwd, setNewPwd] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    loadLockPassword()
  }, [])

  const handleVerify = () => {
    if (verifyLockPassword(current)) {
      toast({ title: "ยืนยันสำเร็จ" })
    } else {
      toast({ title: "รหัสไม่ถูกต้อง", variant: "destructive" })
    }
  }

  const handleSave = () => {
    setLockPassword(newPwd)
    toast({ title: "บันทึกรหัสแล้ว" })
    setNewPwd("")
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Lock Settings</h1>
      <div className="space-y-2 max-w-sm">
        <Input type="password" placeholder="รหัสปัจจุบัน" value={current} onChange={e=>setCurrent(e.target.value)} />
        <Button onClick={handleVerify}>ยืนยันรหัส</Button>
      </div>
      <div className="space-y-2 max-w-sm">
        <Input type="password" placeholder="รหัสใหม่" value={newPwd} onChange={e=>setNewPwd(e.target.value)} />
        <Button onClick={handleSave}>บันทึกรหัสใหม่</Button>
      </div>
    </div>
  )
}
