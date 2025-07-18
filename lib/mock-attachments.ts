export interface ChatAttachment {
  id: string
  name: string
  url: string
}

export let chatAttachments: ChatAttachment[] = []

export async function addChatAttachment(file: File): Promise<ChatAttachment> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(new Error('read-error'))
    reader.readAsDataURL(file)
  })
  const entry: ChatAttachment = {
    id: Date.now().toString(),
    name: file.name,
    url: dataUrl,
  }
  chatAttachments = [entry, ...chatAttachments]
  if (typeof window !== 'undefined') {
    localStorage.setItem('chatAttachments', JSON.stringify(chatAttachments))
  }
  return entry
}

export function loadChatAttachments() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('chatAttachments')
    if (stored) chatAttachments = JSON.parse(stored)
  }
}
