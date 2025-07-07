// Mock database functions for demonstration
// In production, replace with actual database calls (Supabase, etc.)
import type { AnalyticsData } from "@/types/analytics"

export interface User {
  id: string
  name: string
  email: string
  password?: string
  role: "customer" | "admin"
  phone?: string
  address?: string
  city?: string
  postalCode?: string
  avatar?: string
  createdAt?: string
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  inStock: boolean
  stockQuantity: number
  rating: number
  reviewCount: number
  features: string[]
  specifications: Record<string, string>
  createdAt: string
  updatedAt: string
}

import type { OrderStatus } from "@/types/order"

export interface Order {
  id: string
  customerId: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
    image: string
  }>
  total: number
  status: OrderStatus
  shippingAddress: {
    name: string
    address: string
    city: string
    postalCode: string
    phone: string
  }
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  message: string
  timestamp: string
  type: "text" | "image" | "file"
  isAdmin: boolean
  read?: boolean
}

export interface Coupon {
  id: string
  code: string
  discount: number
  type: "percentage" | "fixed"
  active: boolean
  minAmount?: number
  maxDiscount?: number
  usageLimit?: number
  usageCount: number
  validFrom: string
  validUntil: string
  description?: string
}

// Mock data storage
const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@sofacover.com",
    password: "admin123",
    role: "admin",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    role: "customer",
    phone: "081-234-5678",
    address: "123 ถนนสุขุมวิท",
    city: "กรุงเทพฯ",
    postalCode: "10110",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "3",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password123",
    role: "customer",
    phone: "082-345-6789",
    address: "456 ถนนพหลโยธิน",
    city: "กรุงเทพฯ",
    postalCode: "10400",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "4",
    name: "Mike Johnson",
    email: "mike@example.com",
    password: "password123",
    role: "customer",
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "5",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    password: "password123",
    role: "customer",
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "6",
    name: "David Brown",
    email: "david@example.com",
    password: "password123",
    role: "customer",
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "7",
    name: "Lisa Anderson",
    email: "lisa@example.com",
    password: "password123",
    role: "customer",
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

const mockProducts: Product[] = [
  {
    id: "1",
    name: "ผ้าคลุมโซฟา Premium Velvet",
    description: "ผ้าคลุมโซฟาผ้ากำมะหยี่เกรดพรีเมียม นุ่มสบาย กันน้ำ ซักง่าย",
    price: 2990,
    originalPrice: 3990,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "premium",
    inStock: true,
    stockQuantity: 25,
    rating: 4.8,
    reviewCount: 156,
    features: ["กันน้ำ", "ซักง่าย", "ผ้านุ่ม", "ทนทาน"],
    specifications: {
      วัสดุ: "กำมะหยี่ 100%",
      ขนาด: "1-4 ที่นั่ง",
      สี: "หลากหลายสี",
      การดูแล: "ซักเครื่องได้",
    },
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "ผ้าคลุมโซฟา Cotton Blend",
    description: "ผ้าคลุมโซฟาผ้าคอตตอนผสม ระบายอากาศดี เหมาะสำหรับทุกฤดูกาล",
    price: 1990,
    originalPrice: 2490,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "standard",
    inStock: true,
    stockQuantity: 40,
    rating: 4.5,
    reviewCount: 89,
    features: ["ระบายอากาศ", "ซับเหงื่อ", "ราคาประหยัด", "หลากสี"],
    specifications: {
      วัสดุ: "Cotton Blend",
      ขนาด: "1-3 ที่นั่ง",
      สี: "8 สีให้เลือก",
      การดูแล: "ซักเครื่องได้",
    },
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "ผ้าคลุมโซฟา Waterproof Pro",
    description: "ผ้าคลุมโซฟากันน้ำ 100% เหมาะสำหรับบ้านที่มีเด็กเล็กและสัตว์เลี้ยง",
    price: 3490,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "premium",
    inStock: true,
    stockQuantity: 15,
    rating: 4.9,
    reviewCount: 234,
    features: ["กันน้ำ 100%", "กันคราบ", "ง่ายต่อการทำความสะอาด", "ทนทาน"],
    specifications: {
      วัสดุ: "Polyester กันน้ำ",
      ขนาด: "1-4 ที่นั่ง",
      สี: "6 สีให้เลือก",
      การดูแล: "เช็ดทำความสะอาดได้",
    },
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "ผ้าคลุมโซฟา Luxury Leather Look",
    description: "ผ้าคลุมโซฟาลุคหนัง ดูหรูหรา เพิ่มความสง่างามให้กับห้องนั่งเล่น",
    price: 4990,
    originalPrice: 5990,
    images: ["/placeholder.svg?height=400&width=400"],
    category: "luxury",
    inStock: false,
    stockQuantity: 0,
    rating: 4.7,
    reviewCount: 67,
    features: ["ลุคหนังแท้", "หรูหรา", "ทนทาน", "ง่ายต่อการดูแล"],
    specifications: {
      วัสดุ: "PU Leather",
      ขนาด: "2-4 ที่นั่ง",
      สี: "4 สีให้เลือก",
      การดูแล: "เช็ดด้วยผ้าชื้น",
    },
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerId: "2",
    items: [
      {
        productId: "1",
        productName: "ผ้าคลุมโซฟา Premium Velvet",
        quantity: 1,
        price: 2990,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    total: 2990,
    status: "paid",
    shippingAddress: {
      name: "John Doe",
      address: "123 ถนนสุขุมวิท",
      city: "กรุงเทพฯ",
      postalCode: "10110",
      phone: "081-234-5678",
    },
    paymentMethod: "credit_card",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ORD-002",
    customerId: "3",
    items: [
      {
        productId: "2",
        productName: "ผ้าคลุมโซฟา Cotton Blend",
        quantity: 2,
        price: 1990,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    total: 3980,
    status: "depositPaid",
    shippingAddress: {
      name: "Jane Smith",
      address: "456 ถนนพหลโยธิน",
      city: "กรุงเทพฯ",
      postalCode: "10400",
      phone: "082-345-6789",
    },
    paymentMethod: "bank_transfer",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "ORD-003",
    customerId: "5",
    items: [
      {
        productId: "3",
        productName: "ผ้าคลุมโซฟา Waterproof Pro",
        quantity: 1,
        price: 3490,
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    total: 3490,
    status: "pendingPayment",
    shippingAddress: {
      name: "Sarah Wilson",
      address: "789 ถนนรัชดาภิเษก",
      city: "กรุงเทพฯ",
      postalCode: "10310",
      phone: "083-456-7890",
    },
    paymentMethod: "promptpay",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

const mockChatMessages: ChatMessage[] = [
  {
    id: "1",
    senderId: "2",
    senderName: "John Doe",
    message: "สวัสดีครับ อยากสอบถามเรื่องผ้าคลุมโซฟาครับ",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    type: "text",
    isAdmin: false,
  },
  {
    id: "2",
    senderId: "1",
    senderName: "Admin",
    message: "สวัสดีครับ มีอะไรให้ช่วยเหลือไหมครับ",
    timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
    type: "text",
    isAdmin: true,
  },
  {
    id: "3",
    senderId: "3",
    senderName: "Jane Smith",
    message: "ผ้าคลุมโซฟาที่สั่งไปเมื่อไหร่จะถึงคะ",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    type: "text",
    isAdmin: false,
  },
]

const mockCoupons: Coupon[] = []

// Database functions
export const db = {
  // Users
  async getUsers(): Promise<User[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockUsers]), 100)
    })
  },

  async getUserById(id: string): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.id === id)
        resolve(user || null)
      }, 100)
    })
  },

  async getUserByEmail(email: string): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = mockUsers.find((u) => u.email === email)
        resolve(user || null)
      }, 100)
    })
  },

  async createUser(userData: Omit<User, "id" | "createdAt">): Promise<User> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser: User = {
          ...userData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        mockUsers.push(newUser)
        resolve(newUser)
      }, 100)
    })
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockUsers.findIndex((u) => u.id === id)
        if (index !== -1) {
          mockUsers[index] = { ...mockUsers[index], ...userData }
          resolve(mockUsers[index])
        } else {
          resolve(null)
        }
      }, 100)
    })
  },

  // Products
  async getProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockProducts]), 100)
    })
  },

  async getProductById(id: string): Promise<Product | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = mockProducts.find((p) => p.id === id)
        resolve(product || null)
      }, 100)
    })
  },

  async createProduct(productData: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProduct: Product = {
          ...productData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        mockProducts.push(newProduct)
        resolve(newProduct)
      }, 100)
    })
  },

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockProducts.findIndex((p) => p.id === id)
        if (index !== -1) {
          mockProducts[index] = {
            ...mockProducts[index],
            ...productData,
            updatedAt: new Date().toISOString(),
          }
          resolve(mockProducts[index])
        } else {
          resolve(null)
        }
      }, 100)
    })
  },

  async deleteProduct(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockProducts.findIndex((p) => p.id === id)
        if (index !== -1) {
          mockProducts.splice(index, 1)
          resolve(true)
        } else {
          resolve(false)
        }
      }, 100)
    })
  },

  // Orders
  async getOrders(): Promise<Order[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockOrders]), 100)
    })
  },

  async getOrderById(id: string): Promise<Order | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = mockOrders.find((o) => o.id === id)
        resolve(order || null)
      }, 100)
    })
  },

  async getOrdersByCustomerId(customerId: string): Promise<Order[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders = mockOrders.filter((o) => o.customerId === customerId)
        resolve(orders)
      }, 100)
    })
  },

  async createOrder(orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<Order> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder: Order = {
          ...orderData,
          id: `ORD-${String(mockOrders.length + 1).padStart(3, "0")}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        mockOrders.push(newOrder)
        resolve(newOrder)
      }, 100)
    })
  },

  async updateOrder(id: string, orderData: Partial<Order>): Promise<Order | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockOrders.findIndex((o) => o.id === id)
        if (index !== -1) {
          mockOrders[index] = {
            ...mockOrders[index],
            ...orderData,
            updatedAt: new Date().toISOString(),
          }
          resolve(mockOrders[index])
        } else {
          resolve(null)
        }
      }, 100)
    })
  },

  // Chat Messages
  async getChatMessages(): Promise<ChatMessage[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockChatMessages]), 100)
    })
  },

  async createChatMessage(messageData: Omit<ChatMessage, "id" | "timestamp">): Promise<ChatMessage> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newMessage: ChatMessage = {
          ...messageData,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
        }
        mockChatMessages.push(newMessage)
        resolve(newMessage)
      }, 100)
    })
  },

  // Coupons
  async getCoupons(): Promise<Coupon[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...mockCoupons]), 100)
    })
  },

  async createCoupon(couponData: Omit<Coupon, "id" | "usageCount">): Promise<Coupon> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCoupon: Coupon = {
          ...couponData,
          id: Date.now().toString(),
          usageCount: 0,
        }
        mockCoupons.push(newCoupon)
        resolve(newCoupon)
      }, 100)
    })
  },

  // Analytics
  async getAnalytics(): Promise<AnalyticsData> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const totalRevenue = mockOrders.reduce((sum, order) => sum + order.total, 0)
        const thisMonth = new Date()
        thisMonth.setDate(1)
        thisMonth.setHours(0, 0, 0, 0)

        const thisMonthOrders = mockOrders.filter((order) => new Date(order.createdAt) >= thisMonth)
        const thisMonthRevenue = thisMonthOrders.reduce((sum, order) => sum + order.total, 0)

        const lastMonth = new Date(thisMonth)
        lastMonth.setMonth(lastMonth.getMonth() - 1)
        const lastMonthOrders = mockOrders.filter((order) => {
          const orderDate = new Date(order.createdAt)
          return orderDate >= lastMonth && orderDate < thisMonth
        })
        const lastMonthRevenue = lastMonthOrders.reduce((sum, order) => sum + order.total, 0)

        const growth =
          lastMonthRevenue > 0 ? Math.round(((thisMonthRevenue - lastMonthRevenue) / lastMonthRevenue) * 100) : 0

        resolve({
          revenue: {
            total: totalRevenue,
            thisMonth: thisMonthRevenue,
            lastMonth: lastMonthRevenue,
            growth: growth,
          },
          orders: {
            total: mockOrders.length,
            pending: mockOrders.filter((o) => o.status === "pendingPayment").length,
            completed: mockOrders.filter((o) => o.status === "paid").length,
          },
          products: {
            total: mockProducts.length,
            inStock: mockProducts.filter((p) => p.inStock).length,
            outOfStock: mockProducts.filter((p) => !p.inStock).length,
          },
          users: {
            customers: mockUsers.filter((u) => u.role === "customer").length,
          },
        })
      }, 100)
    })
  },
}
