"use client"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { isDevMock } from "@/lib/mock-settings"
import { Button } from "@/components/ui/buttons/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import EmptyState from "@/components/EmptyState"
import { mockLogs, addDevLog } from "@/lib/mock-log"

export default function DevLogsPage() {
  const { user, isAuthenticated } = useAuth()
  const [entries, setEntries] = useState([...mockLogs])
  const [userFilter, setUserFilter] = useState("all")
  const [actionFilter, setActionFilter] = useState("all")

  if (!isDevMock) return <EmptyState title="ไม่อนุญาต" />
  if (!isAuthenticated || user?.role !== "admin") return <EmptyState title="ไม่มีสิทธิ์เข้าถึง" />

  const uniqueUsers = Array.from(new Set(mockLogs.map((l) => l.user)))
  const uniqueActions = Array.from(new Set(mockLogs.map((l) => l.action)))

  const filtered = entries.filter(
    (l) =>
      (userFilter === "all" || l.user === userFilter) &&
      (actionFilter === "all" || l.action === actionFilter),
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8 space-x-4">
          <Link href="/admin/dev-only/dev">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Dev Logs</h1>
          {process.env.NODE_ENV !== "production" && (
            <Button
              variant="outline"
              onClick={() => {
                addDevLog("mock", user?.email || "dev")
                setEntries([...mockLogs])
              }}
            >
              สร้าง log
            </Button>
          )}
          <select
            className="border rounded p-2 ml-auto"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
          >
            <option value="all">ผู้ใช้ทั้งหมด</option>
            {uniqueUsers.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
          <select
            className="border rounded p-2"
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
          >
            <option value="all">การกระทำทั้งหมด</option>
            {uniqueActions.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Logs ({filtered.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <EmptyState title="ไม่มี log ล่าสุด" />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>เวลา</TableHead>
                    <TableHead>การกระทำ</TableHead>
                    <TableHead>ผู้ใช้</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{log.user}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
