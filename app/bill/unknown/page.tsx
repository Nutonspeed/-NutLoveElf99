import Link from "next/link"
import { Button } from "@/components/ui/buttons/button"

export default function BillUnknown() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">ไม่พบคำสั่งซื้อนี้</h1>
        <Link href="/chat">
          <Button>กลับแชท</Button>
        </Link>
      </div>
    </div>
  )
}
