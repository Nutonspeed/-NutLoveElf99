export interface StockLog {
  id: string;
  product: string;
  quantity: number;
  location: string;
  by: string;
  type: 'add' | 'transfer';
  timestamp: string;
}

export let mockStockLogs: StockLog[] = [
  {
    id: 'log1',
    product: 'ผ้าคลุมโซฟา 3 ที่นั่ง สีน้ำเงิน',
    quantity: 10,
    location: 'A-01',
    by: 'คุณศิริ',
    type: 'add',
    timestamp: '2024-01-15T12:00:00Z',
  },
  {
    id: 'log2',
    product: 'ผ้าคลุมโซฟา 2 ที่นั่ง สีเทา',
    quantity: 5,
    location: 'B-02',
    by: 'คุณวิชัย',
    type: 'transfer',
    timestamp: '2024-01-14T09:30:00Z',
  },
];

export function addStockLog(log: Omit<StockLog, 'id' | 'timestamp'>) {
  mockStockLogs.unshift({
    id: Date.now().toString(),
    timestamp: new Date().toISOString(),
    ...log,
  });
  if (mockStockLogs.length > 20) mockStockLogs.pop();
}
