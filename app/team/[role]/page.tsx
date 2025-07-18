"use client"

import { useEffect, useState } from "react"
import { getTasks, addTask } from "@/lib/mock-tasks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import type { Task } from "@/types/task"

export default function TeamRolePage({ params }: { params: { role: string } }) {
  const { role } = params
  const [tasks, setTasks] = useState<Task[]>([])
  const [title, setTitle] = useState("")
  const [dueDate, setDueDate] = useState("")

  useEffect(() => {
    setTasks(getTasks().filter((t) => t.role === role))
  }, [role])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    addTask({ role, title, dueDate })
    setTasks(getTasks().filter((t) => t.role === role))
    setTitle("")
    setDueDate("")
  }

  const now = new Date()
  const soon = new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000)
  const urgent = tasks.filter(
    (t) => t.dueDate && new Date(t.dueDate) <= soon && t.status !== "completed",
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">งานสำหรับทีม {role}</h1>
        <form onSubmit={handleAdd} className="flex space-x-2 mb-6">
          <Input
            placeholder="ชื่องาน"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <Button type="submit">เพิ่มงาน</Button>
        </form>
        {urgent.length > 0 && (
          <div className="mb-6">
            <h2 className="font-semibold mb-2">งานเร่งด่วน</h2>
            <ul className="list-disc pl-5 space-y-1">
              {urgent.map((t) => (
                <li key={t.id}>{t.title}</li>
              ))}
            </ul>
          </div>
        )}
        {tasks.length > 0 ? (
          <div className="grid gap-4">
            {tasks.map((task) => (
              <Card key={task.id}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    {task.title}
                    {task.status !== "completed" && (
                      <Badge variant="secondary" className="ml-2">
                        {task.status === "inProgress" ? "กำลังทำ" : "รอดำเนินการ"}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-gray-600 space-y-1">
                  {task.orderId && <p>ออเดอร์: {task.orderId}</p>}
                  {task.dueDate && (
                    <p>กำหนดเสร็จ: {new Date(task.dueDate).toLocaleDateString("th-TH")}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">ไม่มีงานสำหรับบทบาทนี้</p>
        )}
      </div>
    </div>
  )
}

