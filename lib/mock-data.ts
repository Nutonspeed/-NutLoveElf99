
export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  message: string
  timestamp: string
  type: "text" | "image" | "file"
  isAdmin: boolean
}

export const mockChatMessages: ChatMessage[] = [
  {
    id: "1",
    senderId: "2",
    senderName: "John Doe",
    message: "สวัสดีครับ อยากสอบถามเรื่องผ้าคลุมโซฟาครับ",
    timestamp: "2024-01-15T09:00:00Z",
    type: "text",
    isAdmin: false,
  },
  {
    id: "2",
    senderId: "1",
    senderName: "Admin",
    message: "สวัสดีค่ะ ยินดีให้คำปรึกษาค่ะ ต้องการสอบถามเรื่องอะไรคะ?",
    timestamp: "2024-01-15T09:02:00Z",
    type: "text",
    isAdmin: true,
  },
  {
    id: "3",
    senderId: "2",
    senderName: "John Doe",
    message: "อยากทราบว่าผ้าคลุมโซฟา Premium Velvet มีสีอะไรบ้างครับ",
    timestamp: "2024-01-15T09:05:00Z",
    type: "text",
    isAdmin: false,
  },
  {
    id: "4",
    senderId: "1",
    senderName: "Admin",
    message: "ผ้าคลุมโซฟา Premium Velvet มี 4 สีค่ะ: Navy Blue, Charcoal Gray, Burgundy, และ Forest Green ค่ะ",
    timestamp: "2024-01-15T09:07:00Z",
    type: "text",
    isAdmin: true,
  },
]

export const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@sofacover.com",
    role: "admin" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    role: "customer" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]
