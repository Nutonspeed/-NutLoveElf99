"use client"
import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/cards/card"
import { Button } from "@/components/ui/buttons/button"
import {
  billingChecklist,
  loadBillingChecklist,
  setBillingChecklistItem,
  allBillingReady,
  getReadyTimestamp,
  setReadyTimestamp,
  generateMockBills,
} from "@/lib/mock-billing-checklist"

export default function BillingChecklistPage() {
  const [items, setItems] = useState(billingChecklist)
  const [readyAt, setReadyAt] = useState<string | null>(null)

  useEffect(() => {
    loadBillingChecklist()
    setItems([...billingChecklist])
    setReadyAt(getReadyTimestamp())
  }, [])

  const toggle = (id: string, val: boolean) => {
    setBillingChecklistItem(id, val)
    setItems([...billingChecklist])
    if (allBillingReady() && !readyAt) {
      setReadyTimestamp()
      setReadyAt(getReadyTimestamp())
    }
  }

  const handleGenerate = () => {
    generateMockBills(3)
    alert("Generated mock bills")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold">Billing Go-Live Checklist</h1>
        <Card>
          <CardHeader>
            <CardTitle>System Readiness</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {items.map((item) => (
              <label key={item.id} className="flex items-start gap-2">
                <Checkbox
                  checked={item.done}
                  onCheckedChange={(v) => toggle(item.id, v as boolean)}
                />
                <span>
                  {item.label}
                  <span className="block text-muted-foreground text-sm">
                    {item.description}
                  </span>
                </span>
              </label>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manual Test Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <ol className="list-decimal ml-4 space-y-1">
              <li>Create a test order</li>
              <li>Generate a bill and send notification</li>
              <li>Confirm payment and verify status</li>
            </ol>
            <Button variant="outline" onClick={handleGenerate}>
              Generate Mock Bills
            </Button>
          </CardContent>
        </Card>
        {readyAt && (
          <div className="p-4 border rounded bg-green-50">
            <p className="font-medium">Ready to Go Live</p>
            <p className="text-sm text-gray-500">
              Completed {new Date(readyAt).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
