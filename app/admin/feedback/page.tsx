"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card";
import { Button } from "@/components/ui/buttons/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useBillStore } from "@/core/store";
import BillFeedbackCard from "@/components/BillFeedbackCard";

export default function FeedbackListPage() {
  const store = useBillStore()
  const [rating, setRating] = useState('all')
  const [keyword, setKeyword] = useState('')
  const [date, setDate] = useState('')
  useEffect(() => {
    store.refresh()
  }, [store])
  const items = store.bills.filter(b => b.feedback).filter(b => {
    const fb = b.feedback!
    const rOk = rating === 'all' || fb.rating === Number(rating)
    const kOk = keyword === '' || b.customer.includes(keyword) || (fb.message || '').includes(keyword)
    const dOk = date === '' || (fb.date || '').startsWith(date)
    return rOk && kOk && dOk
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="lg">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Feedback</h1>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>รายการความคิดเห็น ({items.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <select value={rating} onChange={e => setRating(e.target.value)} className="border rounded p-1 text-sm">
                <option value="all">ทุกคะแนน</option>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </select>
              <input
                value={keyword}
                onChange={e => setKeyword(e.target.value)}
                placeholder="keyword"
                className="border rounded p-1 text-sm"
              />
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                className="border rounded p-1 text-sm"
              />
            </div>
            {items.map((b, idx) => (
              <BillFeedbackCard key={idx} bill={b} />
            ))}
            {items.length === 0 && (
              <p className="text-center text-sm text-gray-500">ไม่มีข้อมูล</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
