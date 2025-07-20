import type { LegalSection } from "@/types/legal"

export let terms: LegalSection[] = [
  {
    id: "1",
    title: "การใช้งานเว็บไซต์",
    paragraphs: [
      "เว็บไซต์นี้จัดทำขึ้นเพื่อให้ข้อมูลและจำหน่ายสินค้าเท่านั้น",
      "ผู้ใช้ต้องไม่คัดลอกหรือแจกจ่ายเนื้อหาโดยไม่ได้รับอนุญาต",
    ],
  },
  {
    id: "2",
    title: "สิทธิ์และความรับผิดชอบ",
    paragraphs: [
      "ผู้ใช้ต้องปฏิบัติตามกฎหมายและไม่ละเมิดสิทธิ์ของผู้อื่น",
    ],
  },
]

const STORAGE_KEY = "terms"

export function loadTerms() {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) terms = JSON.parse(stored)
  }
}

export function saveTerms(list: LegalSection[]) {
  terms = list
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
  }
}
