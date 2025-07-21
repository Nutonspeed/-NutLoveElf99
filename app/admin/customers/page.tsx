"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import CustomerPopup from "@/core/ui/CustomerPopup"
import { useCustomerGroups, CustomerGroup } from "@/hooks/useCustomerGroups"
import CustomerListEmptyState from "@/components/admin/customers/CustomerListEmptyState"

export default function AdminCustomersPage() {
  const { groups, topTags } = useCustomerGroups()
  const [filter, setFilter] = useState("")

  const filtered = groups.filter(g =>
    !filter || g.tags.some(t => t.tag === filter)
  )

  if (groups.length === 0) {
    return <CustomerListEmptyState />
  }

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold mb-4">กลุ่มลูกค้าตามแท็ก</h1>
      <div className="mb-4">
        <select
          className="border rounded px-2 py-1 text-sm"
          value={filter}
          onChange={e => setFilter(e.target.value)}
        >
          <option value="">ทั้งหมด</option>
          {topTags.map(tag => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="text-left font-medium p-2">ชื่อลูกค้า</th>
            <th className="text-left font-medium p-2">แท็กยอดนิยม</th>
            <th className="text-left font-medium p-2">จำนวนบิล</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(group => (
            <CustomerRow key={group.customer.id} group={group} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CustomerRow({ group }: { group: CustomerGroup }) {
  const [open, setOpen] = useState(false)
  return (
    <tr className="hover:bg-gray-50">
      <td className="p-2">
        <button className="font-medium" onClick={() => setOpen(true)}>
          {group.customer.name}
        </button>
        <CustomerPopup
          customerId={group.customer.id}
          open={open}
          onClose={() => setOpen(false)}
        />
      </td>
      <td className="p-2">
        {group.tags.slice(0, 3).map(t => (
          <Badge key={t.tag} className="mr-1 badge">
            {t.tag}
          </Badge>
        ))}
      </td>
      <td className="p-2">{group.totalBills}</td>
    </tr>
  )
}
