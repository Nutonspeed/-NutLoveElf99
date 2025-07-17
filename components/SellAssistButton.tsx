"use client"

import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/modals/drawer"
import FallbackCenter from "@/components/FallbackCenter"

const scenarios = [
  "ส่งบิลแบบไม่ถาม",
  "ทักลูกค้าแบบด่วน",
  "ส่งลิงก์สินค้ายอดนิยม",
]

const templates = [
  "สวัสดีค่ะ บิลของลูกค้าพร้อมแล้วนะคะ",
  "ขอบคุณที่อุดหนุนค่ะ พร้อมส่งทันทีเลย",
  "สนใจสินค้าเพิ่มเติมแจ้งได้เลยนะคะ",
]

const lastReplies = [
  "รับยอดแล้วค่ะ",
  "โอนแล้วนะคะ",
  "ส่งของให้แล้วค่ะ",
]

export default function SellAssistButton() {
  const isMobile = useIsMobile()
  const [open, setOpen] = useState(false)
  const sample = templates[Math.floor(Math.random() * templates.length)]

  if (!isMobile) return null

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <button
          className="fixed bottom-24 right-4 z-50 rounded-full bg-primary px-4 py-3 text-white shadow-lg hover:animate-bounce focus:outline-none"
        >
          ปิดการขายเร็ว
        </button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>ปิดการขายเร็ว</DrawerTitle>
        </DrawerHeader>
        {scenarios.length ? (
          <div className="space-y-4 p-4">
            <div className="space-y-2">
              {scenarios.map((s) => (
                <button
                  key={s}
                  className="w-full rounded border p-3 text-left hover:bg-accent"
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">ตัวอย่างข้อความ</p>
              <div className="rounded border p-2 text-sm">{sample}</div>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Last Chat Reply</p>
              <div className="flex gap-2">
                {lastReplies.map((r) => (
                  <button
                    key={r}
                    className="rounded-full border px-3 py-1 text-sm hover:bg-accent"
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <FallbackCenter title="ตอนนี้ยังไม่มีคำแนะนำปิดการขาย ลองใหม่ภายหลัง" />
        )}
      </DrawerContent>
    </Drawer>
  )
}
