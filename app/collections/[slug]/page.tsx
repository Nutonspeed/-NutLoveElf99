import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
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
    .from("collections")
    .select(
      `id, name, description, slug,
      fabrics(id, slug, name, image_url, image_urls, size)`
    )
    .eq("slug", params.slug)
    .single()
  if (error || !collection) {
    notFound()
  }

  const fabrics = (collection as any).fabrics || []
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-2">{collection.name}</h1>
        {collection.description && (
          <p className="text-gray-600 mb-8">{collection.description}</p>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {fabrics.map((fabric: any) => (
            <Link
              key={fabric.id}
              href={`/fabrics/${fabric.slug || fabric.id}`}
              className="border rounded-lg overflow-hidden bg-white hover:shadow transition"
            >
              <div className="relative aspect-square">
                <Image
                  src={fabric.image_urls?.[0] || fabric.image_url || "/placeholder.svg"}
                  alt={fabric.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 md:p-4">
                <h3 className="font-medium text-sm md:text-base line-clamp-2">
                  {fabric.name}
                </h3>
                {fabric.size && (
                  <p className="text-xs text-gray-600 mt-1">{fabric.size}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
