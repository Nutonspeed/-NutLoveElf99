"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"

const steps = [
  { title: "เมนูคืออะไร", desc: "สำรวจเมนูเพื่อเข้าถึงฟีเจอร์ต่าง ๆ" },
  { title: "เปิดบิลยังไง", desc: "ไปที่หน้าใบสั่งซื้อแล้วกด \"เปิดบิล\"" },
  { title: "แชทอยู่ตรงไหน", desc: "ไอคอนแชทอยู่มุมขวาล่างของหน้าจอ" },
]

export default function MobileHome() {
  const [step, setStep] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const done = localStorage.getItem("mobileWalkthroughDone")
    if (done) router.replace("/")
  }, [router])

  const next = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      localStorage.setItem("mobileWalkthroughDone", "true")
      router.replace("/")
    }
  }

  const skip = () => {
    localStorage.setItem("mobileWalkthroughDone", "true")
    router.replace("/")
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 space-y-6">
      <Card className="w-full max-w-sm text-center">
        <CardContent className="space-y-4 p-6">
          <p className="text-lg font-semibold">{steps[step].title}</p>
          <p className="text-sm text-muted-foreground">{steps[step].desc}</p>
          <Button onClick={next} className="w-full">
            {step < steps.length - 1 ? "ถัดไป" : "เริ่มใช้งาน"}
          </Button>
          <Button variant="outline" onClick={skip} className="w-full">
            ข้าม
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
