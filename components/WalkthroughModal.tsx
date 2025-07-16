"use client"
import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"

const steps = [
  "กด \"เปิดบิลเร็ว\" เพื่อเริ่มสร้างบิล",
  "เลือกเมนู \"ลายผ้า\" เพื่อดูแบบทั้งหมด",
  "ดูเมนู \"บิลล่าสุด\" เพื่อติดตามคำสั่งซื้อ",
  "ใช้เมนู \"คุยกับลูกค้า\" เพื่อเปิดแชท"
]

export default function WalkthroughModal() {
  const [step, setStep] = useState(0)
  if (step >= steps.length) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow w-72 space-y-4 text-center">
        <p>{steps[step]}</p>
        <Button onClick={() => setStep(step + 1)}>
          {step === steps.length - 1 ? "ปิด" : "ถัดไป"}
        </Button>
      </div>
    </div>
  )
}
