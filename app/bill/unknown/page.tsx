import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BillUnknown() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">ไม่พบบิลนี้ในระบบ</h1>
        <Link href="/">
          <Button>กลับสู่หน้าหลัก</Button>
        </Link>
      </div>
    </div>
  )
}
