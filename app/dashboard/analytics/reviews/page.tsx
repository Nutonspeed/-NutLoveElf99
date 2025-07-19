"use client"
import { useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'
import { getReviews } from '@/core/mock/store'

export default function ReviewAnalyticsPage() {
  const reviews = getReviews()
  const avg = useMemo(() => {
    if (reviews.length === 0) return 0
    return reviews.reduce((s,r)=>s+r.rating,0)/reviews.length
  }, [reviews])

  const pie = [
    { name: 'พอใจ', value: reviews.filter(r=>r.rating>=4).length },
    { name: 'เฉยๆ', value: reviews.filter(r=>r.rating===3).length },
    { name: 'ไม่พอใจ', value: reviews.filter(r=>r.rating<=2).length }
  ]

  const bars = [1,2,3,4,5].map(n=>({ rating: n, count: reviews.filter(r=>r.rating===n).length }))

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">สรุปรีวิว</h1>
      <p>คะแนนเฉลี่ย {avg.toFixed(2)} จาก {reviews.length} รีวิว</p>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pie} dataKey="value" nameKey="name">
                <Cell fill="#4ade80" />
                <Cell fill="#fbbf24" />
                <Cell fill="#f87171" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bars}>
              <XAxis dataKey="rating" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
