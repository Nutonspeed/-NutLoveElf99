export interface BreadcrumbItem {
  label: string
  href: string
}

export interface RouteMeta {
  path: string
  title: string
  category: string
  breadcrumb: BreadcrumbItem[]
}

export const routeMeta: RouteMeta[] = [
  {
    path: '/',
    title: 'หน้าแรก',
    category: 'home',
    breadcrumb: [{ label: 'หน้าแรก', href: '/' }],
  },
  {
    path: '/cart',
    title: 'ตะกร้าสินค้า',
    category: 'cart',
    breadcrumb: [
      { label: 'หน้าแรก', href: '/' },
      { label: 'ตะกร้า', href: '/cart' },
    ],
  },
  {
    path: '/orders',
    title: 'คำสั่งซื้อ',
    category: 'orders',
    breadcrumb: [
      { label: 'หน้าแรก', href: '/' },
      { label: 'คำสั่งซื้อ', href: '/orders' },
    ],
  },
  {
    path: '/orders/:id',
    title: 'รายละเอียดคำสั่งซื้อ',
    category: 'orders',
    breadcrumb: [
      { label: 'หน้าแรก', href: '/' },
      { label: 'คำสั่งซื้อ', href: '/orders' },
      { label: 'คำสั่งซื้อ :id', href: '/orders/:id' },
    ],
  },
  {
    path: '/profile',
    title: 'โปรไฟล์',
    category: 'profile',
    breadcrumb: [
      { label: 'หน้าแรก', href: '/' },
      { label: 'โปรไฟล์', href: '/profile' },
    ],
  },
]
