"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/inputs/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { mockBills } from "@/lib/mock-bills"

interface Record {
  billId: string
  status: string
  provider: string
  lastSynced: string
}

const LS_KEY = "shipping_status_cache"

export default function ShippingDashboardPage() {
  const [records, setRecords] = useState<Record[]>([])
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const billIds = mockBills.map(b => b.id)

  const loadCache = () => {
    if (typeof window === "undefined") return
    const stored = localStorage.getItem(LS_KEY)
    if (stored) setRecords(JSON.parse(stored))
  }

  const sync = async () => {
    const res = await fetch("/api/shipping/flash/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: billIds }),
    }).then(r => r.json())
    setRecords(res.statuses)
    if (typeof window !== "undefined")
      localStorage.setItem(LS_KEY, JSON.stringify(res.statuses))
  }

  useEffect(() => {
    loadCache()
  }, [])

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const t = setInterval(sync, 300000)
      return () => clearInterval(t)
    }
  })

  const filtered = records.filter(r => {
    const match = statusFilter === "all" || r.status === statusFilter
    const term = search.toLowerCase()
    return (
      match &&
      (r.billId.toLowerCase().includes(term) || r.status.toLowerCase().includes(term))
    )
  })

  const totalShipped = records.filter(r => r.status === "in_transit").length
  const totalDelivered = records.filter(r => r.status === "delivered").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shipping Dashboard</h1>
        <Button onClick={sync}>Sync</Button>
      </div>
      <div className="flex gap-4">
        <Card>
          <CardHeader>
            <CardTitle>In Transit</CardTitle>
          </CardHeader>
          <CardContent>{totalShipped}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Delivered</CardTitle>
          </CardHeader>
          <CardContent>{totalDelivered}</CardContent>
        </Card>
      </div>
      <div className="flex gap-2">
        <Input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search" className="w-56" />
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="border p-2 rounded">
          <option value="all">ทั้งหมด</option>
          <option value="in_transit">in_transit</option>
          <option value="delivered">delivered</option>
        </select>
      </div>
      <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bill</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Sync</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map(r => (
            <TableRow key={r.billId}>
              <TableCell>{r.billId}</TableCell>
              <TableCell>{r.status}</TableCell>
              <TableCell>{new Date(r.lastSynced).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </div>
  )
}
