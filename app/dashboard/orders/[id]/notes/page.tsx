"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { useAuth } from "@/contexts/auth-context"
import { loadOrderNotes, listOrderNotes, addOrderNote } from "@/lib/mock-order-notes"

export default function OrderNotesPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { user } = useAuth()
  const [notes, setNotes] = useState(() => listOrderNotes(id))
  const [input, setInput] = useState("")

  useEffect(() => {
    loadOrderNotes()
    setNotes(listOrderNotes(id))
  }, [id])

  const submit = () => {
    if (!input) return
    addOrderNote(id, input, user?.id || "")
    setInput("")
    setNotes(listOrderNotes(id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-4 flex items-center space-x-2">
          <Link href={`/dashboard/orders`}>
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">โน้ตออเดอร์ {id}</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>บันทึก</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {notes.map((n) => (
              <p key={n.id} className="text-sm text-gray-600">{n.note}</p>
            ))}
            {notes.length === 0 && <p className="text-gray-500">ไม่มีโน้ต</p>}
            <div className="flex space-x-2 pt-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 rounded border px-2 py-1"
              />
              <Button variant="outline" onClick={submit}>เพิ่ม</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
