"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FeedbackCard from "@/components/FeedbackCard"
import { loadFeedbacks, mockFeedbacks, type Feedback } from "@/lib/mock-feedback"

export default function OrderFeedbackPage({ params }: { params: { id: string } }) {
  const { id } = params
  const [fb, setFb] = useState<Feedback | undefined>()
  const [status, setStatus] = useState<string>("")

  useEffect(() => {
    loadFeedbacks()
    setFb(mockFeedbacks.find(f => f.orderId === id))
    if (typeof window !== "undefined") {
      setStatus(localStorage.getItem("fb-" + id) || "")
    }
  }, [id])

  const mark = (s: string) => {
    setStatus(s)
    if (typeof window !== "undefined") localStorage.setItem("fb-" + id, s)
  }

  if (!fb) {
    return <div className="min-h-screen flex items-center justify-center">ไม่มีความคิดเห็น</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <Link href={`/admin/orders/${id}`}>\
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Feedback ออเดอร์ {id}</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ความคิดเห็น</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FeedbackCard fb={fb} />
            <div className="space-x-2">
              <Button onClick={() => mark("read")} disabled={status === "read"}>อ่านแล้ว</Button>
              <Button variant="outline" onClick={() => mark("followup")} disabled={status === "followup"}>ต้อง follow up</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
