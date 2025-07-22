"use client"
import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

interface SecurityLog {
  id: string
  ip: string
  user: string
  action: 'login' | 'failed' | 'session'
  timestamp: string
}

export default function SecuritySettingsPage() {
  const [logs, setLogs] = useState<SecurityLog[]>([])

  useEffect(() => {
    fetch('/mock/store/security-log.json')
      .then(r => r.json())
      .then(setLogs)
      .catch(() => setLogs([]))
  }, [])

  const renderSection = (title: string, type: SecurityLog['action']) => {
    const items = logs.filter(l => l.action === type)
    return (
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>User</TableHead>
              <TableHead>IP</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map(it => (
              <TableRow key={it.id}>
                <TableCell>{new Date(it.timestamp).toLocaleString()}</TableCell>
                <TableCell>{it.user}</TableCell>
                <TableCell>{it.ip}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 space-y-6">
      <h1 className="text-2xl font-bold">Security Logs</h1>
      {renderSection('Login IPs', 'login')}
      {renderSection('Failed Attempts', 'failed')}
      {renderSection('Admin Sessions', 'session')}
    </div>
  )
}
