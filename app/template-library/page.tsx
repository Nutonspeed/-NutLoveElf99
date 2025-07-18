"use client"

import { useEffect, useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Input } from '@/components/ui/inputs/input'
import { Star, Search } from 'lucide-react'
import {
  chatTemplates,
  loadChatTemplates,
  toggleTemplateFavorite,
} from '@/lib/mock-chat-templates'

export default function TemplateLibraryPage() {
  const [templates, setTemplates] = useState([...chatTemplates])
  const [query, setQuery] = useState('')

  useEffect(() => {
    loadChatTemplates()
    setTemplates([...chatTemplates])
  }, [])

  const toggle = (id: string) => {
    toggleTemplateFavorite(id)
    setTemplates([...chatTemplates])
  }

  const filtered = templates.filter(
    (t) =>
      t.name.includes(query) ||
      t.text.includes(query),
  )

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 space-y-4">
        <h1 className="text-3xl font-bold">คลังข้อความด่วน</h1>
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="ค้นหาข้อความ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="space-y-2">
          {filtered.map((t) => (
            <div key={t.id} className="border rounded p-4 flex justify-between">
              <div>
                <p className="font-medium">{t.name}</p>
                <p className="text-sm text-gray-600">{t.text}</p>
              </div>
              <button onClick={() => toggle(t.id)} aria-label="toggle favorite">
                <Star
                  className={`h-6 w-6 ${t.favorite ? 'text-yellow-500' : 'text-gray-400'}`}
                  fill={t.favorite ? 'currentColor' : 'none'}
                />
              </button>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="text-center py-8 text-gray-500">ไม่พบข้อความที่ค้นหา</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
