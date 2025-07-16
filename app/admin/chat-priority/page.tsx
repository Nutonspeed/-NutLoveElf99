"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import type { Conversation } from '@/types/conversation'
import { loadConversations, listConversations } from '@/lib/mock-conversations'

export default function ChatPriorityPage() {
  const [convos, setConvos] = useState<Conversation[]>([])

  useEffect(() => {
    loadConversations()
    setConvos([...listConversations()])
  }, [])

  const now = Date.now()
  const items = convos
    .map((c) => {
      let urgency = 0
      let status: string | null = null
      if (c.tags.includes('สำคัญ')) {
        urgency = 2
        status = 'แชทสำคัญ'
      }
      if (now - new Date(c.updatedAt).getTime() > 24 * 60 * 60 * 1000) {
        if (urgency < 1) urgency = 1
        status = status || 'ค้างเกิน 1 วัน'
      }
      return { ...c, urgency, status }
    })
    .filter((c) => c.status)
    .sort((a, b) => b.urgency - a.urgency)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">คิวแชท</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>แชทค้างนาน</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>ข้อความล่าสุด</TableHead>
                  <TableHead>สถานะ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((c) => (
                  <TableRow key={c.id} className={c.urgency === 2 ? 'bg-red-50' : ''}>
                    <TableCell>{c.customerName}</TableCell>
                    <TableCell>{c.lastMessage}</TableCell>
                    <TableCell className="flex items-center gap-1">
                      {c.status}
                      {c.urgency === 2 && <AlertCircle className="h-4 w-4 text-red-600" />}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {items.length === 0 && (
              <p className="text-center py-8 text-gray-500">ไม่มีแชทค้างนาน</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
