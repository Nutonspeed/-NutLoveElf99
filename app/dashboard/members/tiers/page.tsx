"use client"
import { useState } from 'react'
import { getTiers, setTiers, addTier } from '@/core/mock/store'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'

export default function TierSetupPage() {
  const [tiers, setLocal] = useState(getTiers())
  const [name, setName] = useState('')
  const [spent, setSpent] = useState(0)
  const [orders, setOrders] = useState(0)

  const handleAdd = () => {
    if (!name) return
    const tier = { name, minSpent: spent, minOrders: orders }
    addTier(tier)
    setLocal(getTiers())
    setName('')
    setSpent(0)
    setOrders(0)
  }

  const handleSave = () => {
    setTiers(tiers)
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Member Tiers</h1>
      <div className="space-y-2">
        {tiers.map((t, i) => (
          <div key={i} className="flex space-x-2">
            <Input value={t.name} onChange={e => {
              const n = [...tiers]
              n[i] = { ...n[i], name: e.target.value }
              setLocal(n)
            }} className="w-32" />
            <Input type="number" value={t.minSpent || 0} onChange={e => {
              const n = [...tiers]
              n[i] = { ...n[i], minSpent: Number(e.target.value) }
              setLocal(n)
            }} className="w-24" />
            <Input type="number" value={t.minOrders || 0} onChange={e => {
              const n = [...tiers]
              n[i] = { ...n[i], minOrders: Number(e.target.value) }
              setLocal(n)
            }} className="w-24" />
          </div>
        ))}
      </div>
      <div className="space-x-2">
        <Input placeholder="ชื่อ" value={name} onChange={e=>setName(e.target.value)} className="w-32" />
        <Input type="number" placeholder="ยอดซื้อ" value={spent} onChange={e=>setSpent(Number(e.target.value))} className="w-24" />
        <Input type="number" placeholder="ออเดอร์" value={orders} onChange={e=>setOrders(Number(e.target.value))} className="w-24" />
        <Button onClick={handleAdd} type="button">เพิ่ม</Button>
      </div>
      <Button onClick={handleSave}>บันทึก</Button>
    </div>
  )
}
