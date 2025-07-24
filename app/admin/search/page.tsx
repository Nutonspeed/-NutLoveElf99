"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/inputs/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/buttons/button"
import PageWrapper from "@/components/admin/PageWrapper"

interface Bill {
  id: string
  shortCode?: string
  customer: string
  paymentStatus?: string
  status?: string
  sharedAt?: string | null
}

interface Customer {
  id: string
  name: string
  totalSpent: number
  lastOrder: string
  tags?: string[]
}

interface PendingItem {
  billId: string
  billNo: string
  customer: string
  updatedAt: string
  status: string
  category: string
}

export default function AdminSearchPage() {
  const [query, setQuery] = useState("")
  const [bills, setBills] = useState<Bill[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [pending, setPending] = useState<PendingItem[]>([])

  useEffect(() => {
    async function load() {
      const [billRes, custRes, pendRes] = await Promise.all([
        fetch("/mock/store/bills.json").then(r => r.json()),
        fetch("/mock/store/customers.json").then(r => r.json()),
        fetch("/mock/store/pending-orders.json").then(r => r.json()),
      ])
      setBills(billRes)
      setCustomers(custRes)
      setPending(pendRes)
    }
    load()
  }, [])

  const billFiltered = bills.filter(b =>
    b.customer.toLowerCase().includes(query.toLowerCase()) ||
    b.id.toLowerCase().includes(query.toLowerCase()) ||
    (b.shortCode ?? "").toLowerCase().includes(query.toLowerCase())
  )

  const customerFiltered = customers
    .filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => b.totalSpent - a.totalSpent)

  const pendingFiltered = pending.filter(p =>
    p.billNo.toLowerCase().includes(query.toLowerCase()) ||
    p.customer.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <PageWrapper title="Global Search" breadcrumb={[{ title: "Search" }]}>
      <div className="mb-4 flex">
        <Input
          placeholder="Search..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="max-w-xs"
        />
      </div>
      <Tabs defaultValue="bills" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bills">Bills</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
        </TabsList>
        <TabsContent value="bills">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {billFiltered.map(b => (
                <TableRow key={b.id}>
                  <TableCell>{b.shortCode || b.id}</TableCell>
                  <TableCell>{b.customer}</TableCell>
                  <TableCell>
                    {b.paymentStatus === "paid" ? (
                      <Badge className="bg-green-500 text-white">paid</Badge>
                    ) : (
                      <Badge className="bg-red-500 text-white">unpaid</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/bill/view/${b.id}`}>
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {billFiltered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-sm">No results</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="customers">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerFiltered.map(c => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>฿{c.totalSpent.toLocaleString()}</TableCell>
                  <TableCell>{new Date(c.lastOrder).toLocaleDateString("th-TH")}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/customers/${c.id}`}>
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {customerFiltered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-sm">No results</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
        <TabsContent value="pending">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bill</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingFiltered.map(p => (
                <TableRow key={p.billId}>
                  <TableCell>{p.billNo}</TableCell>
                  <TableCell>{p.customer}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/bill/view/${p.billId}`}>
                      <Button size="sm" variant="outline">View</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {pendingFiltered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-sm">No results</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TabsContent>
      </Tabs>
    </PageWrapper>
  )
}

