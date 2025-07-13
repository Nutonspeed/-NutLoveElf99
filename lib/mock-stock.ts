export interface StockItem {
  id: string
  name: string
  sku: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  location: string
  lastUpdated: string
  status: "normal" | "low" | "out" | "critical"
  price: number
}

export const mockStock: StockItem[] = [
  {
    id: "1",
    name: "ผ้าคลุมโซฟา 3 ที่นั่ง สีน้ำเงิน",
    sku: "SC-001",
    category: "ผ้าคลุมโซฟา",
    currentStock: 5,
    minStock: 10,
    maxStock: 50,
    location: "A-01",
    lastUpdated: "2024-01-15T10:30:00Z",
    status: "low",
    price: 1200,
  },
  {
    id: "2",
    name: "ผ้าคลุมโซฟา 2 ที่นั่ง สีเทา",
    sku: "SC-002",
    category: "ผ้าคลุมโซฟา",
    currentStock: 0,
    minStock: 8,
    maxStock: 40,
    location: "A-02",
    lastUpdated: "2024-01-14T15:45:00Z",
    status: "out",
    price: 950,
  },
  {
    id: "3",
    name: "ผ้าคลุมโซฟา L-Shape สีครีม",
    sku: "SC-003",
    category: "ผ้าคลุมโซฟา",
    currentStock: 15,
    minStock: 12,
    maxStock: 60,
    location: "B-01",
    lastUpdated: "2024-01-15T09:20:00Z",
    status: "normal",
    price: 1800,
  },
  {
    id: "4",
    name: "ผ้าคลุมโซฟา 1 ที่นั่ง สีแดง",
    sku: "SC-004",
    category: "ผ้าคลุมโซฟา",
    currentStock: 2,
    minStock: 15,
    maxStock: 45,
    location: "A-03",
    lastUpdated: "2024-01-13T14:10:00Z",
    status: "critical",
    price: 750,
  },
  {
    id: "5",
    name: "ผ้าคลุมโซฟา 3 ที่นั่ง สีเขียว",
    sku: "SC-005",
    category: "ผ้าคลุมโซฟา",
    currentStock: 25,
    minStock: 10,
    maxStock: 50,
    location: "B-02",
    lastUpdated: "2024-01-15T11:00:00Z",
    status: "normal",
    price: 1200,
  },
]

export function getLowStockItems(): StockItem[] {
  return mockStock.filter((item) => item.currentStock < 5)
}
