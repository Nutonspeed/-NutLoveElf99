"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { resizeAndCompressImage } from "@/lib/image-handler"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/modals/dialog"
import { useToast } from "@/hooks/use-toast"

export default function SmartToolsPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState("")
  const [renamed, setRenamed] = useState("")
  const [group, setGroup] = useState("")
  const [resizedUrl, setResizedUrl] = useState("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    } else if (user?.role !== "admin") {
      router.push("/")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "admin") return null

  const handleFile = (f: File) => {
    if (f.size > 2 * 1024 * 1024) {
      toast({
        title: "ไฟล์ใหญ่เกิน",
        description: "กรุณาเลือกไฟล์ไม่เกิน 2MB",
        variant: "destructive",
      })
      return
    }
    setFile(f)
    setPreview(URL.createObjectURL(f))
    setRenamed(f.name)
  }

  const autoRename = () => {
    const num = Math.floor(Math.random() * 900) + 100
    setRenamed(`fabric-001-${num}.jpg`)
  }

  const autoGroup = () => {
    const groups = ["floral", "solid", "stripe"]
    setGroup(groups[Math.floor(Math.random() * groups.length)])
  }

  const doResize = async () => {
    if (!file) return
    const blob = await resizeAndCompressImage(file, 1200, 1200, 0.8, "image/webp")
    setResizedUrl(URL.createObjectURL(blob))
    setOpen(true)
  }

  const handleSave = () => {
    setOpen(false)
    toast({ title: "บันทึกแล้ว (mock)" })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Smart Tools</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Image Helper (Mock)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const f = e.target.files?.[0]
                if (f) handleFile(f)
              }}
            />
            {preview && (
              <img src={preview} alt="preview" className="h-40 rounded-md border object-cover" />
            )}
            <div className="flex flex-wrap gap-2">
              <Button onClick={autoRename}>ตั้งชื่อภาพอัตโนมัติ</Button>
              <Button onClick={autoGroup}>จัดกลุ่มผ้าอัตโนมัติ</Button>
              <Button onClick={doResize}>Resize ก่อนบันทึก</Button>
            </div>
            {renamed && <p className="text-sm text-gray-500">ชื่อไฟล์: {renamed}</p>}
            {group && <p className="text-sm text-gray-500">กลุ่ม: {group}</p>}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>ผลการ Resize</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  {preview && (
                    <img
                      src={preview}
                      alt="before"
                      className="border rounded-md object-cover max-h-40"
                    />
                  )}
                  {resizedUrl && (
                    <img
                      src={resizedUrl}
                      alt="after"
                      className="border rounded-md object-cover max-h-40"
                    />
                  )}
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button variant="outline" onClick={() => setOpen(false)}>
                    ปิด
                  </Button>
                  <Button onClick={handleSave}>บันทึกผล</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
