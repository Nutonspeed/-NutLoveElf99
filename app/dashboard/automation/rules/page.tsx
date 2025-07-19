"use client"
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { Input } from '@/components/ui/inputs/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { addRule, loadAutomation, rules } from '@/lib/automation'
import type { AutomationAction, AutomationTrigger, AutomationRule } from '@/types/automation'

export default function AutomationRulesPage() {
  const [list, setList] = useState<AutomationRule[]>([])
  const [trigger, setTrigger] = useState<AutomationTrigger>('order_created')
  const [action, setAction] = useState<AutomationAction>('send_broadcast')

  useEffect(() => {
    loadAutomation()
    setList([...rules])
  }, [])

  const add = () => {
    const rule: AutomationRule = {
      id: Date.now().toString(),
      trigger,
      action,
      active: true,
    }
    addRule(rule)
    setList([...rules])
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Workflow Rules (mock)</h1>
      <div className="flex gap-2">
        <Select value={trigger} onValueChange={v => setTrigger(v as AutomationTrigger)}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="order_created">order_created</SelectItem>
            <SelectItem value="refund_approved">refund_approved</SelectItem>
          </SelectContent>
        </Select>
        <Select value={action} onValueChange={v => setAction(v as AutomationAction)}>
          <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="send_broadcast">send_broadcast</SelectItem>
            <SelectItem value="create_support_ticket">create_support_ticket</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={add}>Add</Button>
      </div>
      {list.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Trigger</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map(r => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.trigger}</TableCell>
                <TableCell>{r.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-sm">no rules</p>
      )}
    </div>
  )
}
