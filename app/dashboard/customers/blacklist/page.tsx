"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { mockCustomers, removeCustomer } from "@/lib/mock-customers"
import { loadBlacklist, listBlacklist, removeFromBlacklist } from "@/lib/mock-blacklist"

export default function BlacklistPage() {
  const [entries, setEntries] = useState(listBlacklist())

  useEffect(() => {
    loadBlacklist()
    setEntries(listBlacklist())
  }, [])

  const handleRestore = (id: string) => {
    removeFromBlacklist(id)
    setEntries(listBlacklist())
  }

  const handleDelete = (id: string) => {
    removeCustomer(id)
    removeFromBlacklist(id)
    setEntries(listBlacklist())
  }

  const customers = entries.map((e) => ({
    ...mockCustomers.find((c) => c.id === e.customerId)!,
    reason: e.reason,
  }))

  return (
    <div className="container mx-auto space-y-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">ลูกค้า Blacklist</h1>
        <Link href="/dashboard/customers">
          <Button variant="outline">กลับ</Button>
        </Link>
      </div>
      {customers.length > 0 ? (
        customers.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <CardTitle>{c.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
              <span>เหตุผล: {c.reason}</span>
              <div className="space-x-2">
                <Button onClick={() => handleRestore(c.id)}>คืนสิทธิ์</Button>
                <Button variant="destructive" onClick={() => handleDelete(c.id)}>
                  ลบถาวร
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <p className="text-muted-foreground">ไม่มีลูกค้าที่ถูกแบน</p>
      )}
    </div>
  )
}
