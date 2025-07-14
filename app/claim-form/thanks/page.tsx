import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'

export default function ClaimThanksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-8">
        <h1 className="text-2xl font-bold text-center">ขอบคุณสำหรับการแจ้งเคลม</h1>
      </div>
      <Footer />
    </div>
  )
}
