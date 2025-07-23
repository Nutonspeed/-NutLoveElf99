"use client"
import { useState } from "react"
import Link from "next/link"
import { Star } from 'lucide-react'
import bills from '@/mock/bills.json'
import { downloadCSV } from '@/lib/mock-export'
import { Button } from '@/components/ui/buttons/button'
import { Badge } from '@/components/ui/badge'
import { autoTagCustomers, TaggedCustomer } from '@/lib/auto-tag-customers'

const billList: any[] = bills as any[]

const baseList: TaggedCustomer[] = autoTagCustomers()

function billCount(id: string) {
  return billList.filter(b => b.customerId === id).length
}

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("newest")
  const [tag, setTag] = useState("all")
  const [list, setList] = useState<TaggedCustomer[]>([...baseList])

  const toggleStar = (id: string) =>
    setList(prev => prev.map(c => (c.id === id ? { ...c, starred: !c.starred } : c)))

  const filtered = list
    .filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
    )
    .filter(c => tag === 'all' || c.autoTags.includes(tag) || c.tags?.includes(tag))
    .sort((a,b) => {
      if (sort === 'name') return a.name.localeCompare(b.name)
      const da = new Date(a.createdAt).getTime()
      const db = new Date(b.createdAt).getTime()
      return sort === 'oldest' ? da - db : db - da
    })

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-lg font-bold">ลูกค้า</h1>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => downloadCSV(list, 'customers.csv')}
          >
            ดาวน์โหลดรายชื่อ (.csv)
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              downloadCSV(
                list.filter(c => c.starred && c.followUpAt),
                'follow-up.csv'
              )
            }
          >
            ดาวน์โหลดรายชื่อลูกค้าที่น่าติดตาม (.csv)
          </Button>
          <Link href="/admin/customers/edit/new">
            <Button size="sm">เพิ่มลูกค้า</Button>
          </Link>
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          className="border px-2 py-1 text-sm flex-1"
          placeholder="ค้นหา"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="border px-2 py-1 text-sm"
          value={tag}
          onChange={e => setTag(e.target.value)}
        >
          <option value="all">ทุกแท็ก</option>
          <option value="ลูกค้าประจำ">ลูกค้าประจำ</option>
          <option value="VIP">VIP</option>
          <option value="ยังไม่เคยสั่ง">ยังไม่เคยสั่ง</option>
        </select>
        <select
          className="border px-2 py-1 text-sm"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="newest">ล่าสุด</option>
          <option value="oldest">เก่าสุด</option>
          <option value="name">ชื่อ</option>
        </select>
      </div>
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <th className="text-left font-medium p-2">ชื่อลูกค้า</th>
            <th className="text-left font-medium p-2">เบอร์</th>
            <th className="text-left font-medium p-2">แท็ก</th>
            <th className="text-left font-medium p-2">จำนวนบิล</th>
            <th className="text-left font-medium p-2">การจัดการ</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(c => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="p-2 flex items-center gap-1">
                <button type="button" onClick={() => toggleStar(c.id)}>
                  <Star
                    className={`h-4 w-4 ${c.starred ? 'fill-yellow-400 text-yellow-500' : 'text-gray-400'}`}
                  />
                </button>
                {c.name}
              </td>
              <td className="p-2">{c.phone}</td>
              <td className="p-2 space-x-1">
                {c.tags?.map(t => (
                  <Badge key={t} className="bg-blue-100 text-blue-600">{t}</Badge>
                ))}
                {c.autoTags.map(t => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="bg-gray-100 text-gray-600 border-gray-300"
                  >
                    {t}
                  </Badge>
                ))}
              </td>
              <td className="p-2">{billCount(c.id)}</td>
              <td className="p-2">
                <Link href={`/admin/customers/${c.id}`}> 
                  <Button variant="outline" size="sm">ดู</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => downloadCSV(filtered, 'group.csv')}
        >
          ส่งออกกลุ่มนี้
        </Button>
        {tag !== 'all' && (
          <Link href={`/admin/bill/create?bulk=${encodeURIComponent(tag)}`}>
            <Button size="sm">ยิงบิลหาลูกค้ากลุ่มนี้</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
