"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { faqItems, loadFaq, saveFaq, type FaqItem } from "@/lib/mock-faq"

export default function AdminFaqPage() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [items, setItems] = useState<FaqItem[]>(faqItems)
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState("")

  useEffect(() => {
    loadFaq()
    setItems([...faqItems])
    if (!isAuthenticated) {
      router.push("/login")
    } else if (user?.role !== "admin") {
      router.push("/")
    }
  }, [isAuthenticated, user, router])

  if (!isAuthenticated || user?.role !== "admin") return null

  const addItem = () => {
    const newItem = { id: Date.now().toString(), question, answer }
    const updated = [...items, newItem]
    setItems(updated)
    saveFaq(updated)
    setQuestion("")
    setAnswer("")
  }

  const removeItem = (id: string) => {
    const updated = items.filter((f) => f.id !== id)
    setItems(updated)
    saveFaq(updated)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4 mb-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">จัดการ FAQ</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>เพิ่มคำถามใหม่</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="คำถาม" />
            <Input value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="คำตอบ" />
            <Button onClick={addItem} disabled={!question || !answer}>เพิ่ม</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>รายการ FAQ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {items.map((f) => (
              <div key={f.id} className="flex items-center justify-between border-b py-2">
                <div>
                  <p className="font-medium">{f.question}</p>
                  <p className="text-sm text-gray-600">{f.answer}</p>
                </div>
                <Button size="icon" variant="outline" onClick={() => removeItem(f.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {items.length === 0 && <p className="text-center text-gray-500">ไม่มีข้อมูล</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
