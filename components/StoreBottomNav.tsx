"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingCart, Package, User } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function StoreBottomNav() {
  const isMobile = useIsMobile()
  const pathname = usePathname()

  if (!isMobile) return null

  const itemClass = (active: boolean) =>
    `flex flex-col items-center flex-1 ${active ? 'text-primary' : ''}`

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 border-t bg-background flex text-xs">
      <Link href="/" className={itemClass(pathname === '/')}> 
        <Home className="h-5 w-5" />
        Home
      </Link>
      <Link href="/cart" className={itemClass(pathname.startsWith('/cart'))}>
        <ShoppingCart className="h-5 w-5" />
        Cart
      </Link>
      <Link href="/orders" className={itemClass(pathname.startsWith('/orders'))}>
        <Package className="h-5 w-5" />
        Orders
      </Link>
      <Link href="/profile" className={itemClass(pathname.startsWith('/profile'))}>
        <User className="h-5 w-5" />
        Profile
      </Link>
    </nav>
  )
}
