"use client"
import { useIsMobile } from "@/hooks/use-mobile"
import DesktopNav from "./DesktopNav"
import MobileNav from "./MobileNav"

export function Navbar() {
  const isMobile = useIsMobile()
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {isMobile ? <MobileNav /> : <DesktopNav />}
    </nav>
  )
}
export default Navbar
