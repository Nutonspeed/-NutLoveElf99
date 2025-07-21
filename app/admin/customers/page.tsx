"use client"

import { useState } from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/buttons/button"
import { Edit, Plus } from "lucide-react"
import CustomerPopup from "@/core/ui/CustomerPopup"
import { useCustomerGroups, CustomerGroup } from "@/hooks/useCustomerGroups"

export default function AdminCustomersPage() {
  const { groups, topTags } = useCustomerGroups()
  const [filter, setFilter] = useState("")

  const filtered = groups.filter(g =>
    !filter || g.tags.some(t => t.tag === filter)
  )

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold">กลุ่มลูกค้าตามแท็ก</h1>
        <Link href="/admin/customers/edit/new">
          <Button size="sm">
            <Plus className="w-4 h-4 mr-1" /> สร้างลูกค้าใหม่
          </Button>
        </Link>
      </div>
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
            <th className="text-left font-medium p-2">การจัดการ</th>
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
      <td className="p-2">
        <Link href={`/admin/customers/edit/${group.customer.id}`}>
          <Button variant="outline" size="icon">
            <Edit className="w-4 h-4" />
          </Button>
        </Link>
      </td>
    </tr>
  )
}
