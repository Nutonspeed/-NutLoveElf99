'use client'
import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/buttons/button'
import ShippingLabel from '@/components/ShippingLabel'
import { useBillStore } from '@/core/store'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Input } from '@/components/ui/inputs/input'

export default function BatchShippingLabelPage() {
  const store = useBillStore()
  const search = useSearchParams()
  const [loaded, setLoaded] = useState(20)
  const [statusFilter, setStatusFilter] = useState<'all' | 'paid' | 'shipped'>('all')
  const [providerFilter, setProviderFilter] = useState('all')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  const ids = search.get('ids')?.split(',') ?? []
  const bills = store.bills.filter(b => ids.includes(b.id))
  const filtered = useMemo(() => {
    return bills.filter(b => {
      if (statusFilter !== 'all' && b.status !== statusFilter) return false
      if (providerFilter !== 'all' && !b.tags.includes(providerFilter)) return false
      if (start && new Date(b.createdAt) < new Date(start)) return false
      if (end && new Date(b.createdAt) > new Date(end)) return false
      return true
    })
  }, [bills, statusFilter, providerFilter, start, end])

  const toShow = filtered.slice(0, loaded)

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">พิมพ์ใบปะหน้าหลายบิล</h1>
      <div className="flex flex-wrap gap-2 items-end">
        <Select value={statusFilter} onValueChange={v => setStatusFilter(v as any)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="สถานะ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทั้งหมด</SelectItem>
            <SelectItem value="paid">ชำระแล้ว</SelectItem>
            <SelectItem value="shipped">จัดส่งแล้ว</SelectItem>
          </SelectContent>
        </Select>
        <Select value={providerFilter} onValueChange={setProviderFilter}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="ขนส่ง" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทั้งหมด</SelectItem>
            <SelectItem value="Kerry">Kerry</SelectItem>
            <SelectItem value="Flash">Flash</SelectItem>
            <SelectItem value="ปณ.">ปณ.</SelectItem>
          </SelectContent>
        </Select>
        <Input type="date" value={start} onChange={e => setStart(e.target.value)} />
        <Input type="date" value={end} onChange={e => setEnd(e.target.value)} />
        <Button onClick={() => window.print()}>พิมพ์ทั้งหมด</Button>
      </div>

      <div className="space-y-4 print:block">
        {toShow.map(b => (
          <ShippingLabel key={b.id} bill={b} />
        ))}
      </div>
      {filtered.length > loaded && (
        <Button variant="outline" onClick={() => setLoaded(l => l + 20)}>โหลดเพิ่มเติม</Button>
      )}
    </div>
  )
}
