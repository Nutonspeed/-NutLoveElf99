import type { LegalSection } from "@/types/legal"

export let privacy: LegalSection[] = [
  {
    id: "1",
    title: "การเก็บรวบรวมข้อมูล",
    paragraphs: [
      "เราเก็บข้อมูลที่จำเป็นต่อการให้บริการ เช่น ชื่อ และที่อยู่",
    ],
  },
  {
    id: "2",
    title: "การใช้ข้อมูล",
    paragraphs: [
      "ข้อมูลของคุณจะใช้เพื่อประมวลผลคำสั่งซื้อและบริการลูกค้าเท่านั้น",
    ],
  },
]

const STORAGE_KEY = "privacy"

export function loadPrivacy() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) privacy = JSON.parse(stored)
  }
}

export function savePrivacy(list: LegalSection[]) {
  privacy = list
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }
}
