"use client"
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { mockConversations } from '@/lib/mock-chat'
import { mockCustomers } from '@/lib/mock-customers'
import { chatCustomerLinks, loadChatCustomerLinks, linkCustomer } from '@/lib/mock-chat-customer-links'

export default function ChatCustomerLinksPage() {
  const [links, setLinks] = useState(chatCustomerLinks)

  useEffect(() => {
    loadChatCustomerLinks()
    setLinks([...chatCustomerLinks])
  }, [])

  const handleLink = (conversationId: string, customerId: string) => {
    linkCustomer(conversationId, customerId)
    setLinks([...chatCustomerLinks])
  }

  const getSelected = (conversationId: string) =>
    links.find((l) => l.conversationId === conversationId)?.customerId || ''

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto space-y-4">
        <div className="flex items-center space-x-4">
          <Link href="/admin/chat">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ผูกลูกค้ากับแชท</h1>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ห้องแชท</TableHead>
              <TableHead>ลูกค้า</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockConversations.map((c) => (
              <TableRow key={c.id}>
                <TableCell>{c.name}</TableCell>
                <TableCell>
                  <Select
                    value={getSelected(c.id)}
                    onValueChange={(val) => handleLink(c.id, val)}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="เลือกลูกค้า" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCustomers.map((cu) => (
                        <SelectItem key={cu.id} value={cu.id}>
                          {cu.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
