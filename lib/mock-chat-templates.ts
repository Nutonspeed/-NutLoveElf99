export interface ChatTemplate {
  id: string
  name: string
  text: string
}

export let chatTemplates: ChatTemplate[] = [
  { id: 'bill_created', name: 'สร้างบิล', text: 'เราได้ออกบิลใหม่ให้คุณแล้วค่ะ' },
  { id: 'status_paid', name: 'ยืนยันการชำระ', text: 'ออเดอร์ของคุณชำระเรียบร้อยแล้วค่ะ' },
]

export function loadChatTemplates(): boolean {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('chatTemplates')
      if (stored) chatTemplates = JSON.parse(stored)
    }
    return true
  } catch (err) {
    console.error('loadChatTemplates failed', err)
    return false
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

