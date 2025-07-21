"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import { mockBills } from "@/lib/mock-bills"

type Record = {
  billId: string
  status: string
  provider: string
  lastSynced: string
}

const LS_KEY = "shipping_status_cache"

export default function ShippingStatusPage() {
  const [records, setRecords] = useState<Record[]>([])

  const billIds = mockBills.map(b => b.id)

  const loadCache = () => {
    if (typeof window === "undefined") return
    const stored = localStorage.getItem(LS_KEY)
    if (stored) setRecords(JSON.parse(stored))
  }

  const saveCache = (data: Record[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem(LS_KEY, JSON.stringify(data))
  }

  const sync = async () => {
    const res = await fetch("/api/shipping/flash/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: billIds }),
    }).then(r => r.json())
    const newRecords: Record[] = res.statuses
    newRecords.forEach(n => {
      const prev = records.find(r => r.billId === n.billId)
      if (prev && prev.status !== n.status) {
        toast.message(`Bill ${n.billId} ${n.status}`)
      }
    })
    setRecords(newRecords)
    saveCache(newRecords)
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

  return (
    <div className="container mx-auto space-y-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shipping Status Sync</h1>
        <Button onClick={sync}>Sync Now</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bill</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Last Sync</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map(r => (
            <TableRow key={r.billId}>
              <TableCell>{r.billId}</TableCell>
              <TableCell>{r.status}</TableCell>
              <TableCell>{r.provider}</TableCell>
              <TableCell>{new Date(r.lastSynced).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
