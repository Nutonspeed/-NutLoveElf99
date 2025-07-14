export interface ChatNotification {
  id: string
  message: string
}

export const chatNotifications: ChatNotification[] = [
  { id: 'c1', message: 'ลูกค้า A ถามเรื่องบิล B123' },
  { id: 'c2', message: 'มีการตอบกลับล่าสุดเมื่อ 5 นาทีที่แล้ว' },
]
