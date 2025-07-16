export interface ChatTemplate {
  id: string
  name: string
  text: string
  favorite?: boolean
}

export let chatTemplates: ChatTemplate[] = [
  {
    id: 'bill_created',
    name: 'สร้างบิล',
    text: 'เราได้ออกบิลใหม่ให้คุณแล้วค่ะ',
    favorite: false,
  },
  {
    id: 'status_paid',
    name: 'ยืนยันการชำระ',
    text: 'ออเดอร์ของคุณชำระเรียบร้อยแล้วค่ะ',
    favorite: false,
  },
]

export function loadChatTemplates() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('chatTemplates')
    if (stored) chatTemplates = JSON.parse(stored)
  }
}

export function setChatTemplates(templates: ChatTemplate[]) {
  chatTemplates = templates
  if (typeof window !== 'undefined') {
    localStorage.setItem('chatTemplates', JSON.stringify(templates))
  }
}

export function getChatTemplate(id: string): ChatTemplate | undefined {
  return chatTemplates.find((t) => t.id === id)
}

export function toggleTemplateFavorite(id: string) {
  const idx = chatTemplates.findIndex((t) => t.id === id)
  if (idx === -1) return
  const updated = {
    ...chatTemplates[idx],
    favorite: !chatTemplates[idx].favorite,
  }
  chatTemplates[idx] = updated
  setChatTemplates([...chatTemplates])
}

