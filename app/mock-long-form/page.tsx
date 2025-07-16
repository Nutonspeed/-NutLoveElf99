'use client'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

const MockLongForm = dynamic(() => import('@/components/MockLongForm'), {
  suspense: true,
})

export default function MockLongFormPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8">
        <Suspense fallback={<div>Loading...</div>}>
          <MockLongForm />
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}
