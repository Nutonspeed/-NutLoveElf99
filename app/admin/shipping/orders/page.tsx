"use client"
import { useState } from "react"
import {
  shippingOrders,
  setShippingInfo,
  updateShippingOrderStatus,
  updateDeliveryStatus,
} from "@/mock/shipping"
import type {
  ShippingOrderStatus,
  DeliveryStatus,
  ShippingProvider,
  shippingOrderStatusLabel,
  deliveryStatusLabel,
} from "@/types/shipping"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AdminShippingOrdersPage() {
  const [orders, setOrders] = useState(() => shippingOrders.map(o => ({ ...o })))

  const handleSave = (id: string, tracking: string, provider: ShippingProvider) => {
    setShippingInfo(id, tracking, provider)
    setOrders(shippingOrders.map(o => ({ ...o })))
  }

  const handleStatus = (id: string, status: ShippingOrderStatus) => {
    updateShippingOrderStatus(id, status)
    setOrders(shippingOrders.map(o => ({ ...o })))
  }

  const handleDelivery = (id: string, status: DeliveryStatus) => {
    updateDeliveryStatus(id, status)
    setOrders(shippingOrders.map(o => ({ ...o })))
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Fulfilled Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead>Tracking</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map(o => (
            <TableRow key={o.id}>
              <TableCell>{o.id}</TableCell>
              <TableCell>{o.name}</TableCell>
              <TableCell>
                <Select value={o.status} onValueChange={(v) => handleStatus(o.id, v as ShippingOrderStatus)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(shippingOrderStatusLabel).map(([val, label]) => (
                      <SelectItem key={val} value={val}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select value={o.deliveryStatus} onValueChange={(v) => handleDelivery(o.id, v as DeliveryStatus)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(deliveryStatusLabel).map(([val, label]) => (
                      <SelectItem key={val} value={val}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Input
                  value={o.tracking}
                  onChange={e => {
                    const val = e.target.value
                    setOrders(prev => prev.map(p => p.id === o.id ? { ...p, tracking: val } : p))
                  }}
                  className="w-36"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={o.provider || ""}
                  onChange={e => {
                    const val = e.target.value as ShippingProvider
                    setOrders(prev => prev.map(p => p.id === o.id ? { ...p, provider: val } : p))
                  }}
                  placeholder="Provider"
                  className="w-24"
                />
              </TableCell>
              <TableCell>
                <Button size="sm" onClick={() => handleSave(o.id, o.tracking, o.provider as ShippingProvider)}>Save</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
