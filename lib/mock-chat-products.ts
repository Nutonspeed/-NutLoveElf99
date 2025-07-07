export const chatRoomProducts: Record<string, string[]> = {
  "2": ["1", "2"],
  "3": ["3"],
  "4": ["1"],
}

export function getProductsForChat(customerId: string): string[] {
  return chatRoomProducts[customerId] || []
}
