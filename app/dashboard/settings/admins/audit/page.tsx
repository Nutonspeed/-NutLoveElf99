"use client"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { loadAdminUsers, adminUsers } from "@/lib/mock-admin-users"
import { loadAdminLogs, mockAdminLogs, type AdminLog } from "@/lib/mock-admin-logs"

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<AdminLog[]>([])
  const [admin, setAdmin] = useState('')

  useEffect(() => {
    loadAdminUsers()
    loadAdminLogs()
    setLogs([...mockAdminLogs])
  }, [])

  const filtered = logs.filter(l => (admin ? l.admin === admin : true))
  const sorted = [...filtered].sort((a,b)=>new Date(b.timestamp).getTime()-new Date(a.timestamp).getTime())

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Admin Audit</h1>
      <select value={admin} onChange={e=>setAdmin(e.target.value)} className="border rounded p-2">
        <option value="">เลือกแอดมิน</option>
        {adminUsers.map(a=> <option key={a.id} value={a.email}>{a.email}</option>)}
      </select>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>เวลา</TableHead>
            <TableHead>การกระทำ</TableHead>
            <TableHead>แอดมิน</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map(log => (
            <TableRow key={log.id}>
              <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
              <TableCell>{log.action}</TableCell>
              <TableCell>{log.admin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
