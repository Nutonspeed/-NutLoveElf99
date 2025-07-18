"use client"

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { fabrics } from '@/lib/mock-fabrics'

export default function AdminFavoritesAnalytics() {
  const [counts] = useLocalStorage<Record<string, number>>('favorite-counts', {})
  const ranking = [...fabrics].map((f) => ({
    ...f,
    count: counts[f.slug] || 0,
  })).sort((a, b) => b.count - a.count)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/analytics">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">ผ้าที่ถูกชอบมากที่สุด</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>รายการ</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-2 list-decimal list-inside">
              {ranking.map((f, idx) => (
                <li key={f.slug} className="flex justify-between">
                  <span>{f.name}</span>
                  <span className="text-gray-600">{f.count}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
