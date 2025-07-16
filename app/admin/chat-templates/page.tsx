"use client"
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/inputs/input'
import {
  chatTemplates,
  loadChatTemplates,
  importChatTemplates,
  exportChatTemplates,
} from '@/lib/mock-chat-templates'

export default function ChatTemplatePage() {
  const [items, setItems] = useState([...chatTemplates])
  const [error, setError] = useState('')

  useEffect(() => {
    loadChatTemplates()
    setItems([...chatTemplates])
  }, [])

  const handleFile = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      const ok = importChatTemplates(reader.result as string)
      if (ok) {
        setItems([...chatTemplates])
        setError('')
      } else {
        setError('ไฟล์ไม่ถูกต้อง / ไม่สามารถโหลดได้')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ข้อความด่วน</h1>
          <div className="ml-auto flex gap-2">
            <Input
              type="file"
              accept="application/json"
              onChange={e => e.target.files && handleFile(e.target.files[0])}
            />
            <Button variant="outline" onClick={() => exportChatTemplates('chat-templates.json')}>
              Export JSON
            </Button>
          </div>
        </div>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <Card>
          <CardHeader>
            <CardTitle>Templates ({items.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ชื่อ</TableHead>
                  <TableHead>ข้อความ</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map(t => (
                  <TableRow key={t.id}>
                    <TableCell>{t.name}</TableCell>
                    <TableCell>{t.text}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {items.length === 0 && (
              <p className="text-center py-8 text-gray-500">ไม่มีข้อมูล</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
