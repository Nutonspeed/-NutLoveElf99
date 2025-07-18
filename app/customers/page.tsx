"use client"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import { mockCustomers, type Customer } from "@/lib/mock-customers"
import {
  loadCustomerTags,
  addCustomerTag,
  listCustomerTags,
} from "@/lib/mock-customer-tags"

export default function CustomersPage() {
  const [rank, setRank] = useState<'all' | 'gold' | 'silver' | 'normal'>('all')
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    loadCustomerTags()
  }, [])

  const customers: Customer[] = mockCustomers

  const filtered = customers.filter((c) => {
    if (rank === 'gold') return c.tier === 'Gold'
    if (rank === 'silver') return c.tier === 'Silver'
    if (rank === 'normal') return !c.tier || (c.tier !== 'Gold' && c.tier !== 'Silver')
    return true
  })

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 container mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-bold">ลูกค้าของเรา</h1>
        <div className="flex space-x-2 pb-4">
          <button
            className={`px-3 py-1 rounded border ${rank === 'gold' ? 'bg-primary text-white' : ''}`}
            onClick={() => setRank('gold')}
          >
            ทอง
          </button>
          <button
            className={`px-3 py-1 rounded border ${rank === 'silver' ? 'bg-primary text-white' : ''}`}
            onClick={() => setRank('silver')}
          >
            เงิน
          </button>
          <button
            className={`px-3 py-1 rounded border ${rank === 'normal' ? 'bg-primary text-white' : ''}`}
            onClick={() => setRank('normal')}
          >
            ปกติ
          </button>
          <button
            className={`px-3 py-1 rounded border ${rank === 'all' ? 'bg-primary text-white' : ''}`}
            onClick={() => setRank('all')}
          >
            ทั้งหมด
          </button>
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-gray-500">ยังไม่มีลูกค้าในระดับนี้</p>
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <div key={c.id} className="border p-4 rounded space-y-2">
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-gray-500">{c.email}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="text-xs border px-2 py-1 rounded"
                  onClick={() => {
                    addCustomerTag(c.id, 'VIP')
                    setRefresh((v) => v + 1)
                  }}
                >
                  VIP
                </button>
                <button
                  className="text-xs border px-2 py-1 rounded"
                  onClick={() => {
                    addCustomerTag(c.id, 'ลูกค้าประจำ')
                    setRefresh((v) => v + 1)
                  }}
                >
                  ลูกค้าประจำ
                </button>
              </div>
              <div className="flex flex-wrap gap-1">
                {[...(c.tags || []), ...listCustomerTags(c.id).map((t) => t.tag)].map((t) => (
                  <span key={t} className="text-xs bg-gray-200 px-2 py-0.5 rounded">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
