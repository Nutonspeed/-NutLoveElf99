"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent } from "@/components/ui/cards/card"
import { mockCustomers } from "@/lib/mock-customers"
import {
  segmentRules,
  loadSegmentRules,
  addSegmentRule,
  removeSegmentRule,
  runSegmentation,
} from "@/lib/mock-segments"

export default function SegmentRulesPage() {
  const [rules, setRules] = useState(segmentRules)
  const [threshold, setThreshold] = useState(5)
  const [tag, setTag] = useState("VIP")
  const [customers, setCustomers] = useState(mockCustomers)

  useEffect(() => {
    loadSegmentRules()
    setRules([...segmentRules])
    runSegmentation()
    setCustomers([...mockCustomers])
  }, [])

  const addRule = () => {
    addSegmentRule({ threshold: Number(threshold), tag })
    setRules([...segmentRules])
    runSegmentation()
    setCustomers([...mockCustomers])
  }

  const deleteRule = (id: string) => {
    removeSegmentRule(id)
    setRules([...segmentRules])
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">กฎกลุ่มลูกค้า</h1>
      {rules.map((r) => (
        <Card key={r.id}>
          <CardContent className="flex justify-between items-center">
            <span>
              ซื้อเกิน {r.threshold} ครั้ง → {r.tag}
            </span>
            <Button variant="destructive" onClick={() => deleteRule(r.id)}>
              ลบ
            </Button>
          </CardContent>
        </Card>
      ))}
      <div className="flex gap-2">
        <input
          type="number"
          className="border rounded p-2"
          value={threshold}
          onChange={(e) => setThreshold(parseInt(e.target.value))}
        />
        <input
          className="border rounded p-2"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        />
        <Button onClick={addRule}>เพิ่มกฎ</Button>
      </div>
      <div>
        <h2 className="font-semibold">กลุ่มลูกค้า</h2>
        <ul className="list-disc pl-5 space-y-1">
          {customers.map((c) => (
            <li key={c.id}>{c.name} - {c.tags?.join(", ")}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
