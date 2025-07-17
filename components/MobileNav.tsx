"use client"
import { useState } from "react"
import Link from "next/link"
import { Menu, Search } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/modals/sheet"
import { Input } from "@/components/ui/inputs/input"
import { Button } from "@/components/ui/buttons/button"

export default function MobileNav() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const navigation = [
    { name: "หน้าแรก", href: "/" },
    { name: "สินค้า", href: "/products" },
    { name: "คอลเลกชัน", href: "/collections" },
    { name: "เกี่ยวกับเรา", href: "/about" },
    { name: "ติดต่อเรา", href: "/contact" },
  ]
  return (
    <div className="flex md:hidden h-16 items-center justify-between w-full">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="p-4 space-y-4">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} onClick={() => setOpen(false)} className="block">
                {item.name}
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <form onSubmit={(e) => { e.preventDefault(); if (search) window.location.href=`/search?q=${search}` }} className="flex-1 mx-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหา..."
            className="pl-8"
          />
        </div>
      </form>
    </div>
  )
}
