export interface ChatActivity {
  id: string
  customerId: string
  action: string
  timestamp: string
}

export let chatActivity: ChatActivity[] = []

export function loadChatActivity() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('chatActivity')
    if (stored) chatActivity = JSON.parse(stored)
  }
}

export function saveChatActivity() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chatActivity', JSON.stringify(chatActivity))
  }
}

export function addChatActivity(customerId: string, action: string) {
  const entry: ChatActivity = {
    id: Date.now().toString(),
    customerId,
    action,
    timestamp: new Date().toISOString(),
  }
  chatActivity.push(entry)
  saveChatActivity()
}

export function listChatActivity(customerId?: string) {
  return customerId
    ? chatActivity.filter((a) => a.customerId === customerId)
    : chatActivity
}
