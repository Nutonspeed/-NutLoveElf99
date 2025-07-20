"use client"
import { useState } from "react"
import { getBills, type AdminBill } from "@/core/mock/store"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/inputs/input"
import EmptyState from "@/components/EmptyState"
import { downloadCSV } from "@/lib/mock-export"

export default function BillSummaryPage() {
  const [status, setStatus] = useState("all")
  const [sort, setSort] = useState("newest")

  const filtered = getBills().filter(b => status === "all" || b.status === status)

  const sorted = [...filtered].sort((a,b)=>{
    if (sort === "high") return getTotal(b) - getTotal(a)
    if (sort === "low") return getTotal(a) - getTotal(b)
    if (sort === "oldest") return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  const totalPaid = getBills().filter(b=>b.status === "paid").length
  const totalUnpaid = getBills().filter(b=>b.status !== "paid").length

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">สรุปบิล</h1>
      <div className="flex gap-2">
        <select value={status} onChange={e=>setStatus(e.target.value)} className="border rounded p-2">
          <option value="all">ทั้งหมด</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="pending">Pending</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select value={sort} onChange={e=>setSort(e.target.value)} className="border rounded p-2">
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="high">High Total</option>
          <option value="low">Low Total</option>
        </select>
        <Button onClick={()=>downloadCSV(getBills(), 'bills.csv')}>Export CSV</Button>
      </div>
      <div className="text-sm text-muted-foreground">ชำระแล้ว {totalPaid} | ค้าง {totalUnpaid}</div>
      {sorted.length > 0 ? (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">ID</th>
              <th className="text-left p-2">Status</th>
              <th className="text-right p-2">Total</th>
              <th className="text-right p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(b=> (
              <tr key={b.id} className="border-b hover:bg-muted/50">
                <td className="p-2">{b.id}</td>
                <td className="p-2 capitalize">{b.status}</td>
                <td className="p-2 text-right">฿{getTotal(b).toLocaleString()}</td>
                <td className="p-2 text-right">{new Date(b.createdAt).toLocaleDateString('th-TH')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyState title="ไม่มีข้อมูล" />
      )}
    </div>
  )
}

function getTotal(b: AdminBill) {
  return b.items.reduce((s,i)=>s+i.price*i.quantity,0)+b.shipping
}
