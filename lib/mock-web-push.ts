let enabled = false

export function loadWebPush() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("web_push_enabled")
    if (stored) enabled = JSON.parse(stored)
  }
  return enabled
}

export function setWebPushEnabled(val: boolean) {
  enabled = val
  if (typeof window !== "undefined") {
    localStorage.setItem("web_push_enabled", JSON.stringify(enabled))
  }
}

export function isWebPushEnabled() {
  return enabled
}

export function testWebPush(message: string) {
  if (typeof window !== "undefined" && "Notification" in window) {
    Notification.requestPermission().then((p) => {
      if (p === "granted") {
        new Notification(message)
      }
    })
  }
}
