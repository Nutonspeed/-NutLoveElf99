export interface FaqItem {
  id: string
  question: string
  answer: string
}

export let faqItems: FaqItem[] = [
  { id: '1', question: 'สั่งซื้ออย่างไร?', answer: 'เลือกสินค้าและกดเพิ่มลงตะกร้า จากนั้นชำระเงินได้เลย' },
  { id: '2', question: 'มีบริการจัดส่งหรือไม่?', answer: 'เรามีบริการจัดส่งฟรีเมื่อสั่งซื้อครบ 1,500 บาท' },
]

export function loadFaq() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('faqItems')
    if (stored) faqItems = JSON.parse(stored)
  }
}

export function saveFaq(items: FaqItem[]) {
  faqItems = items
  if (typeof window !== 'undefined') {
    localStorage.setItem('faqItems', JSON.stringify(items))
  }
}
