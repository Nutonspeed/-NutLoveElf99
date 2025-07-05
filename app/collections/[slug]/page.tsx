import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default async function CollectionDetailPage({ params }: { params: { slug: string } }) {
  if (!supabase) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-red-500">Supabase client not configured</div>
        <Footer />
      </div>
    )
  }
  const { data: collection, error } = await supabase
    .from('collections')
    .select('id, name, description, slug')
    .eq('slug', params.slug)
    .single()
  if (error || !collection) {
    notFound()
  }
  const { data: fabrics, error: fabricsError } = await supabase
    .from('fabrics')
    .select('*')
    .eq('collection_id', collection!.id)
  if (fabricsError || !fabrics) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-red-500">ไม่สามารถโหลดข้อมูลผ้าได้</div>
        <Footer />
      </div>
    )
  }

  const pageUrl = `https://example.com/collections/${params.slug}`
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{collection!.name}</h1>
        <p className="text-gray-600 mb-8">{collection!.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fabrics.map((fabric) => (
            <div key={fabric.id} className="border rounded-lg overflow-hidden bg-white">
              <div className="relative w-full h-48">
                <Image src={fabric.image_urls[0]} alt={fabric.name} fill className="object-cover" />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-lg">{fabric.name}</h3>
                <p className="text-sm text-gray-600">฿{fabric.price_min.toLocaleString()} - ฿{fabric.price_max.toLocaleString()}</p>
                <div className="flex space-x-2 pt-2">
                  <Link href={`https://m.me/?message=${encodeURIComponent(pageUrl)}`} target="_blank">
                    <Button size="sm">ส่งเข้า Inbox</Button>
                  </Link>
                  <Link href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`} target="_blank">
                    <Button size="sm" variant="outline">แชร์</Button>
                  </Link>
                  <a href={fabric.image_urls[0]} download>
                    <Button size="sm" variant="outline">ดาวน์โหลด</Button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
