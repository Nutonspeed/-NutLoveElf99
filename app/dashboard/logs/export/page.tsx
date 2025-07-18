"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/buttons/button"
import { loadAdminLogs, mockAdminLogs, type AdminLog } from "@/lib/mock-admin-logs"
import { exportLogsCsv } from "@/lib/logs"

export default function LogExportPage() {
  const [logs, setLogs] = useState<AdminLog[]>([])
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

  useEffect(() => {
    loadAdminLogs()
    setLogs([...mockAdminLogs])
  }, [])

  const filtered = logs.filter(l => {
    if (start && new Date(l.timestamp) < new Date(start)) return false
    if (end && new Date(l.timestamp) > new Date(end)) return false
    return true
  })

  const handleExport = () => {
    exportLogsCsv(filtered, 'logs.csv')
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Export Logs</h1>
      <div className="flex flex-wrap gap-2">
        <input type="date" value={start} onChange={e=>setStart(e.target.value)} className="border rounded p-2" />
        <input type="date" value={end} onChange={e=>setEnd(e.target.value)} className="border rounded p-2" />
        <Button onClick={handleExport}>ดาวน์โหลด CSV</Button>
      </div>
    </div>
  )
}
