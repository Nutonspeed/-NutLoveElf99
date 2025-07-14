"use client"
import { useState } from "react"
import { isDevMock } from "@/lib/mock-settings"
import { mockBills, confirmBill } from "@/lib/mock-bills"
import { Button } from "@/components/ui/buttons/button"
import EmptyState from "@/components/EmptyState"
import { cancelBill } from "@/lib/mock-bills"

export default function DevBillHistory() {
  const [bills, setBills] = useState([...mockBills])

  if (!isDevMock) return <EmptyState title="ไม่อนุญาต" />

  const handleConfirm = (id: string) => {
    confirmBill(id)
    setBills([...mockBills])
  }
  const handleCancel = (id: string) => {
    cancelBill(id)
    setBills([...mockBills])
  }

  return (
    <div className="space-y-4">
      {bills.map((b) => (
        <div key={b.id} className="flex items-center justify-between border p-2 rounded">
          <span>{b.id}</span>
          <span>{b.status}</span>
          <div className="space-x-2">
            <Button size="sm" onClick={() => handleConfirm(b.id)}>ชำระ</Button>
            <Button variant="outline" size="sm" onClick={() => handleCancel(b.id)}>
              ยกเลิก
            </Button>
          </div>
        </div>
      ))}
      {bills.length === 0 && <EmptyState />}
    </div>
  )
}
