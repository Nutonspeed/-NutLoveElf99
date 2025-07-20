export interface NotificationPref {
  line: boolean
  email: boolean
  push: boolean
  inApp: boolean
}

const defaultPref: NotificationPref = {
  line: false,
  email: true,
  push: false,
  inApp: true,
}

let prefs: Record<string, NotificationPref> = {}

function save() {
  if (typeof window !== "undefined") {
    localStorage.setItem("user_notify_pref", JSON.stringify(prefs))
  }
}

export function loadPrefs() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem("user_notify_pref")
    if (stored) prefs = JSON.parse(stored)
  }
}

export function getPref(userId: string): NotificationPref {
  return prefs[userId] || { ...defaultPref }
}

export function setPref(userId: string, pref: NotificationPref) {
  prefs[userId] = pref
  save()
}
