"use client"

import Image from "next/image"
import { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/modals/dialog"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/inputs/input"
import { toast } from "sonner"

interface Fabric {
  id: string
  name: string
  slug?: string | null
  images?: string[]
}

export function ShareFabricModal({ fabric }: { fabric?: Fabric }) {
  const [open, setOpen] = useState(false)
  const [friend, setFriend] = useState("")

  const handleCopy = () => {
    if (!fabric) {
      toast.error("กรุณาเลือกผ้าก่อน")
      return
    }
    const message = `สวัสดี ${friend || ""}! ฉันอยากแชร์ลายผ้า ${
      fabric.name
    } ให้คุณ ลองดูได้ที่ https://example.com/fabrics/${fabric.slug || fabric.id}`
    navigator.clipboard.writeText(message).then(() => {
      toast.success("คัดลอกข้อความแล้ว")
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg">
          ส่งให้เพื่อนใน Inbox
        </Button>
      </DialogTrigger>
      <DialogContent>
          {fabric ? (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle>ส่งลายผ้าให้เพื่อน</DialogTitle>
              </DialogHeader>
              <Input
                value={friend}
                onChange={(e) => setFriend(e.target.value)}
                placeholder="ชื่อเพื่อน"
              />
              <div className="flex items-center space-x-4">
                <div className="relative h-24 w-24 flex-shrink-0">
                  <Image
                    src={fabric.images?.[0] || "/placeholder.svg"}
                    alt={fabric.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <p className="font-medium">{fabric.name}</p>
              </div>
              <DialogFooter>
                <Button onClick={handleCopy}>คัดลอกข้อความ</Button>
              </DialogFooter>
            </div>
          ) : (
            <p className="text-center">กรุณาเลือกผ้าก่อน</p>
          )}
      </DialogContent>
    </Dialog>
  )
}
