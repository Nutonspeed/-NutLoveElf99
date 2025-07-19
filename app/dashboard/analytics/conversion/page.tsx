"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/buttons/button"
import { Input } from "@/components/ui/inputs/input"
import { toast } from "sonner"

interface Log {
  id: string
  point: string
  time: string
}

export default function ConversionSetupPage() {
  const [point, setPoint] = useState("")
  const [logs, setLogs] = useState<Log[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("conversionLogs")
    if (stored) setLogs(JSON.parse(stored))
  }, [])

  const add = () => {
    const entry = { id: Date.now().toString(), point, time: new Date().toISOString() }
    const next = [...logs, entry]
    setLogs(next)
    localStorage.setItem("conversionLogs", JSON.stringify(next))
    setPoint("")
  }

  const exportCsv = () => {
    toast("ดาวน์โหลด CSV (mock)")
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">ตั้งค่า Conversion</h1>
      <div className="flex gap-2 max-w-xl">
        <Input placeholder="conversion point" value={point} onChange={e=>setPoint(e.target.value)} />
        <Button onClick={add} disabled={!point}>บันทึก</Button>
      </div>
      {logs.length > 0 && (
        <div className="space-y-2">
          <Button size="sm" onClick={exportCsv}>Export CSV</Button>
          <ul className="space-y-1 text-sm">
            {logs.map(l => (
              <li key={l.id} className="rounded border p-2">
                {l.point} - {new Date(l.time).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
