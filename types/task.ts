export type TaskStatus = "pending" | "inProgress" | "completed"

export interface Task {
  id: string
  role: string
  title: string
  orderId?: string
  status: TaskStatus
  dueDate?: string
}
