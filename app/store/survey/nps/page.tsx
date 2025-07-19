"use client"
import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/buttons/button'
import { addNps } from '@/core/mock/store'

export default function NpsSurveyPage() {
  const [score, setScore] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const submit = () => {
    if (score === null) return
    addNps({ id: Date.now().toString(), score, createdAt: new Date().toISOString() })
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 space-y-4 max-w-lg">
        <h1 className="text-center text-2xl font-bold">แนะนำร้านให้เพื่อนไหม?</h1>
        {!submitted ? (
          <>
            <div className="flex flex-wrap gap-1 justify-between">
              {Array.from({ length: 11 }, (_, i) => (
                <Button key={i} variant={score===i? 'default':'outline'} onClick={() => setScore(i)}>
                  {i}
                </Button>
              ))}
            </div>
            <Button className="w-full" onClick={submit} disabled={score===null}>ส่ง</Button>
          </>
        ) : (
          <p className="text-center text-green-600">ขอบคุณสำหรับคำตอบ</p>
        )}
      </div>
      <Footer />
    </div>
  )
}
