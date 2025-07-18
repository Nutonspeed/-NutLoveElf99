import type { Task } from "@/types/task"

export const mockTasks: Task[] = [
  {
    id: "TASK-001",
    role: "production",
    title: "ตัดผ้าสำหรับ ORD-001",
    orderId: "ORD-001",
    status: "pending",
    dueDate: "2024-01-17",
  },
  {
    id: "TASK-002",
    role: "production",
    title: "เย็บปลอก ORD-002",
    orderId: "ORD-002",
    status: "inProgress",
    dueDate: "2024-01-18",
  },
  {
    id: "TASK-003",
    role: "shipping",
    title: "แพ็กสินค้าส่ง ORD-001",
    orderId: "ORD-001",
    status: "pending",
    dueDate: "2024-01-19",
  },
  {
    id: "TASK-004",
    role: "support",
    title: "ตอบคำถามลูกค้า ORD-002",
    orderId: "ORD-002",
    status: "pending",
  },
]

export let tasks: Task[] = [...mockTasks]

const STORAGE_KEY = 'tasks'

export function loadTasks() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) tasks = JSON.parse(stored)
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }
}

export function listTasks(): Task[] {
  return tasks
}

export function addTask(data: Omit<Task, 'id'>): Task {
  const t: Task = { id: Date.now().toString(), ...data }
  tasks.push(t)
  save()
  return t
}

export function updateTaskStatus(id: string, status: Task['status']) {
  const t = tasks.find((tk) => tk.id === id)
  if (t) {
    t.status = status
    save()
  }
}

export function assignTask(id: string, role: string) {
  const t = tasks.find((tk) => tk.id === id)
  if (t) {
    t.role = role
    save()
  }
}
