"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/modals/dialog'
import {
  conversations,
  loadConversations,
  addTag,
  searchByTag,
  getStats,
  type Conversation,
} from '@/lib/mock-chat-conversations'
import { chatTemplates } from '@/lib/mock-chat-templates'

export default function ChatMonitorPage() {
  const [data, setData] = useState<Conversation[]>([])
  const [selected, setSelected] = useState<Conversation | null>(null)
  const [tag, setTag] = useState('')
  const [searchTag, setSearchTag] = useState('')

  useEffect(() => {
    loadConversations()
    setData([...conversations])
  }, [])

  const stats = getStats()

  const handleAddTag = () => {
    if (selected && tag) {
      addTag(selected.id, tag)
      setData([...conversations])
      setTag('')
    }
  }

  const filtered = searchTag ? searchByTag(searchTag) : data

  return (
    <div className="min-h-screen p-4 space-y-6">
      <Link href="/admin/dashboard">
        <Button variant="outline">กลับแดชบอร์ด</Button>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">ลูกค้าใหม่</p>
            <p className="text-2xl font-bold">{stats.newCustomers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">รอดำเนินการ</p>
            <p className="text-2xl font-bold">{stats.pending}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">ลูกค้าซ้ำ</p>
            <p className="text-2xl font-bold">{stats.repeat}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <input
          className="border rounded p-2 w-full"
          placeholder="ค้นหาแท็ก"
          value={searchTag}
          onChange={(e) => setSearchTag(e.target.value)}
        />
        {filtered.map((c) => (
          <Card key={c.id} className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{c.customer}</p>
                <p className="text-sm text-gray-600">{c.lastMessage}</p>
                <div className="space-x-2 mt-2">
                  {c.tags.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                {c.rating && <p className="mt-2 text-sm">Rating: {c.rating}</p>}
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" variant="outline" onClick={() => setSelected(c)}>
                    ใส่แท็ก
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>เพิ่มแท็กให้บทสนทนา</DialogTitle>
                  </DialogHeader>
                  <input
                    className="border rounded p-2 w-full"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                  />
                  <DialogFooter>
                    <Button onClick={handleAddTag}>บันทึก</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mt-4 flex space-x-2">
              {chatTemplates.map((t) => (
                <Button
                  key={t.id}
                  size="sm"
                  variant="secondary"
                  onClick={() => alert(t.text)}
                >
                  {t.name}
                </Button>
              ))}
              <Button size="sm" onClick={() => alert('แจ้งหัวหน้าแล้ว')}>แจ้งหัวหน้า</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
