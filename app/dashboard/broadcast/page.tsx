"use client"
import { useState } from "react"
import { mockCustomers } from "@/lib/mock-customers"
import { Input } from "@/components/ui/inputs/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/buttons/button"
import { toast } from "sonner"

interface Schedule {
  id: string
  segment: string
  message: string
  time: string
}

export default function BroadcastSchedulerPage() {
  const [segment, setSegment] = useState("all")
  const [message, setMessage] = useState("")
  const [time, setTime] = useState("")
  const [list, setList] = useState<Schedule[]>([])

  const schedule = () => {
    const item = { id: Date.now().toString(), segment, message, time }
    setList([...list, item])
    setMessage("")
    setTime("")
    toast.success("ตั้งเวลาส่งข้อความแล้ว")
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">ตั้งเวลาข้อความ</h1>
      <div className="grid gap-2 max-w-xl">
        <select className="rounded border p-2" value={segment} onChange={e=>setSegment(e.target.value)}>
          <option value="all">ลูกค้าทั้งหมด ({mockCustomers.length})</option>
          <option value="VIP">เฉพาะ VIP</option>
          <option value="Gold">เฉพาะ Gold</option>
          <option value="Silver">เฉพาะ Silver</option>
        </select>
        <Textarea placeholder="ข้อความ" value={message} onChange={e=>setMessage(e.target.value)} />
        <Input type="datetime-local" value={time} onChange={e=>setTime(e.target.value)} />
        <Button onClick={schedule} disabled={!message || !time}>ตั้งเวลา</Button>
      </div>
      {list.length > 0 && (
        <div className="space-y-2">
          {list.map(item => (
            <div key={item.id} className="rounded border p-2 text-sm">
              <p>{item.message}</p>
              <p className="text-muted-foreground">{item.segment} - {new Date(item.time).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
