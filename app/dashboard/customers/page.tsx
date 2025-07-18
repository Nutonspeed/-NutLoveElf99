"use client"
import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import EmptyState from "@/components/EmptyState"
import CustomerCard from "@/components/customers/CustomerCard"
import { mockCustomers, type Customer } from "@/lib/mock-customers"

export default function DashboardCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([...mockCustomers])
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("newest")

  const filtered = customers.filter((c) => {
    const term = search.toLowerCase()
    return (
      c.name.toLowerCase().includes(term) ||
      c.phone?.includes(term)
    )
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sort === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="container mx-auto space-y-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ลูกค้า ({filtered.length})</h1>
        <Link href="/dashboard/customers/new"><Button>เพิ่มลูกค้า</Button></Link>
      </div>
      <div className="flex gap-2">
        <Input placeholder="ค้นหา..." value={search} onChange={(e)=>setSearch(e.target.value)} className="max-w-xs" />
        <select value={sort} onChange={(e)=>setSort(e.target.value)} className="border rounded p-2">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      {sorted.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map(c => <CustomerCard key={c.id} customer={c} />)}
        </div>
      ) : (
        <EmptyState title="ไม่มีลูกค้าในระบบ" />
      )}
    </div>
  )
}
