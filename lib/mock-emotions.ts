export interface EmotionMessage {
  emoji: string
  text: string
}

const messages: Partial<Record<number, EmotionMessage>> = {
  1: { emoji: "☕", text: "ยอดเบานะวันนี้ แวะกาแฟก่อนมั้ยคะ ☕" },
  5: { emoji: "💰", text: "สิ้นเดือนแล้ว ลุยปิดยอดให้สุด 💰" },
}

export const fallbackEmotion: EmotionMessage = {
  emoji: "💖",
  text: "วันนี้ไม่มีคำพูดพิเศษนะคะ แต่แอดมินก็เก่งที่สุดแล้วค่ะ 💖",
}

export function getEmotionForDay(day: number = new Date().getDay()): EmotionMessage {
  return messages[day] ?? fallbackEmotion
}
