export interface ChatTemplate {
  id: string
  name: string
  text: string
}

export let chatTemplates: ChatTemplate[] = [
  { id: 'bill_created', name: 'สร้างบิล', text: 'เราได้ออกบิลใหม่ให้คุณแล้วค่ะ' },
  { id: 'status_paid', name: 'ยืนยันการชำระ', text: 'ออเดอร์ของคุณชำระเรียบร้อยแล้วค่ะ' },
  {
    id: 'tracking',
    name: 'ติดตามพัสดุ',
    text: 'พัสดุของคุณกำลังจัดส่ง สามารถติดตามได้ที่ลิงก์นี้ค่ะ',
  },
  {
    id: 'shipping_no',
    name: 'แจ้งเลขพัสดุ',
    text: 'เลขพัสดุของคุณคือ XXXX ค่ะ',
  },
  { id: 'thank_you', name: 'ขอบคุณ', text: 'ขอบคุณที่ใช้บริการนะคะ' },
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

