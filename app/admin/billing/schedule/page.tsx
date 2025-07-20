"use client"
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  billingSchedules,
  loadBillingSchedules,
  addBillingSchedule,
  runBillingSchedules,
  BillingSchedule,
} from '@/lib/mock-billing-schedule'

export default function BillingSchedulePage() {
  const [list, setList] = useState<BillingSchedule[]>([])
  const [name, setName] = useState('')
  const [rule, setRule] = useState<'daily'|'weekly'|'monthly'>('daily')
  const [items, setItems] = useState('')
  const [start, setStart] = useState('')

  useEffect(() => {
    loadBillingSchedules()
    setList([...billingSchedules])
    const id = setInterval(() => {
      runBillingSchedules()
      setList([...billingSchedules])
    }, 60000)
    return () => clearInterval(id)
  }, [])

  const add = () => {
    if (!start) return
    addBillingSchedule({ name: name || 'schedule', rule, items, start })
    setList([...billingSchedules])
    setName('')
    setItems('')
    setStart('')
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">Recurring Bills</h1>
      <div className="flex flex-col sm:flex-row items-end gap-2">
        <Input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <Select value={rule} onValueChange={v=>setRule(v as any)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
        <Input placeholder="Products/Templates" value={items} onChange={e=>setItems(e.target.value)} />
        <Input type="datetime-local" value={start} onChange={e=>setStart(e.target.value)} />
        <Button onClick={add}>Add</Button>
      </div>
      {list.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Rule</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Next Run</TableHead>
              <TableHead>Last Run</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map(s => (
              <TableRow key={s.id}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.rule}</TableCell>
                <TableCell>{s.items}</TableCell>
                <TableCell>{new Date(s.nextRun).toLocaleString()}</TableCell>
                <TableCell>{s.lastRun ? new Date(s.lastRun).toLocaleString() : '-'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
