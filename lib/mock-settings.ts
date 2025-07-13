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

export function setAutoReminder(val: boolean) {
  autoReminder = val
  if (typeof window !== 'undefined') {
    localStorage.setItem('autoReminder', JSON.stringify(val))
  }
}
