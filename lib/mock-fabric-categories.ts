export interface FabricCategory {
  name: string
  slug: string
  children?: FabricCategory[]
}

export const mockFabricCategories: FabricCategory[] = [
  {
    name: 'ผ้าพื้น',
    slug: 'basic',
    children: [
      {
        name: 'ผ้าเนื้อพิเศษ',
        slug: 'premium',
        children: [
          { name: 'ผ้าญี่ปุ่น', slug: 'japanese' },
        ],
      },
    ],
  },
]
