"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Checkbox } from '@/components/ui/checkbox'
import { ConfirmationDialog } from '@/components/order/confirmation-dialog'
import { useToast } from '@/hooks/use-toast'
import {
  addChatMessage,
  deleteChatMessages,
  listChatMessages,
  loadChatMessages,
} from '@/lib/mock-chat-messages'
import { loadChatTemplates } from '@/lib/mock-chat-templates'
import type { ChatMessageEntry } from '@/lib/mock-chat-messages'

export default function AdminChatMessagesPage() {
  const [messages, setMessages] = useState<ChatMessageEntry[]>([])
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [action, setAction] = useState<'resend' | 'delete' | null>(null)
  const { toast } = useToast()
  const conversationId = 'conv-001'

  useEffect(() => {
    loadChatTemplates()
    loadChatMessages()
    setMessages([...listChatMessages(conversationId)])
  }, [])

  const selectedIds = Object.keys(selected).filter((id) => selected[id])
  const allSelected = messages.length > 0 && selectedIds.length === messages.length
  const partialSelected = selectedIds.length > 0 && selectedIds.length < messages.length

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      const obj: Record<string, boolean> = {}
      messages.forEach((m) => {
        obj[m.id] = true
      })
      setSelected(obj)
    } else {
      setSelected({})
    }
  }

  const confirmResend = () => {
    selectedIds.forEach((id) => {
      const msg = messages.find((m) => m.id === id)
      if (msg) addChatMessage(msg.conversationId, msg.templateId)
    })
    setMessages([...listChatMessages(conversationId)])
    setSelected({})
    setAction(null)
    toast.success(`ส่งข้อความซ้ำ ${selectedIds.length} รายการแล้ว`)
  }

  const confirmDelete = () => {
    deleteChatMessages(conversationId, selectedIds)
    setMessages([...listChatMessages(conversationId)])
    setSelected({})
    setAction(null)
    toast.success(`ลบข้อความ ${selectedIds.length} รายการแล้ว`)
  }

  const handleAction = (type: 'resend' | 'delete') => {
    if (selectedIds.length === 0) {
      toast.error('กรุณาเลือกข้อความอย่างน้อย 1 รายการ')
      return
    }
    setAction(type)
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
          <h1 className="text-3xl font-bold">ข้อความแชท</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>รายการข้อความ</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={allSelected}
                ref={(ref) => {
                  if (ref) ref.indeterminate = partialSelected
                }}
                onCheckedChange={toggleSelectAll}
              />
              <span className="text-sm text-muted-foreground">
                {selectedIds.length > 0
                  ? `เลือกแล้ว ${selectedIds.length} จาก ${messages.length} รายการ`
                  : `ทั้งหมด ${messages.length} รายการ`}
              </span>
            </div>
            <div className="space-y-1">
              {messages.map((m) => (
                <label key={m.id} className="flex items-start space-x-2">
                  <Checkbox
                    checked={!!selected[m.id]}
                    onCheckedChange={(v) =>
                      setSelected({ ...selected, [m.id]: Boolean(v) })
                    }
                  />
                  <div>
                    <p>{m.text}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(m.createdAt).toLocaleString('th-TH')}
                    </p>
                  </div>
                </label>
              ))}
            </div>
            {messages.length === 0 && (
              <p className="text-center py-8 text-gray-500">ไม่มีข้อความ</p>
            )}
            <div className="pt-2 flex space-x-2">
              <Button onClick={() => handleAction('resend')}>ส่งข้อความซ้ำ</Button>
              <Button
                variant="destructive"
                onClick={() => handleAction('delete')}
              >
                ลบหลายข้อความ
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <ConfirmationDialog
        open={action === 'delete'}
        onOpenChange={() => setAction(null)}
        title="ยืนยันการลบ"
        description={`คุณต้องการลบข้อความ ${selectedIds.length} รายการหรือไม่?`}
        confirmText="ลบข้อความ"
        onConfirm={confirmDelete}
        variant="destructive"
      />
      <ConfirmationDialog
        open={action === 'resend'}
        onOpenChange={() => setAction(null)}
        title="ยืนยันการส่งซ้ำ"
        description={`ส่งข้อความซ้ำ ${selectedIds.length} รายการหรือไม่?`}
        confirmText="ส่งข้อความ"
        onConfirm={confirmResend}
      />
    </div>
  )
}
