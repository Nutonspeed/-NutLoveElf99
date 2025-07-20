import type { Task, TaskStatus } from "@/types/task"

const STORAGE_KEY = "tasks"

const initialTasks: Task[] = [
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

export let mockTasks: Task[] = [...initialTasks]

function saveTasks() {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTasks))
  }
}

export function loadTasks() {
  if (typeof window === "undefined") return
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      mockTasks = JSON.parse(raw) as Task[]
    } catch {
      mockTasks = [...initialTasks]
    }
  } else {
    saveTasks()
  }
}

export function getTasks() {
  if (typeof window !== "undefined") loadTasks()
  return mockTasks
}

export function addTask(task: Omit<Task, "id"> & { id?: string }) {
  const newTask: Task = {
    id: task.id || Date.now().toString(),
    status: "pending",
    ...task,
  }
  mockTasks.push(newTask)
  saveTasks()
  return newTask
}

export function updateTaskStatus(id: string, status: TaskStatus) {
  const t = mockTasks.find((task) => task.id === id)
  if (t) {
    t.status = status
    saveTasks()
  }
}

export function deleteTask(id: string) {
  mockTasks = mockTasks.filter((t) => t.id !== id)
  saveTasks()
}
