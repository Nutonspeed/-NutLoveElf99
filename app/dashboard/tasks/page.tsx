"use client"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import {
  loadTasks,
  listTasks,
  addTask,
  updateTaskStatus,
} from "@/lib/mock-tasks"
import { adminUsers, loadAdminUsers } from "@/lib/mock-admin-users"

export default function TasksPage() {
  const [tasks, setTasks] = useState(listTasks())
  const [title, setTitle] = useState("")
  const [assignee, setAssignee] = useState(adminUsers[0]?.id || "")
  const [orderId, setOrderId] = useState("")

  useEffect(() => {
    loadTasks()
    loadAdminUsers()
    setTasks([...listTasks()])
    setAssignee(adminUsers[0]?.id || "")
  }, [])

  const create = () => {
    if (!title.trim()) return
    addTask({ title, role: assignee, orderId, status: "pending" })
    setTitle("")
    setOrderId("")
    setTasks([...listTasks()])
  }

  const toggle = (id: string) => {
    const t = tasks.find((tk) => tk.id === id)
    if (!t) return
    const next = t.status === "pending" ? "inProgress" : t.status === "inProgress" ? "completed" : "pending"
    updateTaskStatus(id, next)
    setTasks([...listTasks()])
  }

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Tasks</h1>
      <div className="flex flex-col gap-2 max-w-md">
        <Input placeholder="Task title" value={title} onChange={(e)=>setTitle(e.target.value)} />
        <Input placeholder="Order ID" value={orderId} onChange={(e)=>setOrderId(e.target.value)} />
        <select className="border rounded p-2" value={assignee} onChange={(e)=>setAssignee(e.target.value)}>
          {adminUsers.map(a=> (<option key={a.id} value={a.id}>{a.name}</option>))}
        </select>
        <Button onClick={create}>Add Task</Button>
      </div>
      <div className="space-y-2">
        {tasks.map(t=> (
          <div key={t.id} className="flex items-center justify-between border p-2 rounded">
            <div>
              <p className="font-medium">{t.title}</p>
              <p className="text-sm text-muted-foreground">{t.orderId || "-"} – {adminUsers.find(a=>a.id===t.role)?.name || t.role}</p>
            </div>
            <Button size="sm" variant="outline" onClick={()=>toggle(t.id)}>{t.status}</Button>
          </div>
        ))}
        {tasks.length===0 && <p className="text-sm text-gray-500">No tasks</p>}
      </div>
    </div>
  )
}
