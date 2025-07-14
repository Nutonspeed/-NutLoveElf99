export const mockChatStatus: Record<string, boolean> = {}

export function loadChatStatus() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('mockChatStatus')
    if (stored) {
      const obj = JSON.parse(stored) as Record<string, boolean>
      Object.assign(mockChatStatus, obj)
    }
  }
}

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mockChatStatus', JSON.stringify(mockChatStatus))
  }
}

export function markChatSent(id: string) {
  mockChatStatus[id] = true
  save()
}
