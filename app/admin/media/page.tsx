"use client"
import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { Input } from '@/components/ui/inputs/input'
import { useAuth } from '@/contexts/auth-context'
import { getMedia } from '@/lib/mock-media'
import { canAccess } from '@/lib/mock-roles'

export default function AdminMediaPage() {
  const { user, isAuthenticated } = useAuth()
  const [search, setSearch] = useState('')
  const media = getMedia().filter(m => m.url.includes(search))

  if (!isAuthenticated || !canAccess(user?.role, 'media')) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">ไม่มีสิทธิ์เข้าถึง</h1>
          <Link href="/">
            <Button>กลับหน้าแรก</Button>
          </Link>
        </div>
      </div>
    )
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
          <h1 className="text-3xl font-bold">คลังรูปภาพ</h1>
        </div>
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>รูปภาพ ({media.length})</CardTitle>
              <Input placeholder="ค้นหา..." value={search} onChange={e => setSearch(e.target.value)} className="w-64" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {media.map(m => (
                <div key={m.id} className="border rounded-lg p-2 text-center">
                  <img src={m.url} alt="img" className="h-32 w-full object-cover rounded" />
                  <p className="text-sm mt-2 text-gray-500">{m.source}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
