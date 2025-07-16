"use client"
import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { mockUser } from "@/contexts/mock-auth-context"

const steps = [
  "นี่คือเมนูหลักของร้าน",
  "กด \"เปิดบิลเร็ว\" เพื่อเปิดบิล",
  "เลือกเมนู \"ลายผ้า\" เพื่อดูคอลเลกชันผ้า"
]

export default function WalkthroughModal() {
  const [step, setStep] = useState(0)
  const finish = () => {
    mockUser.hasSeenIntro = true
    setStep(steps.length)
  }
  if (step >= steps.length) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow w-72 space-y-4 text-center">
          <p>{steps[step]}</p>
          <div className="flex justify-center gap-2">
            <Button onClick={() => (step === steps.length - 1 ? finish() : setStep(step + 1))}>
              {step === steps.length - 1 ? "ปิด" : "ถัดไป"}
            </Button>
            <Button variant="secondary" onClick={finish}>ข้าม</Button>
          </div>
      </div>
    </div>
  )
}
