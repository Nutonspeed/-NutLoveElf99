export let isDevMock = true;

export function loadDevMode() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('devMode')
    if (stored) isDevMock = JSON.parse(stored)
  }
}

export function setDevMode(val: boolean) {
  isDevMock = val
  if (typeof window !== 'undefined') {
    localStorage.setItem('devMode', JSON.stringify(val))
  }
}
export let autoMessage = "ขอบคุณที่สั่งซื้อกับเรา";
export let socialLinks = { facebook: "", line: "" };

export function loadAutoMessage() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('autoMessage');
    if (stored) autoMessage = stored;
  }
}

export function setAutoMessage(msg: string) {
  autoMessage = msg;
  if (typeof window !== 'undefined') {
    localStorage.setItem('autoMessage', msg);
  }
}

export function loadSocialLinks() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('socialLinks');
    if (stored) socialLinks = JSON.parse(stored);
  }
}

export function setSocialLinks(links: { facebook: string; line: string }) {
  socialLinks = links;
  if (typeof window !== 'undefined') {
    localStorage.setItem('socialLinks', JSON.stringify(links));
  }
}

export let billSecurity = { enabled: false, phone: "", pin: "" }

export let autoReminder = false
export let reviewReminder = false
export let autoArchive = false

export let notifyTeams = { packing: true, finance: true }

export function loadBillSecurity() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('billSecurity')
    if (stored) billSecurity = JSON.parse(stored)
  }
}

export function setBillSecurity(sec: { enabled: boolean; phone: string; pin: string }) {
  billSecurity = sec
  if (typeof window !== 'undefined') {
    localStorage.setItem('billSecurity', JSON.stringify(sec))
  }
}

export function loadAutoReminder() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('autoReminder')
    if (stored) autoReminder = JSON.parse(stored)
  }
}

export function loadReviewReminder() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('reviewReminder')
    if (stored) reviewReminder = JSON.parse(stored)
  }
}

export function loadAutoArchive() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('autoArchive')
    if (stored) autoArchive = JSON.parse(stored)
  }
}

export function setAutoReminder(val: boolean) {
  autoReminder = val
  if (typeof window !== 'undefined') {
    localStorage.setItem('autoReminder', JSON.stringify(val))
  }
}

export function setReviewReminder(val: boolean) {
  reviewReminder = val
  if (typeof window !== 'undefined') {
    localStorage.setItem('reviewReminder', JSON.stringify(val))
  }
}

export function setAutoArchive(val: boolean) {
  autoArchive = val
  if (typeof window !== 'undefined') {
    localStorage.setItem('autoArchive', JSON.stringify(val))
  }
}

export function loadNotifyTeams() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('notifyTeams')
    if (stored) notifyTeams = JSON.parse(stored)
  }
}

export function setNotifyTeams(val: { packing: boolean; finance: boolean }) {
  notifyTeams = val
  if (typeof window !== 'undefined') {
    localStorage.setItem('notifyTeams', JSON.stringify(val))
  }
}
