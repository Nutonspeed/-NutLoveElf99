"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/inputs/input'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/modals/dialog'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/cards/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { Conversation } from '@/types/conversation'
import {
  addTag,
  listConversations,
  loadConversations,
  searchByTag,
} from '@/lib/mock-conversations'
import { chatTemplates, loadChatTemplates } from '@/lib/mock-chat-templates'
import {
  listAgents,
  toggleAgentStatus,
  ChatAgent,
} from '@/lib/mock-chat-agents'
import { assignAgent } from '@/lib/mock-conversations'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { toast } from 'sonner'

export default function AdminChatPage() {
  const [convos, setConvos] = useState<Conversation[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [tag, setTag] = useState('')
  const [agents, setAgents] = useState<ChatAgent[]>(listAgents())
  const [tagFilter, setTagFilter] = useState('all')

  useEffect(() => {
    loadConversations()
    loadChatTemplates()
    setConvos([...listConversations()])
    setAgents([...listAgents()])
  }, [])

  const openDialog = (id: string) => {
    setSelected(id)
    setTag('')
  }

  const add = () => {
    if (selected && tag) {
      addTag(selected, tag)
      setConvos([...listConversations()])
      if (tag.toLowerCase() === 'urgent') {
        toast.warning('พบข้อความด่วน')
      }
    }
    setSelected(null)
  }

  const stats = (() => {
    const customers = new Map<string, number>()
    for (const c of convos) {
      customers.set(c.customerId, (customers.get(c.customerId) || 0) + 1)
    }
    let newCount = 0
    let repeatCount = 0
    customers.forEach((v) => {
      if (v > 1) repeatCount += 1
      else newCount += 1
    })
    const pending = convos.filter((c) => c.tags.includes('รอดำเนินการ')).length
    return { newCount, repeatCount, pending }
  })()

  const search = (tag: string) => {
    const result = searchByTag(tag)
    alert(`พบ ${result.length} แชทที่มีแท็ก "${tag}"`)
  }

  const quickReply = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success('คัดลอกข้อความแล้ว')
  }

  const allTags = Array.from(new Set(convos.flatMap((c) => c.tags)))
  const filteredConvos = convos.filter((c) =>
    tagFilter === 'all' ? true : c.tags.includes(tagFilter),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center space-x-4">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">การสนทนาลูกค้า</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>สถิติการแชท</CardTitle>
          </CardHeader>
          <CardContent className="flex space-x-4">
            <div>ลูกค้าใหม่: {stats.newCount}</div>
            <div>ลูกค้าซ้ำ: {stats.repeatCount}</div>
            <div>รอดำเนินการ: {stats.pending}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>KPI Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[...agents]
                    .sort((a, b) => b.kpi - a.kpi)
                    .slice(0, 5)}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="kpi" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {agents.map((a) => (
                <div key={a.id} className="flex items-center space-x-2">
                  <Switch
                    checked={a.online}
                    onCheckedChange={() => {
                      toggleAgentStatus(a.id)
                      setAgents([...listAgents()])
                      setConvos([...listConversations()])
                    }}
                  />
                  <span>{a.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>บทสนทนา ({filteredConvos.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <span>filter</span>
              <Select onValueChange={setTagFilter} value={tagFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="ทั้งหมด" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด</SelectItem>
                  {allTags.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ลูกค้า</TableHead>
                  <TableHead>แท็ก</TableHead>
                  <TableHead>เรตติ้ง</TableHead>
                  <TableHead>ตอบด่วน</TableHead>
                  <TableHead className="w-40"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredConvos.map((c) => (
                  <TableRow key={c.id} className="align-top">
                    <TableCell>
                      <p className="font-medium">{c.customerName}</p>
                      <p className="text-sm text-gray-500">{c.lastMessage}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {c.tags.map((t) => (
                          <Badge key={t} variant="secondary">
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{c.rating ? `${c.rating}/5` : '-'}</TableCell>
                    <TableCell>
                      <Select onValueChange={quickReply}>
                        <SelectTrigger className="w-32">
                          <SelectValue placeholder="เลือก" />
                        </SelectTrigger>
                        <SelectContent>
                          {chatTemplates.map((t) => (
                            <SelectItem key={t.id} value={t.text}>
                              {t.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                  <TableCell className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDialog(c.id)}
                    >
                      ใส่ tag บทสนทนา
                    </Button>
                    <Select
                      onValueChange={(v) => {
                        assignAgent(c.id, v)
                        setConvos([...listConversations()])
                      }}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Assign" />
                      </SelectTrigger>
                      <SelectContent>
                        {agents.map((a) => (
                          <SelectItem key={a.id} value={a.id}>
                            {a.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {c.tags[0] && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => search(c.tags[0])}
                        >
                          ค้นหาแชทเก่าในหัวข้อเดียวกัน
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => alert('แจ้งหัวหน้าทีมแล้ว')}
                      >
                        แจ้งหัวหน้าทีม
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {convos.length === 0 && (
              <p className="text-center py-8 text-gray-500">ไม่มีข้อมูล</p>
            )}
          </CardContent>
        </Card>
      </div>
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>เพิ่มแท็ก</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="tag"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <DialogFooter>
            <Button onClick={add}>บันทึก</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
