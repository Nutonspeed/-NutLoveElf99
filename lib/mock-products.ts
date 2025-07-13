import type { Product } from "@/types/product"
import { supabase } from "./supabase"

export const mockProducts: Product[] = [
  {
    id: "1",
    slug: "premium-velvet",
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
    collectionId: "1",
    sizes: ["1 ที่นั่ง", "2 ที่นั่ง", "3 ที่นั่ง", "L-Shape"],
    colors: ["Navy Blue", "Charcoal Gray", "Burgundy", "Forest Green"],
    inStock: true,
    rating: 4.8,
    reviews: 156,
    features: ["กันน้ำ", "กันฝุ่น", "ซักได้", "ป้องกันขนสัตว์"],
    material: "Velvet 100%",
    care: ["ซักเครื่องน้ำเย็น", "ไม่ควรใช้น้ำยาฟอก", "ตากแห้งในที่ร่ม"],
    status: "active",
    tags: ["premium", "velvet", "curated"],
    curated: true,
  },
  {
    id: "2",
    slug: "cotton-blend",
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
    collectionId: "2",
    sizes: ["1 ที่นั่ง", "2 ที่นั่ง", "3 ที่นั่ง"],
    colors: ["Cream", "Light Gray", "Beige", "White"],
    inStock: true,
    rating: 4.5,
    reviews: 89,
    features: ["ระบายอากาศ", "ซักง่าย", "ไม่ย่น", "ป้องกันรอยขีดข่วน"],
    material: "Cotton 70%, Polyester 30%",
    care: ["ซักเครื่องน้ำอุ่น", "รีดได้", "ตากแดดได้"],
    status: "active",
    tags: ["cotton", "standard"],
    curated: false,
  },
  {
    id: "3",
    slug: "waterproof-pro",
    name: "ผ้าคลุมโซฟา Waterproof Pro",
    description: "ผ้าคลุมโซฟากันน้ำ 100% เหมาะสำหรับบ้านที่มีเด็กเล็กและสัตว์เลี้ยง",
    price: 3490,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    category: "Waterproof",
    collectionId: "3",
    sizes: ["2 ที่นั่ง", "3 ที่นั่ง", "L-Shape", "Sectional"],
    colors: ["Black", "Brown", "Dark Gray", "Navy"],
    inStock: true,
    rating: 4.9,
    reviews: 203,
    features: ["กันน้ำ 100%", "กันคราบ", "ป้องกันขนสัตว์", "ทำความสะอาดง่าย"],
    material: "Polyester with TPU coating",
    care: ["เช็ดทำความสะอาดด้วยผ้าชื้น", "ซักเครื่องได้", "ไม่ควรรีด"],
    status: "active",
    tags: ["waterproof", "pro", "curated"],
    curated: true,
  },
  {
    id: "4",
    slug: "luxury-leather-look",
    name: "ผ้าคลุมโซฟา Luxury Leather Look",
    description: "ผ้าคลุมโซฟาลุคหนัง ดูหรูหรา เพิ่มความสง่างามให้ห้องนั่งเล่น",
    price: 4990,
    images: [
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
      "/placeholder.svg?height=400&width=400",
    ],
    category: "Luxury",
    collectionId: "1",
    sizes: ["2 ที่นั่ง", "3 ที่นั่ง", "L-Shape"],
    colors: ["Rich Brown", "Black", "Tan", "Burgundy"],
    inStock: true,
    rating: 4.7,
    reviews: 67,
    features: ["ลุคหนังแท้", "ทนทาน", "ง่ายต่อการดูแล", "ดูหรูหรา"],
    material: "PU Leather",
    care: ["เช็ดด้วยผ้าชื้น", "ใช้ครีมบำรุงหนัง", "หลีกเลี่ยงแสงแดดจัด"],
    status: "active",
    tags: ["luxury", "leather"],
    curated: false,
  },
]

export async function getProducts(): Promise<Product[]> {
  if (!supabase) {
    return Promise.resolve(mockProducts)
  }

  const { data, error } = await supabase.from("products").select("*")

  if (error || !data) {
    console.error("Supabase fetchProducts error", error)
    return mockProducts
  }

  return data as Product[]
}
