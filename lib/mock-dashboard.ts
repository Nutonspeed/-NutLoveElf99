import { mockOrders } from "./mock-orders"
import { mockProducts } from "./mock-products"
import { mockCustomers } from "./mock-customers"

export interface DashboardStats {
  ordersToday: number
  ordersThisMonth: number
  revenueToday: number
  revenueThisMonth: number
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
  totalProducts: number
  lowStockItems: number
  pendingOrders: number
  newNotifications: number
}

function calculateStats(): DashboardStats {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)

  const ordersToday = mockOrders.filter((o) => new Date(o.createdAt) >= today)
  const ordersThisMonth = mockOrders.filter(
    (o) => new Date(o.createdAt) >= monthStart,
  )

  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0)
  const revenueToday = ordersToday.reduce((sum, o) => sum + o.total, 0)
  const revenueThisMonth = ordersThisMonth.reduce((sum, o) => sum + o.total, 0)

  const lowStockItems = mockProducts.filter((p) => !p.inStock).length
  const pendingOrders = mockOrders.filter((o) => o.status === "pending").length

  return {
    ordersToday: ordersToday.length,
    ordersThisMonth: ordersThisMonth.length,
    revenueToday,
    revenueThisMonth,
    totalOrders: mockOrders.length,
    totalRevenue,
    totalCustomers: mockCustomers.length,
    totalProducts: mockProducts.length,
    lowStockItems,
    pendingOrders,
    newNotifications: 0,
  }
}

export const dashboardStats: DashboardStats = calculateStats()

export async function fetchDashboardStats(): Promise<DashboardStats> {
  return Promise.resolve({ ...dashboardStats })
}

export interface AnalyticsData {
  revenue: {
    total: number
    thisMonth: number
    lastMonth: number
    growth: number
  }
  orders: {
    total: number
    thisMonth: number
    pending: number
    completed: number
  }
  products: {
    total: number
    inStock: number
    outOfStock: number
  }
  users: {
    total: number
    customers: number
    admins: number
  }
}

function calculateAnalytics(): AnalyticsData {
  const stats = dashboardStats

  const lastMonth = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
  const thisMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  const lastMonthOrders = mockOrders.filter((o) => {
    const d = new Date(o.createdAt)
    return d >= lastMonth && d < thisMonthStart
  })
  const lastMonthRevenue = lastMonthOrders.reduce((sum, o) => sum + o.total, 0)

  const growth =
    lastMonthRevenue > 0 ? Math.round(((stats.revenueThisMonth - lastMonthRevenue) / lastMonthRevenue) * 100) : 0

  return {
    revenue: {
      total: stats.totalRevenue,
      thisMonth: stats.revenueThisMonth,
      lastMonth: lastMonthRevenue,
      growth,
    },
    orders: {
      total: stats.totalOrders,
      thisMonth: stats.ordersThisMonth,
      pending: pendingOrders,
      completed: mockOrders.filter((o) => o.status === "delivered").length,
    },
    products: {
      total: stats.totalProducts,
      inStock: mockProducts.filter((p) => p.inStock).length,
      outOfStock: mockProducts.filter((p) => !p.inStock).length,
    },
    users: {
      total: mockCustomers.length,
      customers: mockCustomers.length,
      admins: 1,
    },
  }
}

export const analyticsData: AnalyticsData = calculateAnalytics()

export async function fetchAnalytics(): Promise<AnalyticsData> {
  return Promise.resolve({ ...analyticsData })
}
