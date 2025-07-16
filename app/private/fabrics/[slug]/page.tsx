import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FabricsList } from "@/components/FabricsList"
import { mockFabrics } from "@/lib/mock-fabrics"
import { isValidPrivateSlug } from "@/lib/private-view-link"

export default function PrivateFabricsPage({ params }: { params: { slug: string } }) {
  const valid = isValidPrivateSlug(params.slug)
  if (!valid) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        ลิงก์ไม่สามารถใช้งานได้
      </div>
    )
  }
  const fabrics = mockFabrics.filter(f => f.tags?.includes('internal') || f.tags?.includes('exclusive'))
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">ลายผ้าสำหรับกลุ่มปิด</h1>
        <FabricsList fabrics={fabrics} />
      </div>
      <Footer />
    </div>
  )
}
