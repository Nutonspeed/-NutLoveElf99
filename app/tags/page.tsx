"use client"
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import Link from 'next/link'
import { useFabrics } from '@/contexts/fabrics-context'

export default function TagsPage() {
  const { fabrics } = useFabrics()
  const tags = Array.from(new Set(fabrics.flatMap(f => f.tags ?? [])))
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-4">
        <h1 className="text-3xl font-bold">แท็กทั้งหมด</h1>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Link key={tag} href={`/tags/${tag}`} className="px-2 py-1 bg-muted rounded text-sm">
              {tag}
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
