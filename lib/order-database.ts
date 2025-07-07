import type { ManualOrder } from "@/types/order"

// Mock database for manual orders
const manualOrders: ManualOrder[] = [
  {
    id: "mo-001",
    orderNumber: "MO-2024-001",
    customerName: "สมชาย ใจดี",
    customerPhone: "081-234-5678",
    customerEmail: "somchai@email.com",
    customerAddress: "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
    items: [
      {
        id: "item-1",
        productName: "ผ้าคลุมโซฟา 3 ที่นั่ง",
        size: "L (190-230 cm)",
        pattern: "ลายดอกไม้",
        color: "สีฟ้า",
        price: 1500,
        quantity: 1,
        notes: "ต้องการสีฟ้าเข้ม",
        image: "/placeholder.svg?height=100&width=100&text=Sofa+Cover",
      },
      {
        id: "item-2",
        productName: "ผ้าคลุมโซฟา 2 ที่นั่ง",
        size: "M (145-185 cm)",
        pattern: "ลายทาง",
        color: "สีเทา",
        price: 1200,
        quantity: 2,
        notes: "",
        image: "/placeholder.svg?height=100&width=100&text=Sofa+Cover",
      },
    ],
    subtotal: 3900,
    discount: 200,
    shippingCost: 100,
    tax: 0,
    total: 3800,
    status: "confirmed",
    paymentStatus: "paid",
    notes: "ลูกค้า VIP ส่งด่วน",
    attachments: [
      "/placeholder.svg?height=200&width=300&text=Reference+Image+1",
      "/placeholder.svg?height=200&width=300&text=Reference+Image+2",
    ],
    publicLink: "pub-mo-001-xyz",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T14:20:00Z",
    createdBy: "admin",
    timeline: [
      {
        timestamp: "2024-01-15T10:30:00Z",
        status: "confirmed",
        user: "admin@nutlove.co",
        note: "Order created",
      },
    ],
  },
  {
    id: "mo-002",
    orderNumber: "MO-2024-002",
    customerName: "สมหญิง รักสวย",
    customerPhone: "082-345-6789",
    customerEmail: "somying@email.com",
    customerAddress: "456 ถนนพหลโยธิน แขวงลาดยาว เขตจตุจักร กรุงเทพฯ 10900",
    items: [
      {
        id: "item-3",
        productName: "ผ้าคลุมโซฟา 1 ที่นั่ง",
        size: "S (90-140 cm)",
        pattern: "ลายจุด",
        color: "สีชมพู",
        price: 900,
        quantity: 3,
        notes: "ต้องการสีชมพูอ่อน",
        image: "/placeholder.svg?height=100&width=100&text=Sofa+Cover",
      },
    ],
    subtotal: 2700,
    discount: 0,
    shippingCost: 80,
    tax: 0,
    total: 2780,
    status: "processing",
    paymentStatus: "partial",
    notes: "รอการชำระเงินส่วนที่เหลือ",
    attachments: [],
    publicLink: "pub-mo-002-abc",
    createdAt: "2024-01-16T09:15:00Z",
    updatedAt: "2024-01-16T11:45:00Z",
    createdBy: "admin",
    timeline: [
      {
        timestamp: "2024-01-16T09:15:00Z",
        status: "processing",
        user: "admin@nutlove.co",
        note: "Order created",
      },
    ],
  },
]

export const orderDb = {
  // Get all manual orders
  async getManualOrders(): Promise<ManualOrder[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...manualOrders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
      }, 500)
    })
  },

  // Get manual order by ID
  async getManualOrderById(id: string): Promise<ManualOrder | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = manualOrders.find((order) => order.id === id)
        resolve(order || null)
      }, 300)
    })
  },

  // Get manual order by public link
  async getManualOrderByPublicLink(publicLink: string): Promise<ManualOrder | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const order = manualOrders.find((order) => order.publicLink === publicLink)
        resolve(order || null)
      }, 300)
    })
  },

  // Create new manual order
  async createManualOrder(orderData: Partial<ManualOrder>): Promise<ManualOrder> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newOrder: ManualOrder = {
          id: `mo-${Date.now()}`,
          orderNumber: `MO-${new Date().getFullYear()}-${String(manualOrders.length + 1).padStart(3, "0")}`,
          customerName: orderData.customerName || "",
          customerPhone: orderData.customerPhone || "",
          customerEmail: orderData.customerEmail || "",
          customerAddress: orderData.customerAddress || "",
          items: orderData.items || [],
          subtotal: orderData.subtotal || 0,
          discount: orderData.discount || 0,
          shippingCost: orderData.shippingCost || 0,
          tax: orderData.tax || 0,
          total: orderData.total || 0,
          status: orderData.status || "draft",
          paymentStatus: orderData.paymentStatus || "unpaid",
          notes: orderData.notes || "",
          attachments: orderData.attachments || [],
          publicLink: `pub-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          createdBy: "admin",
          timeline: [
            {
              timestamp: new Date().toISOString(),
              status: orderData.status || "draft",
              user: "admin@nutlove.co",
              note: "Order created",
            },
          ],
        }

        manualOrders.push(newOrder)
        resolve(newOrder)
      }, 500)
    })
  },

  // Update manual order
  async updateManualOrder(id: string, updates: Partial<ManualOrder>): Promise<ManualOrder | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = manualOrders.findIndex((order) => order.id === id)
        if (index === -1) {
          resolve(null)
          return
        }

        const current = manualOrders[index]
        if (updates.status && updates.status !== current.status) {
          current.timeline.push({
            timestamp: new Date().toISOString(),
            status: updates.status,
            user: "admin@nutlove.co",
          })
        }

        manualOrders[index] = {
          ...current,
          ...updates,
          updatedAt: new Date().toISOString(),
        }

        resolve(manualOrders[index])
      }, 500)
    })
  },

  // Delete manual order
  async deleteManualOrder(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = manualOrders.findIndex((order) => order.id === id)
        if (index === -1) {
          resolve(false)
          return
        }

        manualOrders.splice(index, 1)
        resolve(true)
      }, 300)
    })
  },

  // Generate order number
  generateOrderNumber(): string {
    const year = new Date().getFullYear()
    const count = manualOrders.length + 1
    return `MO-${year}-${String(count).padStart(3, "0")}`
  },
}
