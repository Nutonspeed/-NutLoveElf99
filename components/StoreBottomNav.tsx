"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, ShoppingCart, Package, User } from "lucide-react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useCart } from "@/contexts/cart-context"
import { Badge } from "@/components/ui/badge"

export default function StoreBottomNav() {
  const isMobile = useIsMobile()
  const pathname = usePathname()
  const { state } = useCart()
  const count = state.items.reduce((s, i) => s + i.quantity, 0)

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
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />
          {count > 0 && (
            <Badge className="absolute -top-1 -right-2 h-4 w-4 p-0 text-[10px]">
              {count}
            </Badge>
          )}
        </div>
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
