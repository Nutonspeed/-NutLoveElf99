"use client"
import { useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { mockBills, type AdminBill } from "@/mock/bills"
import { syncFlashStatuses } from "@/lib/flashApi"
import { toast } from "sonner"

export default function FlashDashboard() {
  const [bills, setBills] = useState<AdminBill[]>(() => mockBills.map(b => ({ ...b })))

  const handleSync = async () => {
    try {
      await syncFlashStatuses(bills)
      setBills([...bills])
      toast.success("สำเร็จ")
    } catch (e) {
      console.error(e)
      toast.error("ล้มเหลว")
    }
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Flash Dashboard</h1>
        <Button onClick={handleSync}>เช็คสถานะ Flash Express</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tracking</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bills.map(b => (
            <TableRow key={b.id}>
              <TableCell>{b.id}</TableCell>
              <TableCell>{b.trackingNumber || '-'}</TableCell>
              <TableCell>{b.shippingStatus || '-'}</TableCell>
              <TableCell className="space-x-1">
                {b.tags.filter(t => t.startsWith('flash-status')).map(t => (
                  <Badge key={t}>{t.split(':')[1]}</Badge>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
