import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FaqAccordion } from "@/components/FaqAccordion"
import { SmartReply } from "@/components/SmartReply"

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6 text-center">คำถามที่พบบ่อย</h1>
        <FaqAccordion />
      </div>
      <div className="container mx-auto px-4 py-8">
        <SmartReply />
      </div>
      <Footer />
    </div>
  )
}
