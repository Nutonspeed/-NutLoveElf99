"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Input } from '@/components/ui/inputs/input'
import { chatTags, loadChatTags, addChatTag, removeChatTag } from '@/lib/mock-chat'

export default function AdminChatTagsPage() {
  const [tags, setTags] = useState<string[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    loadChatTags()
    setTags([...chatTags])
  }, [])

  const add = () => {
    if (input) {
      addChatTag(input)
      setTags([...chatTags])
      setInput('')
    }
  }

  const remove = (tag: string) => {
    removeChatTag(tag)
    setTags([...chatTags])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/chat">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">จัดการแท็กแชท</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>แท็กทั้งหมด</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {tags.map((t) => (
              <div key={t} className="flex items-center space-x-2">
                <span>{t}</span>
                <Button variant="outline" size="icon" onClick={() => remove(t)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {tags.length === 0 && (
              <p className="text-gray-500">ไม่มี tag ใช้งานในระบบ</p>
            )}
            <div className="flex space-x-2 pt-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="tag" />
              <Button variant="outline" onClick={add}>บันทึก</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
