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
