"use client"
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/cards/card'
import { getBillConfig, setBillConfig } from '@/core/mock/store'

export default function BillingSettingsPage() {
  const [autoBill, setAutoBill] = useState(false)
  const [autoShip, setAutoShip] = useState(false)

  useEffect(() => {
    const cfg = getBillConfig()
    setAutoBill(cfg.autoBillOnPayment)
    setAutoShip(cfg.autoMarkShipped)
  }, [])

  const save = () => {
    setBillConfig({ autoBillOnPayment: autoBill, autoMarkShipped: autoShip })
    alert('saved')
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Billing Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Automation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <label className="flex items-center space-x-2">
            <Checkbox checked={autoBill} onCheckedChange={() => setAutoBill(!autoBill)} />
            <span>auto bill when payment confirmed</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox checked={autoShip} onCheckedChange={() => setAutoShip(!autoShip)} />
            <span>auto mark shipped</span>
          </label>
          <Button onClick={save}>Save</Button>
        </CardContent>
      </Card>
    </div>
  )
}
