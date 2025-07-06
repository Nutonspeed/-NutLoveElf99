export interface AnalyticsData {
  revenue: {
    total: number
    thisMonth: number
    lastMonth: number
    growth: number
  }
  orders: {
    total: number
    pending: number
    completed: number
  }
  products: {
    total: number
    inStock: number
    outOfStock: number
  }
  users: {
    customers: number
  }
}
