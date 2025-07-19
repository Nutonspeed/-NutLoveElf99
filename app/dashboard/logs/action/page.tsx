"use client"
import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/inputs/input"
import { mockAdminLogs, loadAdminLogs } from "@/lib/mock-admin-logs"

export default function ActionLogPage() {
  const [logs, setLogs] = useState(mockAdminLogs)
  const [action, setAction] = useState("")
  const [user, setUser] = useState("")
  const [date, setDate] = useState("")

  useEffect(() => {
    loadAdminLogs()
    setLogs([...mockAdminLogs])
  }, [])

  const filtered = logs.filter(l =>
    (!action || l.action.includes(action)) &&
    (!user || l.admin.includes(user)) &&
    (!date || l.timestamp.startsWith(date))
  )

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Action Logs</h1>
      <div className="flex gap-2">
        <Input placeholder="action" value={action} onChange={e=>setAction(e.target.value)} />
        <Input placeholder="user" value={user} onChange={e=>setUser(e.target.value)} />
        <Input type="date" value={date} onChange={e=>setDate(e.target.value)} />
      </div>
      {filtered.length ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>เวลา</TableHead>
              <TableHead>ผู้ใช้</TableHead>
              <TableHead>การกระทำ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(l => (
              <TableRow key={l.id}>
                <TableCell>{new Date(l.timestamp).toLocaleString()}</TableCell>
                <TableCell>{l.admin}</TableCell>
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
