export let chatWelcome = 'สวัสดีค่ะ มีอะไรให้ช่วยไหม?'

export interface ChatConversation {
  id: string
  name: string
  lastMessage: string
}

export const mockConversations: ChatConversation[] = [
  { id: 'conv-001', name: 'John Doe', lastMessage: 'สวัสดีครับ' },
  { id: 'conv-002', name: 'Jane Smith', lastMessage: 'สนใจสินค้าค่ะ' },
  { id: 'conv-003', name: 'Mike Johnson', lastMessage: 'ขอรายละเอียดเพิ่ม' },
]

export function loadChatWelcome() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('chatWelcome')
    if (stored) chatWelcome = stored
  }
}

export function setChatWelcome(msg: string) {
  chatWelcome = msg
  if (typeof window !== 'undefined') {
    localStorage.setItem('chatWelcome', msg)
  }
}
