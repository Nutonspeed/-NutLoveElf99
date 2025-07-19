"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { loadAdminLogs, mockAdminLogs, type AdminLog } from "@/lib/mock-admin-logs"
import { loadAdminUsers, adminUsers } from "@/lib/mock-admin-users"

export default function LogFilterPage() {
  const [logs, setLogs] = useState<AdminLog[]>([])
  const [user, setUser] = useState('')
  const [search, setSearch] = useState('')
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  useEffect(() => {
    loadAdminUsers()
    loadAdminLogs()
    setLogs([...mockAdminLogs])
  }, [])

  const filtered = logs.filter(l => {
    if (user && l.admin !== user) return false
    if (search && !l.action.includes(search)) return false
    if (start && new Date(l.timestamp) < new Date(start)) return false
    if (end && new Date(l.timestamp) > new Date(end)) return false
    return true
  })

  const sorted = [...filtered].sort((a,b)=>new Date(b.timestamp).getTime()-new Date(a.timestamp).getTime())

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">ค้นหา Log</h1>
      <div className="flex flex-wrap gap-2">
        <select value={user} onChange={e=>setUser(e.target.value)} className="border rounded p-2">
          <option value="">ทุกคน</option>
          {adminUsers.map(u=> <option key={u.id} value={u.email}>{u.email}</option>)}
        </select>
        <Input placeholder="ค้นหา..." value={search} onChange={e=>setSearch(e.target.value)} className="max-w-xs" />
        <input type="date" value={start} onChange={e=>setStart(e.target.value)} className="border rounded p-2" />
        <input type="date" value={end} onChange={e=>setEnd(e.target.value)} className="border rounded p-2" />
      </div>
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
