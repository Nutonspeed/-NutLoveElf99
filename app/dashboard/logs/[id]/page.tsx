"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { loadAdminLogs, mockAdminLogs, type AdminLog } from "@/lib/mock-admin-logs"

export default function LogDetailPage() {
  const params = useParams<{ id: string }>()
  const [log, setLog] = useState<AdminLog | null>(null)

  useEffect(() => {
    loadAdminLogs()
    const entry = mockAdminLogs.find(l => l.id === params.id)
    if (entry) setLog({ ...entry })
  }, [params.id])

  if (!log) return <div className="p-8">ไม่พบข้อมูล</div>

  return (
    <div className="container mx-auto space-y-2 py-8">
      <h1 className="text-2xl font-bold">รายละเอียด Log</h1>
      <p>เวลา: {new Date(log.timestamp).toLocaleString()}</p>
      <p>การกระทำ: {log.action}</p>
      <p>แอดมิน: {log.admin}</p>
    </div>
  )
}
