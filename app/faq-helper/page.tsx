"use client"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import EmptyState from "@/components/EmptyState"
import CopyTextButton from "@/components/CopyTextButton"
import { faqItems, loadFaq, type FaqItem } from "@/lib/mock-faq"

function findBestMatch(q: string): FaqItem | null {
  const query = q.toLowerCase().trim()
  if (!query) return null
  let best: FaqItem | null = null
  let bestScore = 0
  const tokens = query.split(/\s+/)
  for (const item of faqItems) {
    const text = item.question.toLowerCase()
    let score = 0
    for (const t of tokens) {
      if (text.includes(t)) score += 1
    }
    if (score > bestScore) {
      bestScore = score
      best = item
    }
  }
  return best
}

export default function FaqHelperPage() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState<FaqItem | null>(null)
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    loadFaq()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const res = findBestMatch(question)
    setAnswer(res)
    setSearched(true)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>ผู้ช่วยตอบคำถาม</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="พิมพ์คำถามของคุณ"
              />
              <Button type="submit">ค้นหา</Button>
            </form>
            {searched && (
              answer ? (
                <div className="space-y-2">
                  <p>{answer.answer}</p>
                  <CopyTextButton text={answer.answer} />
                </div>
              ) : (
                <EmptyState title="ไม่พบคำตอบ" subtitle="ลองพิมพ์คำถามใหม่" />
              )
            )}
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  )
}
