import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center space-y-4 p-8">
        <h1 className="text-2xl font-bold text-center">ขอบคุณสำหรับการสั่งซื้อ</h1>
        <Link href="/store/track-order">
          <Button>ติดตามสถานะออเดอร์</Button>
        </Link>
      </div>
      <Footer />
    </div>
  )
}
