"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Input } from '@/components/ui/inputs/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { listNotes, addNote, Note } from '@/core/mock/store'

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(listNotes())
  const [type, setType] = useState<'order'|'bill'|'customer'>('order')
  const [ref, setRef] = useState('')
  const [tag, setTag] = useState<'important'|'follow-up'|'internal'>('internal')
  const [msg, setMsg] = useState('')

  useEffect(() => setNotes(listNotes()), [])

  const handleAdd = () => {
    if(!ref || !msg) return
    addNote({ type, ref, tag, message: msg })
    setNotes(listNotes())
    setRef(''); setMsg('')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Admin Notes</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Add Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Select value={type} onValueChange={v=>setType(v as any)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="order">order</SelectItem>
                <SelectItem value="bill">bill</SelectItem>
                <SelectItem value="customer">customer</SelectItem>
              </SelectContent>
            </Select>
            <Input placeholder="ref id" value={ref} onChange={e=>setRef(e.target.value)} />
            <Select value={tag} onValueChange={v=>setTag(v as any)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="important">important</SelectItem>
                <SelectItem value="follow-up">follow-up</SelectItem>
                <SelectItem value="internal">internal</SelectItem>
              </SelectContent>
            </Select>
            <Textarea value={msg} onChange={e=>setMsg(e.target.value)} />
            <Button onClick={handleAdd}>add</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Notes</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {notes.map(n=> (
                <li key={n.id} className="border p-2 rounded text-sm">
                  <p className="text-gray-500">[{n.type}] {n.ref} - {n.tag}</p>
                  <p>{n.message}</p>
                </li>
              ))}
              {notes.length===0 && <p>No notes</p>}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
