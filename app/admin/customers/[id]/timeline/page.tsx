"use client"
import { useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, ShoppingBag, Package, Shield, Star } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { listActivities, loadActivities, type CustomerActivity } from '@/lib/mock-customer-timeline'

export default function CustomerTimelinePage({ params }: { params: { id: string } }) {
  const { id } = params
  const activities: CustomerActivity[] = listActivities(id)
  useEffect(() => { loadActivities() }, [])

  const iconMap = {
    order: <ShoppingBag className="h-4 w-4" />,
    fabric: <Package className="h-4 w-4" />,
    claim: <Shield className="h-4 w-4" />,
    review: <Star className="h-4 w-4" />,
  } as const

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-6">
          <Link href={`/admin/customers/${id}`}>\
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">กิจกรรมลูกค้า</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>ไทม์ไลน์</CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length > 0 ? (
              <ul className="space-y-2">
                {activities.map((a) => (
                  <li key={a.id} className="flex items-center space-x-2">
                    {iconMap[a.type]}
                    <span className="w-32 text-sm">{new Date(a.timestamp).toLocaleDateString('th-TH')}</span>
                    <span className="flex-1 text-sm">{a.admin}</span>
                    <span className="capitalize text-sm">{a.type}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center py-4 text-gray-500">ไม่พบประวัติลูกค้ารายนี้</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
