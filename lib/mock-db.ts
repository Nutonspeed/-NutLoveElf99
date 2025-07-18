export const mockDB = {
  fabrics: [
    { id: "fab-001", name: "Soft Linen", status: "available" },
    { id: "fab-002", name: "Vintage Velvet", status: "out_of_stock" }
  ],
  collections: [],
  bills: [],
  claims: [],
  customers: []
}

export function addItem(type: keyof typeof mockDB, item: any): void {
  mockDB[type].push(item)
}

export function updateItem(type: keyof typeof mockDB, id: string, data: any): void {
  const index = mockDB[type].findIndex(i => i.id === id)
  if (index !== -1) mockDB[type][index] = { ...mockDB[type][index], ...data }
}

export function removeItem(type: keyof typeof mockDB, id: string): void {
  mockDB[type] = mockDB[type].filter(i => i.id !== id)
}
