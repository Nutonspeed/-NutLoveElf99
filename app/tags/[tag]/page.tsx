import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FabricsList } from "@/components/FabricsList"
import { mockFabrics } from "@/lib/mock-fabrics"

export default function TagDetailPage({ params }: { params: { tag: string } }) {
  const fabrics = mockFabrics.filter((f) => f.tags.includes(params.tag))
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-4">แท็ก: {params.tag}</h1>
        <FabricsList fabrics={fabrics} />
      </div>
      <Footer />
    </div>
  )
}
