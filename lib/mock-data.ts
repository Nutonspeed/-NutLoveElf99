export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  sizes: string[]
  colors: string[]
  inStock: boolean
  rating: number
  reviews: number
  features: string[]
  material: string
  care: string[]
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
    size?: string
    color?: string
  }>
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: string
  shippingAddress: {
    name: string
    address: string
    city: string
    postalCode: string
    phone: string
  }
}

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  message: string
  timestamp: string
  type: "text" | "image" | "file"
  isAdmin: boolean
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "ผ้าคลุมโซฟา Premium Velvet",
    description: "ผ้าคลุมโซฟาผ้ากำมะหยี่คุณภาพสูง นุ่มสบาย กันน้ำ กันฝุ่น",
    price: 2990,
    originalPrice: 3990,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    category: "Premium",
    sizes: ["1 ที่นั่ง", "2 ที่นั่ง", "3 ที่นั่ง", "L-Shape"],
    colors: ["Navy Blue", "Charcoal Gray", "Burgundy", "Forest Green"],
    inStock: true,
    rating: 4.8,
    reviews: 156,
    features: ["กันน้ำ", "กันฝุ่น", "ซักได้", "ป้องกันขนสัตว์"],
    material: "Velvet 100%",
    care: ["ซักเครื่องน้ำเย็น", "ไม่ควรใช้น้ำยาฟอก", "ตากแห้งในที่ร่ม"],
  },
  {
    id: "2",
    name: "ผ้าคลุมโซฟา Cotton Blend",
    description: "ผ้าคลุมโซฟาผ้าคอตตอนผสม ระบายอากาศได้ดี เหมาะกับสภาพอากาศร้อน",
    price: 1990,
    originalPrice: 2490,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    category: "Standard",
    sizes: ["1 ที่นั่ง", "2 ที่นั่ง", "3 ที่นั่ง"],
    colors: ["Cream", "Light Gray", "Beige", "White"],
    inStock: true,
    rating: 4.5,
    reviews: 89,
    features: ["ระบายอากาศ", "ซักง่าย", "ไม่ย่น", "ป้องกันรอยขีดข่วน"],
    material: "Cotton 70%, Polyester 30%",
    care: ["ซักเครื่องน้ำอุ่น", "รีดได้", "ตากแดดได้"],
  },
  {
    id: "3",
    name: "ผ้าคลุมโซฟา Waterproof Pro",
    description: "ผ้าคลุมโซฟากันน้ำ 100% เหมาะสำหรับบ้านที่มีเด็กเล็กและสัตว์เลี้ยง",
    price: 3490,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    category: "Waterproof",
    sizes: ["2 ที่นั่ง", "3 ที่นั่ง", "L-Shape", "Sectional"],
    colors: ["Black", "Brown", "Dark Gray", "Navy"],
    inStock: true,
    rating: 4.9,
    reviews: 203,
    features: ["กันน้ำ 100%", "กันคราบ", "ป้องกันขนสัตว์", "ทำความสะอาดง่าย"],
    material: "Polyester with TPU coating",
    care: ["เช็ดทำความสะอาดด้วยผ้าชื้น", "ซักเครื่องได้", "ไม่ควรรีด"],
  },
  {
    id: "4",
    name: "ผ้าคลุมโซฟา Luxury Leather Look",
    description: "ผ้าคลุมโซฟาลุคหนัง ดูหรูหรา เพิ่มความสง่างามให้ห้องนั่งเล่น",
    price: 4990,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    category: "Luxury",
    sizes: ["2 ที่นั่ง", "3 ที่นั่ง", "L-Shape"],
    colors: ["Rich Brown", "Black", "Tan", "Burgundy"],
    inStock: true,
    rating: 4.7,
    reviews: 67,
    features: ["ลุคหนังแท้", "ทนทาน", "ง่ายต่อการดูแล", "ดูหรูหรา"],
    material: "PU Leather",
    care: ["เช็ดด้วยผ้าชื้น", "ใช้ครีมบำรุงหนัง", "หลีกเลี่ยงแสงแดดจัด"],
  },
]

export const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customerId: "2",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    items: [
      {
        productId: "1",
        productName: "ผ้าคลุมโซฟา Premium Velvet",
        quantity: 1,
        price: 2990,
        size: "3 ที่นั่ง",
        color: "Navy Blue",
      },
    ],
    total: 2990,
    status: "processing",
    createdAt: "2024-01-15T10:30:00Z",
    shippingAddress: {
      name: "John Doe",
      address: "123 ถนนสุขุมวิท",
      city: "กรุงเทพฯ",
      postalCode: "10110",
      phone: "081-234-5678",
    },
  },
  {
    id: "ORD-002",
    customerId: "3",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    items: [
      {
        productId: "2",
        productName: "ผ้าคลุมโซฟา Cotton Blend",
        quantity: 2,
        price: 1990,
        size: "2 ที่นั่ง",
        color: "Cream",
      },
    ],
    total: 3980,
    status: "shipped",
    createdAt: "2024-01-14T14:20:00Z",
    shippingAddress: {
      name: "Jane Smith",
      address: "456 ถนนพหลโยธิน",
      city: "กรุงเทพฯ",
      postalCode: "10400",
      phone: "082-345-6789",
    },
  },
]

export const mockChatMessages: ChatMessage[] = [
  {
    id: "1",
    senderId: "2",
    senderName: "John Doe",
    message: "สวัสดีครับ อยากสอบถามเรื่องผ้าคลุมโซฟาครับ",
    timestamp: "2024-01-15T09:00:00Z",
    type: "text",
    isAdmin: false,
  },
  {
    id: "2",
    senderId: "1",
    senderName: "Admin",
    message: "สวัสดีค่ะ ยินดีให้คำปรึกษาค่ะ ต้องการสอบถามเรื่องอะไรคะ?",
    timestamp: "2024-01-15T09:02:00Z",
    type: "text",
    isAdmin: true,
  },
  {
    id: "3",
    senderId: "2",
    senderName: "John Doe",
    message: "อยากทราบว่าผ้าคลุมโซฟา Premium Velvet มีสีอะไรบ้างครับ",
    timestamp: "2024-01-15T09:05:00Z",
    type: "text",
    isAdmin: false,
  },
  {
    id: "4",
    senderId: "1",
    senderName: "Admin",
    message: "ผ้าคลุมโซฟา Premium Velvet มี 4 สีค่ะ: Navy Blue, Charcoal Gray, Burgundy, และ Forest Green ค่ะ",
    timestamp: "2024-01-15T09:07:00Z",
    type: "text",
    isAdmin: true,
  },
]

export const mockUsers = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@sofacover.com",
    role: "admin" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "John Doe",
    email: "john@example.com",
    role: "customer" as const,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]
