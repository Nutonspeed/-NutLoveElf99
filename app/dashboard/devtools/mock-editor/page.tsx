"use client"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/buttons/button"
import { fabrics } from "@/mock/fabrics"
import { orders } from "@/mock/orders"
import { mockBills } from "@/mock/bills"
import { mockCustomers } from "@/lib/mock-customers"

const defaults = {
  fabrics,
  orders,
  bills: mockBills,
  customers: mockCustomers,
} as const

export default function MockEditorPage() {
  const [data, setData] = useState(() => {
    const obj: Record<string, string> = {}
    for (const key in defaults) obj[key] = JSON.stringify((defaults as any)[key], null, 2)
    return obj
  })
  const [tab, setTab] = useState<keyof typeof defaults>('customers')
  const [error, setError] = useState('')

  const handleSave = () => {
    try {
      const parsed = JSON.parse(data[tab])
      ;(defaults as any)[tab].length = 0
      ;(defaults as any)[tab].push(...parsed)
      setError('')
      alert('saved')
    } catch (e) {
      setError('Invalid JSON')
    }
  }

  const handleReset = () => {
    setData(() => {
      const obj: Record<string, string> = {}
      for (const key in defaults) obj[key] = JSON.stringify((defaults as any)[key], null, 2)
      return obj
    })
    setError('')
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Mock Editor</h1>
      <Tabs value={tab} onValueChange={(v)=>setTab(v as any)}>
        <TabsList className="mb-2">
          {Object.keys(defaults).map(k=> (
            <TabsTrigger key={k} value={k}>{k}</TabsTrigger>
          ))}
        </TabsList>
        {Object.keys(defaults).map(k=> (
          <TabsContent key={k} value={k}>
            <Textarea className="w-full h-80 font-mono" value={data[k]} onChange={e=>setData({...data,[k]:e.target.value})} />
          </TabsContent>
        ))}
      </Tabs>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex gap-2">
        <Button onClick={handleSave}>Save</Button>
        <Button variant="outline" onClick={handleReset}>Reset</Button>
      </div>
    </div>
  )
}
