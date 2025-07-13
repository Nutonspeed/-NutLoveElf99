export let autoMessage = "ขอบคุณที่สั่งซื้อกับเรา";

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
