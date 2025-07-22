"use client"
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/inputs/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface AuditLog {
  id: string
  user: string
  action: string
  timestamp: string
}

export default function AuditLogPage() {
  const [logs, setLogs] = useState<AuditLog[]>([])
  const [user, setUser] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    fetch('/mock/store/audit-log.json')
      .then(r => r.json())
      .then(setLogs)
      .catch(() => setLogs([]))
  }, [])

  const filtered = logs.filter(l =>
    (!user || l.user.includes(user)) &&
    (!date || l.timestamp.startsWith(date))
  )

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Audit Logs</h1>
      <div className="flex gap-2">
        <Input placeholder="user" value={user} onChange={e=>setUser(e.target.value)} />
        <Input type="date" value={date} onChange={e=>setDate(e.target.value)} />
      </div>
      {filtered.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(l => (
              <TableRow key={l.id}>
                <TableCell>{new Date(l.timestamp).toLocaleString()}</TableCell>
                <TableCell>{l.user}</TableCell>
                <TableCell>{l.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-sm">ไม่มีข้อมูล</p>
      )}
    </div>
  )
}
