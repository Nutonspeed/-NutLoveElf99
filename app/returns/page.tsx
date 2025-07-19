import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 space-y-4">
        <h1 className="text-3xl font-bold text-center">การคืนสินค้า</h1>
        <p>ขั้นตอนการคืนสินค้าและขอเงินคืนสามารถทำได้ผ่านแบบฟอร์มนี้ในอนาคต</p>
      </div>
      <Footer />
    </div>
  )
}
