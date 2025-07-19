"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { useAuth } from '@/contexts/auth-context'
import { loadCustomerNotes, listCustomerNotes, addCustomerNote } from '@/lib/mock-customer-notes'
import { canAccess } from '@/lib/mock-roles'

export default function CustomerNotesPage({ params }: { params: { id: string } }) {
  const { id } = params
  const { user, isAuthenticated } = useAuth()
  const [notes, setNotes] = useState(() => listCustomerNotes(id, user?.id))
  const [input, setInput] = useState('')

  useEffect(() => {
    loadCustomerNotes()
    setNotes(listCustomerNotes(id, user?.id))
  }, [id, user?.id])

  if (!isAuthenticated || !canAccess(user?.role, 'inventory')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>ไม่มีสิทธิ์เข้าถึง</p>
      </div>
    )
  }

  const submit = () => {
    if (!input || input.length >= 300 || !user) return
    addCustomerNote(id, input, user.id)
    setInput('')
    setNotes(listCustomerNotes(id, user.id))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-4">
          <Link href={`/admin/customers/${id}`}>\
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">โน้ตส่วนตัว</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>บันทึกของฉัน</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {notes.map(n => (
              <p key={n.id} className="text-sm text-gray-600">{n.note}</p>
            ))}
            {notes.length === 0 && (
              <p className="text-gray-500">ยังไม่มีโน้ต</p>
            )}
            <div className="flex space-x-2 pt-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="border px-2 py-1 rounded flex-1"
              />
              <Button variant="outline" onClick={submit}>เพิ่ม</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
