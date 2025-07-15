"use client"
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { FabricsList } from '@/components/FabricsList'
import { useFabrics } from '@/contexts/fabrics-context'

export default function TagPage({ params }: { params: { tag: string } }) {
  const { fabrics } = useFabrics()
  const items = fabrics.filter(f => f.tags?.includes(params.tag))
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">แท็ก: {params.tag}</h1>
        <FabricsList fabrics={items} />
      </div>
      <Footer />
    </div>
  )
}
