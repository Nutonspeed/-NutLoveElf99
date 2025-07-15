import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { mockFabrics } from "@/lib/mock-fabrics"

export default function TagsPage() {
  const tags = Array.from(new Set(mockFabrics.flatMap((f) => f.tags)))
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-4">แท็กทั้งหมด</h1>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link key={tag} href={`/tags/${tag}`} className="underline text-primary">
              {tag}
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
