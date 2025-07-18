export interface InternalChatMessage {
  id: string
  sender: string
  text: string
  createdAt: string
}

export const internalChatLog: InternalChatMessage[] = []

export function addInternalChatMessage(sender: string, text: string): InternalChatMessage {
  const entry: InternalChatMessage = {
    id: Date.now().toString(),
    sender,
    text,
    createdAt: new Date().toISOString(),
  }
  internalChatLog.push(entry)
  return entry
}

export function listInternalChatMessages(): InternalChatMessage[] {
  return [...internalChatLog]
}
