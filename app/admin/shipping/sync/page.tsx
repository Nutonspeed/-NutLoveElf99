"use client"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/buttons/button"
import { Badge } from "@/components/ui/badge"
import { shippingOrders } from "@/mock/shipping"
import ShippingStatusBadge from "@/components/shipping/ShippingStatusBadge"
import { loadShippingSyncLogs, runShippingSync, shippingSyncLogs, type ShippingSyncLog } from "@/lib/shipping-sync"
import { toast } from "sonner"

export default function ShippingSyncPage() {
  const [orders, setOrders] = useState(() => shippingOrders.map(o => ({ ...o })))
  const [logs, setLogs] = useState<ShippingSyncLog[]>([])

  useEffect(() => {
    loadShippingSyncLogs()
    setLogs([...shippingSyncLogs])
    const interval = setInterval(() => {
      const log = runShippingSync()
      setOrders(shippingOrders.map(o => ({ ...o })))
      setLogs([...shippingSyncLogs])
      if (log.result !== "Updated 0 orders") toast.success(log.result)
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const sync = () => {
    const log = runShippingSync()
    setOrders(shippingOrders.map(o => ({ ...o })))
    setLogs([...shippingSyncLogs])
    toast.success(log.result)
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Shipping Sync</h1>
        <Button onClick={sync}>Sync Now</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead>Tracking</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(o => (
            <TableRow key={o.id}>
              <TableCell>{o.id}</TableCell>
              <TableCell>
                <Badge variant={o.status === 'returned' ? 'destructive' : o.status === 'shipped' ? 'secondary' : 'outline'}>
                  {o.status}
                </Badge>
              </TableCell>
              <TableCell>
                {o.deliveryStatus === 'delivered' ? (
                  <ShippingStatusBadge status="delivered" />
                ) : (
                  <ShippingStatusBadge status="shipped" />
                )}
              </TableCell>
              <TableCell>{o.tracking || '-'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2 className="text-xl font-bold">Sync Logs</h2>
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
                <TableCell>{new Date(l.time).toLocaleString()}</TableCell>
                <TableCell>{l.result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-sm">no logs</p>
      )}
    </div>
  )
}
