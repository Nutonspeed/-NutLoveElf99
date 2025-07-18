"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import { setRating, loadConversations } from "@/lib/mock-conversations"

export default function RateChatPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [rated, setRated] = useState(false)

  useEffect(() => {
    loadConversations()
  }, [])

  const giveRating = (r: number) => {
    setRating(id, r)
    setRated(true)
    setTimeout(() => router.push('/chat'), 1000)
  }

  return (
    <div className="flex flex-col min-h-screen items-center">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        {rated ? (
          <p>ขอบคุณสำหรับการประเมิน</p>
        ) : (
          <>
            <p className="text-lg">ให้คะแนนแชทครั้งนี้</p>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <Button key={n} onClick={() => giveRating(n)}>{n}</Button>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  )
}
