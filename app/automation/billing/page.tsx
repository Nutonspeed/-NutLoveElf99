"use client"
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { addBillingRule, billingLogs, billingRules, loadBillingAutomation, BillingRule, BillingLog, runBillingAutomation } from '@/lib/billing-automation'

export default function BillingAutomationPage() {
  const [rules, setRules] = useState<BillingRule[]>([])
  const [logs, setLogs] = useState<BillingLog[]>([])
  const [name, setName] = useState('')
  const [total, setTotal] = useState('')
  const [time, setTime] = useState('09:00')

  useEffect(() => {
    loadBillingAutomation()
    setRules([...billingRules])
    setLogs([...billingLogs])
    const interval = setInterval(() => {
      const now = new Date()
      const cur = now.toTimeString().slice(0,5)
      billingRules.forEach(r => {
        if (r.active && r.time === cur) {
          runBillingAutomation()
          setLogs([...billingLogs])
        }
      })
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const add = () => {
    const rule: BillingRule = {
      id: Date.now().toString(),
      name: name || 'rule'+Date.now(),
      totalOver: total ? parseFloat(total) : undefined,
      time,
      active: true,
    }
    addBillingRule(rule)
    setRules([...billingRules])
    setName('')
    setTotal('')
  }

  const run = () => {
    runBillingAutomation()
    setLogs([...billingLogs])
  }

  return (
    <div className="container mx-auto space-y-6 py-8">
      <h1 className="text-2xl font-bold">Billing Automation (mock)</h1>
      <div className="flex gap-2 items-end">
        <Input placeholder="Rule name" value={name} onChange={e=>setName(e.target.value)} />
        <Input placeholder="Total over" className="w-32" value={total} onChange={e=>setTotal(e.target.value)} />
        <Input type="time" className="w-28" value={time} onChange={e=>setTime(e.target.value)} />
        <Button onClick={add}>Add Rule</Button>
        <Button variant="outline" onClick={run}>Run Now</Button>
      </div>
      {rules.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Total &gt;</TableHead>
              <TableHead>Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rules.map(r => (
              <TableRow key={r.id}>
                <TableCell>{r.name}</TableCell>
                <TableCell>{r.totalOver}</TableCell>
                <TableCell>{r.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : <p className="text-sm">no rules</p>}
      <h2 className="text-xl font-bold">Automation Logs</h2>
      {logs.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Rule</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map(l => (
              <TableRow key={l.id}>
                <TableCell>{new Date(l.time).toLocaleString()}</TableCell>
                <TableCell>{l.ruleId}</TableCell>
                <TableCell>{l.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : <p className="text-sm">no logs</p>}
    </div>
  )
}
