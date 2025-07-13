export interface ProductGroup {
  id: string
  name: string
  productIds: string[]
  preview: string
}

export const mockProductGroups: ProductGroup[] = [
  {
    id: 'g1',
    name: 'ชุดหมอน + คลิปล็อก',
    productIds: ['3', '4'],
    preview: '/placeholder.svg?height=100&width=100',
  },
]
