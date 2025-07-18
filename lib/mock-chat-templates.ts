export interface ChatTemplate {
  id: string
  name: string
  text: string
}

export let chatTemplates: ChatTemplate[] = [
  { id: 'bill_created', name: 'สร้างบิล', text: 'เราได้ออกบิลใหม่ให้คุณแล้วค่ะ' },
  { id: 'status_paid', name: 'ยืนยันการชำระ', text: 'ออเดอร์ของคุณชำระเรียบร้อยแล้วค่ะ' },
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

export function importChatTemplates(json: string): boolean {
  try {
    const data = JSON.parse(json) as ChatTemplate[]
    if (!Array.isArray(data)) return false
    if (!data.every(t => typeof t.id === 'string' && typeof t.name === 'string' && typeof t.text === 'string')) {
      return false
    }
    setChatTemplates(data)
    return true
  } catch {
    return false
  }
}

export function exportChatTemplates(filename: string) {
  const blob = new Blob([JSON.stringify(chatTemplates, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

