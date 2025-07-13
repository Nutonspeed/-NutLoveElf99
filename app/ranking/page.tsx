"use client"

import Image from 'next/image'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getFabricRanking } from '@/lib/get-fabric-ranking'

export default function RankingPage() {
  const ranking = getFabricRanking()
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">ผ้ายอดนิยม</h1>
        <ol className="space-y-4">
          {ranking.map((f, idx) => (
            <li key={f.slug} className="flex items-center space-x-4">
              <span className="w-6">{idx + 1}</span>
              <Image src={f.image || '/placeholder.svg'} alt={f.name} width={60} height={60} className="rounded" />
              <span>{f.name}</span>
              <span className="ml-auto text-gray-600">{f.count}</span>
            </li>
          ))}
        </ol>
      </div>
      <Footer />
    </div>
  )
}
