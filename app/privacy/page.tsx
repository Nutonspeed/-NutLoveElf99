import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LegalAccordion } from "@/components/LegalAccordion"
import { privacy, loadPrivacy } from "@/lib/mock-privacy"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6 text-center">นโยบายความเป็นส่วนตัว</h1>
        <LegalAccordion items={privacy} loader={loadPrivacy} />
      </div>
      <Footer />
    </div>
  )
}
