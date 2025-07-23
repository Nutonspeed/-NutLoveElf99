"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/buttons/button"
import { listPayments, verifyPayment, rejectPayment } from "@/lib/mock/payment"
import type { Payment } from "@/types/payment"

export default function ReconcilePage() {
  const [payments, setPayments] = useState<Payment[]>([...listPayments()])

  const pending = payments.filter(p => !p.verified && !p.rejected)

  const grouped: Record<string, Payment[]> = {}
  for (const p of pending) {
    const key = `${p.date}_${p.method || 'unknown'}`
    grouped[key] = grouped[key] ? [...grouped[key], p] : [p]
  }

  const refresh = () => setPayments([...listPayments()])

  const handleVerify = (id: string) => {
    verifyPayment(id)
    refresh()
  }

  const handleReject = (id: string) => {
    rejectPayment(id)
    refresh()
  }

  const exportCsv = () => {
    const rows = listPayments().map(p => [p.orderId, p.date, p.method, p.amount, p.verified ? "verified" : p.rejected ? "rejected" : "pending"].join(','))
    const header = "orderId,date,method,amount,status"
    const blob = new Blob([header + "\n" + rows.join("\n")], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'reconciliation.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Payment Reconciliation</h1>
        <Button variant="outline" onClick={exportCsv}>Export CSV</Button>
      </div>
      {Object.entries(grouped).map(([key, items]) => {
        const [date, method] = key.split('_')
        return (
          <Card key={key}>
            <CardHeader>
              <CardTitle>{date} - {method}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Slip</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map(p => (
                    <TableRow key={p.orderId}>
                      <TableCell>{p.orderId}</TableCell>
                      <TableCell>฿{p.amount.toLocaleString()}</TableCell>
                      <TableCell>{p.slip || '-'}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" onClick={() => handleVerify(p.orderId)}>Mark as Verified</Button>
                        <Button size="sm" variant="outline" onClick={() => handleReject(p.orderId)}>Reject Slip</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )
      })}
      {pending.length === 0 && <p>No pending payments</p>}
    </div>
  )
}
