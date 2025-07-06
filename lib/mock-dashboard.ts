
import { mockOrders } from "./mock-orders";

export function calculateAnalytics() {
  const stats = {
    totalOrders: mockOrders.length,
    ordersThisMonth: mockOrders.filter((o) => new Date(o.date).getMonth() === new Date().getMonth()).length,
  };

  const pendingOrders = mockOrders.filter((o) => o.status === "pending").length;

  return {
    orders: {
      total: stats.totalOrders,
      thisMonth: stats.ordersThisMonth,
      pending: pendingOrders,
      completed: mockOrders.filter((o) => o.status === "delivered").length,
    },
    products: {
      topSelling: ["Sofa Cover A", "Sofa Cover B"],
    },
  };
}
