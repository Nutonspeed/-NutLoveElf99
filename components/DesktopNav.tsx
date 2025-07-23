"use client"
import { useState } from "react"
import Link from "next/link"
import { Search, ShoppingCart } from "lucide-react"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"

export default function DesktopNav() {
  const [searchQuery, setSearchQuery] = useState("")
  const { state } = useCart()
  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0)
  const { isAuthenticated, user, logout } = useAuth()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const navigation = [
    { name: "หน้าแรก", href: "/" },
    { name: "สินค้า", href: "/products" },
    { name: "คอลเลกชัน", href: "/collections" },
    { name: "เกี่ยวกับเรา", href: "/about" },
    { name: "ติดต่อเรา", href: "/contact" },
    { name: "การคืนสินค้า", href: "/returns" },
  ]

  return (
    <div className="hidden md:flex items-center justify-between w-full h-16">
      <div className="flex items-center space-x-8">
        {navigation.map((item) => (
          <Link key={item.name} href={item.href} className="text-sm font-medium hover:text-primary">
            {item.name}
          </Link>
        ))}
      </div>
      <form onSubmit={handleSearch} className="relative w-1/3">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="ค้นหาสินค้า..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </form>
      <div className="flex items-center space-x-4">
        <Link href="/cart">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {totalItems}
              </Badge>
            )}
          </Button>
        </Link>
        {isAuthenticated ? (
          <div className="flex items-center space-x-2">
            {user?.role === "admin" && <span className="text-sm">{user.name}</span>}
            <Button variant="ghost" onClick={logout} className="text-sm">
              ออกจากระบบ
            </Button>
          </div>
        ) : (
          <Link href="/login">
            <Button variant="outline" className="text-sm">เข้าสู่ระบบ</Button>
          </Link>
        )}
      </div>
    </div>
  )
}
