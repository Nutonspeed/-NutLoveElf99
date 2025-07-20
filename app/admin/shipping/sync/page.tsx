"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import ShippingStatusBadge from "@/components/ShippingStatusBadge"
import useShippingSync from "@/hooks/use-shipping-sync"
import { shippingSyncLogs, loadShippingSyncLogs, syncShippingStatus } from "@/lib/mock-shipping-sync"
import { mockOrders } from "@/lib/mock-orders"

export default function ShippingSyncPage() {
  const [logs, setLogs] = useState(shippingSyncLogs)
  const [processing, setProcessing] = useState(false)

  useShippingSync(30000)

  useEffect(() => {
    loadShippingSyncLogs()
    setLogs([...shippingSyncLogs])
  }, [])

  const handleSync = async () => {
    setProcessing(true)
    await syncShippingStatus()
    setLogs([...shippingSyncLogs])
    setProcessing(false)
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <h1 className="text-2xl font-bold">Shipping Auto Sync</h1>
      <Button onClick={handleSync} disabled={processing}>
        {processing ? "Syncing..." : "Sync Now"}
      </Button>
      <div className="space-y-4">
        <h2 className="font-semibold">Current Orders</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockOrders.map(o => (
              <TableRow key={o.id}>
                <TableCell>{o.id}</TableCell>
                <TableCell><ShippingStatusBadge status={o.shipping_status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="space-y-2">
        <h2 className="font-semibold">Sync Logs</h2>
        {logs.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map(l => (
                <TableRow key={l.id}>
                  <TableCell>{new Date(l.timestamp).toLocaleString()}</TableCell>
                  <TableCell>{l.result}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">No logs</p>
        )}
      </div>
    </div>
  )
}
