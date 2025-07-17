"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/buttons/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  ShoppingCart,
  User,
  Heart,
  GitCompare,
  Ticket,
  MessageCircle,
  LogOut,
  Settings,
  Package,
  Star,
} from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useDevelopmentNotice } from "@/hooks/use-development-notice"
import { addChatActivity, loadChatActivity } from "@/lib/mock-chat-activity"
import { DesktopMenu } from "@/components/navbar/DesktopMenu"
import { MobileMenu } from "@/components/navbar/MobileMenu"
import { SearchBar } from "@/components/navbar/SearchBar"

export function Navbar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuLoading, setMenuLoading] = useState(false)
  const [dashboardLoading, setDashboardLoading] = useState(false)
  const { state } = useCart()
  const { user, guestId, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const { showDevelopmentNotice } = useDevelopmentNotice()
  const { toast } = useToast()

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
      setIsSearchOpen(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const handleFeatureClick = (feature: string) => {
    showDevelopmentNotice(feature, "กำลังพัฒนาระบบนี้")
  }

  const navigation = [
    { name: "หน้าแรก", href: "/" },
    { name: "สินค้า", href: "/products" },
    { name: "คอลเลกชัน", href: "/collections" },
    { name: "เกี่ยวกับเรา", href: "/about" },
    { name: "ติดต่อเรา", href: "/contact" },
  ]

  const userMenuItems = [
    { name: "โปรไฟล์", href: "/profile", icon: User },
    { name: "คำสั่งซื้อ", href: "/orders", icon: Package },
    { name: "รายการโปรด", href: "/wishlist", icon: Heart },
    { name: "เปรียบเทียบ", href: "/compare", icon: GitCompare },
    { name: "คูปอง", href: "/coupons", icon: Ticket },
    { name: "รีวิว", href: "/reviews", icon: Star },
    { name: "แชท", href: "/chat", icon: MessageCircle },
  ]

  const handleMenuClick = () => {
    setMenuLoading(true)
    setTimeout(() => {
      const ok = Math.random() > 0.5
      setMenuLoading(false)
      if (ok) {
        setMenuOpen(true)
        toast({ description: "เปิดเมนูสำเร็จ" })
      } else {
        toast({ description: "เปิดเมนูไม่สำเร็จ", variant: "destructive" })
      }
    }, 1000)
  }

  const handleDashboardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setDashboardLoading(true)
    setTimeout(() => {
      const ok = Math.random() > 0.5
      setDashboardLoading(false)
      if (ok) {
        toast({ description: "เข้าสู่แดชบอร์ดสำเร็จ" })
        router.push("/admin/dashboard")
        setMenuOpen(false)
      } else {
        toast({ description: "เปิดแดชบอร์ดล้มเหลว", variant: "destructive" })
      }
    }, 1000)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">SC</span>
            </div>
            <span className="font-bold text-xl hidden sm:block">SofaCover</span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopMenu navigation={navigation} />

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
              className="w-full"
            />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Button - Mobile */}
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="h-5 w-5" />
            </Button>

            {/* Quick Actions - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/compare">
                <Button variant="ghost" size="icon" className="relative">
                  <GitCompare className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Cart */}
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

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.name}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />

                  {userMenuItems.map((item) => (
                    <DropdownMenuItem key={item.name} asChild>
                      <Link
                        href={item.href}
                        onClick={() => {
                          if (item.href === "/chat") {
                            loadChatActivity()
                            addChatActivity(user?.id || guestId!, "open_chat")
                          }
                        }}
                        className="flex items-center"
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}

                  {user?.role === "admin" && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link
                          href="/admin/dashboard"
                          onClick={handleDashboardClick}
                          className="flex items-center"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          {dashboardLoading ? "กำลังโหลด..." : "ระบบจัดการ"}
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}

                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    ออกจากระบบ
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    เข้าสู่ระบบ
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">สมัครสมาชิก</Button>
                </Link>
              </div>
            )}

          {/* Mobile Menu */}
          <MobileMenu
            open={menuOpen}
            onOpenChange={setMenuOpen}
            loading={menuLoading}
            handleOpen={handleMenuClick}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
            navigation={navigation}
            userMenuItems={userMenuItems}
            isAuthenticated={isAuthenticated}
            isAdmin={user?.role === "admin"}
            handleLogout={handleLogout}
            handleDashboardClick={handleDashboardClick}
            dashboardLoading={dashboardLoading}
            guestId={guestId}
            userId={user?.id}
            loadChatActivity={loadChatActivity}
            addChatActivity={addChatActivity}
          />
          </div>
        </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden border-t py-4">
              <SearchBar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                handleSearch={handleSearch}
                autoFocus
              />
            </div>
          )}
      </div>
    </nav>
  )
}
