"use client"
import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/buttons/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'

interface Feedback {
  id: string
  rating: number
  timestamp: string
}

export default function FeedbackAnalyticsPage() {
  const [data, setData] = useState<Feedback[]>([])
  useEffect(() => {
    fetch('/api/feedback')
      .then((r) => r.json())
      .then((d) => setData(d.feedback || []))
  }, [])

  const daily = data.reduce<Record<string, { count: number; sum: number }>>((acc, f) => {
    const day = f.timestamp.split('T')[0]
    if (!acc[day]) acc[day] = { count: 0, sum: 0 }
    acc[day].count += 1
    acc[day].sum += f.rating
    return acc
  }, {})
  const chartData = Object.entries(daily).map(([date, { count, sum }]) => ({ date, avg: sum / count }))
  const breakdown = [1, 2, 3, 4, 5].map((n) => ({ star: n, count: data.filter((f) => f.rating === n).length }))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-4">
        <div className="flex items-center space-x-4">
          <Link href="/admin/reviews">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Feedback Analytics</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Average Rating Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-60">
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis domain={[1,5]} />
                <Tooltip />
                <Line type="monotone" dataKey="avg" stroke="#2563eb" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Rating Breakdown (total {data.length})</CardTitle>
          </CardHeader>
          <CardContent className="h-60">
            <ResponsiveContainer>
              <BarChart data={breakdown}>
                <XAxis dataKey="star" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#16a34a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
