export let chatWelcome = 'สวัสดีค่ะ มีอะไรให้ช่วยไหม?'

import { defaultTags } from './mock-customer-tags'

export let chatTags: string[] = [...defaultTags]

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

export function loadChatTags() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('chatTags')
    if (stored) chatTags = JSON.parse(stored)
  }
}

function saveChatTags() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('chatTags', JSON.stringify(chatTags))
  }
}

export function listChatTags() {
  return chatTags
}

export function addChatTag(tag: string) {
  if (!chatTags.includes(tag)) {
    chatTags.push(tag)
    saveChatTags()
  }
}

export function removeChatTag(tag: string) {
  chatTags = chatTags.filter((t) => t !== tag)
  saveChatTags()
}
