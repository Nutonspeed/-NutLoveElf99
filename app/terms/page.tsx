import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LegalAccordion } from "@/components/LegalAccordion"
import { terms, loadTerms } from "@/lib/mock-terms"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6 text-center">เงื่อนไขการใช้งาน</h1>
        <LegalAccordion items={terms} loader={loadTerms} />
      </div>
      <Footer />
    </div>
  )
}
