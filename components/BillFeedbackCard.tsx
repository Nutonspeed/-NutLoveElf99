"use client"
import { Star } from 'lucide-react'
import type { AdminBill } from '@/mock/bills'

export default function BillFeedbackCard({ bill }: { bill: AdminBill }) {
  const fb = bill.feedback!
  return (
    <div className="border rounded p-4 space-y-2">
      <div className="flex items-center space-x-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${fb.rating && i < fb.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        {fb.date && (
          <span className="ml-2 text-sm text-gray-500">
            {new Date(fb.date).toLocaleDateString()}
          </span>
        )}
      </div>
      {fb.message && <p className="text-sm">{fb.message}</p>}
      <p className="text-xs text-gray-500">Bill: {bill.id}</p>
    </div>
  )
}
