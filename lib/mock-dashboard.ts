import { mockOrders } from "@/core/mock/orders"
import { mockProducts } from "./mock-products"
import { mockCustomers } from "@/core/mock/customers"
import type { AnalyticsData } from "@/types/analytics"
export type { AnalyticsData }

export interface DashboardStats {
  totalOrders: number
  totalProducts: number
  totalCustomers: number
  totalRevenue: number
  lowStockItems: number
  pendingOrders: number
  newNotifications: number
}


export async function fetchDashboardStats(): Promise<DashboardStats> {
  const totalOrders = mockOrders.length
  const totalProducts = mockProducts.length
  const totalCustomers = mockCustomers.length
  const totalRevenue = mockOrders.reduce((sum, o) => sum + o.total, 0)
  const lowStockItems = mockProducts.filter((p) => !p.inStock).length
  const pendingOrders = mockOrders.filter((o) => o.status === "pendingPayment").length

  return {
    totalOrders,
    totalProducts,
    totalCustomers,
    totalRevenue,
    lowStockItems,
    pendingOrders,
    newNotifications: 0,
  }
}

export async function fetchAnalytics(): Promise<AnalyticsData> {
  const now = new Date()
  const thisMonthOrders = mockOrders.filter((o) => {
    const d = new Date(o.createdAt)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const lastMonthOrders = mockOrders.filter((o) => {
    const d = new Date(o.createdAt)
    return d.getMonth() === lastMonth.getMonth() && d.getFullYear() === lastMonth.getFullYear()
  })

  const revenueThisMonth = thisMonthOrders.reduce((sum, o) => sum + o.total, 0)
  const revenueLastMonth = lastMonthOrders.reduce((sum, o) => sum + o.total, 0)
  const revenueTotal = mockOrders.reduce((sum, o) => sum + o.total, 0)
  const growth = revenueLastMonth === 0 ? 0 : ((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100

  const ordersTotal = mockOrders.length
  const ordersPending = mockOrders.filter((o) => o.status === "pendingPayment").length
  const ordersCompleted = mockOrders.filter((o) => o.status === "paid").length

  const productsTotal = mockProducts.length
  const productsInStock = mockProducts.filter((p) => p.inStock).length
  const productsOutOfStock = mockProducts.filter((p) => !p.inStock).length

  const customerCount = mockCustomers.length

  return {
    revenue: {
      total: revenueTotal,
      thisMonth: revenueThisMonth,
      lastMonth: revenueLastMonth,
      growth: Number(growth.toFixed(2)),
    },
    orders: {
      total: ordersTotal,
      pending: ordersPending,
      completed: ordersCompleted,
    },
    products: {
      total: productsTotal,
      inStock: productsInStock,
      outOfStock: productsOutOfStock,
    },
    users: {
      customers: customerCount,
    },
  }
}
