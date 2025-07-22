import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import Loading from './loading'

const AnalyticsContent = dynamic(() => import('./content'), { suspense: true })

export default function AdminAnalyticsPage() {
  return (
    <Suspense fallback={<Loading />}> 
      <AnalyticsContent />
    </Suspense>
  )
}
