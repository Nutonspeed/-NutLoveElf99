"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Badge } from '@/components/ui/badge'
import { Eye, ArrowLeft } from 'lucide-react'
import { loadNotificationStatus, getStatus, markRead } from '@/lib/mock-read-status'

interface Log {
  id: string
  type?: string
  message: string
  time: string
}

export default function AdminNotificationsPage() {
  const [items, setItems] = useState<Log[]>([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    loadNotificationStatus()
    fetch('/api/admin/notifications').then(r => r.json()).then(setItems)
  }, [])

  const handleRead = (id: string) => {
    markRead(id)
    setItems([...items])
  }

  const filtered = items.filter(i => filter === 'all' || i.type === filter)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Notifications</h1>
        </div>
        <select value={filter} onChange={e => setFilter(e.target.value)} className="border p-1">
          <option value="all">all</option>
          <option value="line">line</option>
          <option value="sms">sms</option>
        </select>
        <Card>
          <CardHeader>
            <CardTitle>Logs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {filtered.map(n => {
              const s = getStatus(n.id)
              return (
                <div key={n.id} className="flex items-center justify-between border-b pb-2 last:border-b-0">
                  <div>
                    <p className="font-medium">{n.message}</p>
                    <p className="text-xs text-gray-500">{n.time}</p>
                    {!s.read && <Badge variant="destructive">new</Badge>}
                  </div>
                  {!s.read && (
                    <Button variant="outline" size="icon" onClick={() => handleRead(n.id)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )
            })}
            {filtered.length === 0 && <p className="text-sm text-center text-gray-500">No notifications</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
