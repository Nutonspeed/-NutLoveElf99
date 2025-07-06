"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface Collection {
  id: string
  name: string
  slug: string
  cover_image_url: string | null
}

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCollections = async () => {
      if (!supabase) {
        setError("Supabase client not configured")
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("collections")
        .select("id, name, slug, cover_image_url")

      if (error) {
        setError("ไม่สามารถโหลดข้อมูลคอลเลกชันได้")
      } else {
        setCollections(data || [])
      }
      setLoading(false)
    }

    fetchCollections()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1">
        <h1 className="text-3xl font-bold mb-6">คอลเลกชันลายผ้า</h1>
        {collections.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {collections.map((collection: Collection) => (
              <Link
                key={collection.id}
                href={`/collections/${collection.slug}`}
                className="border rounded-lg overflow-hidden hover:shadow transition bg-white"
              >
                <div className="relative w-full h-40 md:h-48">
                  <Image
                    src={collection.cover_image_url || "/placeholder.svg"}
                    alt={collection.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-3 md:p-4">
                  <h3 className="font-semibold text-sm md:text-base truncate">
                    {collection.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">ไม่มีคอลเลกชันให้แสดง</p>
        )}
      </div>
      <Footer />
    </div>
  )
}
