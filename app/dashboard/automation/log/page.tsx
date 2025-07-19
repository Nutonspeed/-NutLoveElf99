"use client"
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { loadAutomation, logs } from '@/lib/automation'
import type { AutomationLog } from '@/types/automation'

export default function AutomationLogPage() {
  const [list, setList] = useState<AutomationLog[]>([])
  useEffect(() => {
    loadAutomation()
    setList([...logs])
  }, [])

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Workflow Logs (mock)</h1>
      {list.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Rule</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Result</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list.map(l => (
              <TableRow key={l.id}>
                <TableCell>{new Date(l.time).toLocaleString()}</TableCell>
                <TableCell>{l.ruleId}</TableCell>
                <TableCell>{l.event}</TableCell>
                <TableCell>{l.action}</TableCell>
                <TableCell>{l.result}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-sm">no logs</p>
      )}
    </div>
  )
}
