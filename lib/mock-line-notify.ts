let token = ""

export function loadLineToken() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("line_notify_token")
    if (stored) token = stored
  }
  return token
}

export function setLineToken(t: string) {
  token = t
  if (typeof window !== "undefined") {
    localStorage.setItem("line_notify_token", token)
  }
}

export function getLineToken() {
  return token
}

export async function sendLineNotify(message: string): Promise<boolean> {
  console.log("LINE Notify:", message)
  return true
}
