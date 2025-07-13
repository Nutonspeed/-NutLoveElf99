export let chatWelcome = 'สวัสดีค่ะ มีอะไรให้ช่วยไหม?'

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
