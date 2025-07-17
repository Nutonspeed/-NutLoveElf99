"use client"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/modals/sheet"
import { Button } from "@/components/ui/buttons/button"
import { Search, Menu, Settings, LogOut } from "lucide-react"
import { Input } from "@/components/ui/inputs/input"

interface NavItem {
  name: string
  href: string
}

interface UserMenuItem extends NavItem {
  icon: React.ComponentType<{ className?: string }>
}

interface MobileMenuProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  loading: boolean
  handleOpen: () => void
  searchQuery: string
  setSearchQuery: (value: string) => void
  handleSearch: (e: React.FormEvent) => void
  navigation: NavItem[]
  userMenuItems: UserMenuItem[]
  isAuthenticated: boolean
  isAdmin: boolean
  handleLogout: () => void
  handleDashboardClick: (e: React.MouseEvent<HTMLAnchorElement>) => void
  dashboardLoading: boolean
  guestId?: string
  userId?: string
  loadChatActivity: () => void
  addChatActivity: (id: string, action: string) => void
}

export function MobileMenu({
  open,
  onOpenChange,
  loading,
  handleOpen,
  searchQuery,
  setSearchQuery,
  handleSearch,
  navigation,
  userMenuItems,
  isAuthenticated,
  isAdmin,
  handleLogout,
  handleDashboardClick,
  dashboardLoading,
  guestId,
  userId,
  loadChatActivity,
  addChatActivity,
}: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={handleOpen}
          disabled={loading}
        >
          {loading ? (
            <span className="text-xs">กำลังโหลด...</span>
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="flex flex-col space-y-4 mt-8">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="ค้นหาสินค้า..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </form>

          <div className="space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {isAuthenticated && (
            <>
              <div className="border-t pt-4 space-y-2">
                {userMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => {
                      if (item.href === "/chat") {
                        loadChatActivity()
                        addChatActivity(userId || guestId!, "open_chat")
                      }
                    }}
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>

              {isAdmin && (
                <div className="border-t pt-4">
                  <Link
                    href="/admin/dashboard"
                    onClick={handleDashboardClick}
                    className="flex items-center px-3 py-2 text-sm font-medium rounded-md hover:bg-accent"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    {dashboardLoading ? "กำลังโหลด..." : "ระบบจัดการ"}
                  </Link>
                </div>
              )}

              <div className="border-t pt-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-3 py-2 text-sm font-medium rounded-md hover:bg-accent text-red-600"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  ออกจากระบบ
                </button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
