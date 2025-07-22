'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Loading from './loading'

const ReviewsContent = dynamic(() => import('./content'), { suspense: true })

export default function AdminReviewsPage() {
  return (
    <Suspense fallback={<Loading />}> 
      <ReviewsContent />
    </Suspense>
  )
}
