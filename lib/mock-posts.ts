import type { BlogPost } from '@/types/blog'

export const mockPosts: BlogPost[] = [
  {
    slug: 'choose-right-cover',
    title: 'เลือกผ้าคลุมโซฟาให้เหมาะกับบ้านของคุณ',
    excerpt: 'เคล็ดลับในการเลือกผ้าคลุมโซฟาที่ทั้งสวยและใช้งานได้จริง',
    content: `ผ้าคลุมโซฟามีหลายประเภทให้เลือก ทั้งแบบกันน้ำ กันฝุ่น หรือเน้นความนุ่มสบาย\n\nการเลือกให้เหมาะสมกับสไตล์บ้านและการใช้งานจะช่วยยืดอายุการใช้งานของโซฟาได้`,
    image: '/placeholder.svg?height=400&width=600',
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    slug: 'care-tips',
    title: 'วิธีดูแลผ้าคลุมโซฟาให้ใช้งานได้นาน',
    excerpt: 'รวมเทคนิคการซักและการเก็บรักษาผ้าคลุมโซฟาอย่างถูกวิธี',
    content: `ควรซักผ้าคลุมโซฟาเป็นประจำเพื่อป้องกันการสะสมของฝุ่นและไร\n\nเลือกใช้ผงซักฟอกที่อ่อนโยนและตากในที่ร่มจะช่วยรักษาสีสันให้สดใส`,
    image: '/placeholder.svg?height=400&width=600',
    publishedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    slug: 'trending-styles',
    title: 'อัปเดตเทรนด์ผ้าคลุมโซฟายอดนิยมปี 2025',
    excerpt: 'พาชมลายผ้าคลุมโซฟาที่กำลังมาแรง พร้อมไอเดียแต่งบ้านสวยๆ',
    content: `ปี 2025 แนวโน้มผ้าคลุมโซฟาเน้นลวดลายธรรมชาติและสีเอิร์ธโทน\n\nจับคู่กับของตกแต่งแนวมินิมอลจะช่วยให้ห้องดูอบอุ่นทันสมัย`,
    image: '/placeholder.svg?height=400&width=600',
    publishedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  },
]

export function getPostBySlug(slug: string) {
  return mockPosts.find(p => p.slug === slug)
}
