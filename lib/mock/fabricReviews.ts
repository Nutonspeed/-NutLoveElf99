export interface FabricReview {
  id: string
  fabricId: string
  customerName: string
  content: string
  rating: number
  date: string
}

export const mockFabricReviews: FabricReview[] = [
  {
    id: 'r1',
    fabricId: 'f01',
    customerName: 'คุณสมชาย',
    content: 'เนื้อผ้านุ่มมาก ส่งของเร็วสุดๆ',
    rating: 5,
    date: '2024-12-01',
  },
  {
    id: 'r2',
    fabricId: 'f02',
    customerName: 'คุณมณี',
    content: 'สีสวยถูกใจ ตัดเย็บเรียบร้อย',
    rating: 4,
    date: '2024-12-05',
  },
  {
    id: 'r3',
    fabricId: 'f01',
    customerName: 'คุณวัชรินทร์',
    content: 'คุณภาพเกินราคา แนะนำเลยครับ',
    rating: 5,
    date: '2025-01-10',
  },
  {
    id: 'r4',
    fabricId: 'f03',
    customerName: 'คุณรัตนา',
    content: 'สัมผัสดีมาก เหมาะกับบ้านมีเด็ก',
    rating: 4,
    date: '2025-01-15',
  },
  {
    id: 'r5',
    fabricId: 'f05',
    customerName: 'คุณกิตติ',
    content: 'ลายสวยสดใส นั่งสบาย',
    rating: 5,
    date: '2025-02-02',
  },
]
