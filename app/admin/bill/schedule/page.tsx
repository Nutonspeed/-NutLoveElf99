"use client"
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { getSchedule, addSchedule, runBillSchedule } from '@/core/mock/store'
import type { BillItem } from '@/mock/bills'

export default function BillSchedulePage() {
  const [list, setList] = useState(getSchedule())
  const [customer, setCustomer] = useState('')
  const [time, setTime] = useState('')
  const [items, setItems] = useState<BillItem[]>([])

  useEffect(() => {
    runBillSchedule()
    setList([...getSchedule()])
  }, [])

  const add = () => {
    addSchedule({ bill: { customer, items, shipping: 0, note: '', tags: [] }, time })
    setList([...getSchedule()])
    setCustomer('')
    setItems([])
    setTime('')
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Bill Schedule</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Input placeholder="customer" value={customer} onChange={e=>setCustomer(e.target.value)} />
          <Input type="datetime-local" value={time} onChange={e=>setTime(e.target.value)} />
          {items.map((it,idx)=>(
            <div key={idx} className="flex space-x-2 items-end">
              <Input value={it.name} onChange={e=>setItems(items.map((o,i)=>i===idx?{...o,name:e.target.value}:o))} />
              <Input type="number" className="w-20" value={it.quantity} onChange={e=>setItems(items.map((o,i)=>i===idx?{...o,quantity:parseInt(e.target.value)||1}:o))} />
              <Input type="number" className="w-24" value={it.price} onChange={e=>setItems(items.map((o,i)=>i===idx?{...o,price:parseFloat(e.target.value)||0}:o))} />
              <Button variant="outline" size="icon" onClick={()=>setItems(items.filter((_,i)=>i!==idx))}>×</Button>
            </div>
          ))}
          <Button variant="outline" onClick={()=>setItems([...items,{name:'',quantity:1,price:0}])}>เพิ่มสินค้า</Button>
          <Button onClick={add}>Save</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Schedule List</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm">
            {list.map(s=> (
              <li key={s.id} className="flex justify-between">
                <span>{s.time}</span>
                <span>{s.bill.customer}</span>
                <span>{s.created ? s.billId : 'pending'}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
