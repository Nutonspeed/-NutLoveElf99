"use client"
import { useEffect, useState } from "react"
import {
  loadTasks,
  listTasks,
  assignTask,
} from "@/lib/mock-tasks"
import { adminUsers, loadAdminUsers } from "@/lib/mock-admin-users"

export default function TaskBoardPage() {
  const [tasks, setTasks] = useState(listTasks())
  const [error, setError] = useState(false)

  useEffect(() => {
    try {
      loadTasks()
      loadAdminUsers()
      setTasks([...listTasks()])
    } catch (e) {
      setError(true)
    }
  }, [])

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, role: string) => {
    const id = e.dataTransfer.getData("text")
    assignTask(id, role)
    setTasks([...listTasks()])
  }

  if (error) {
    return <p className="p-8 text-center">Failed to load board</p>
  }

  if (!tasks) {
    return <p className="p-8 text-center">Loading...</p>
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">Workboard</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {adminUsers.map((a) => (
          <div
            key={a.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, a.id)}
            className="min-h-40 rounded border p-2"
          >
            <p className="font-medium mb-2">{a.name}</p>
            {tasks.filter((t) => t.role === a.id).map((t) => (
              <div
                key={t.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("text", t.id)}
                className="mb-2 cursor-move rounded border p-2"
              >
                {t.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
