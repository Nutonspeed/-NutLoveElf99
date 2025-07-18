import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/buttons/button"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { supabase } from "@/lib/supabase"
import { getCollections } from "@/lib/mock-collections"
import { WishlistButton } from "@/components/WishlistButton"
import { fabrics } from "@/lib/mock-fabrics"
import { FabricsList } from "@/components/FabricsList"
import { CopyPageLinkButton } from "@/components/CopyPageLinkButton"
import { CollectionStickyBar } from "@/components/CollectionStickyBar"
import { mockFabricReviews } from "@/lib/mock/fabricReviews"
import { Star } from "lucide-react"

export default async function CollectionDetailPage({ params }: { params: { slug: string } }) {
  let data: any

  if (!supabase) {
    const collections = await getCollections()
    data = collections.find((c) => c.slug === params.slug)
    if (!data) {
      return (
        <div className="text-center text-destructive">ไม่พบคอลเลกชันนี้ในระบบ</div>
      )
    }
  } else {
    const { data: dbData, error } = await supabase
      .from("collections")
      .select("id, name, slug, price_range, description, all_images")
      .eq("slug", params.slug)
      .single()

    if (error || !dbData) {
      return (
        <div className="text-center text-destructive">ไม่พบคอลเลกชันนี้ในระบบ</div>
      )
    }

    data = {
      id: dbData.id,
      name: dbData.name,
      slug: dbData.slug,
      priceRange: dbData.price_range,
      description: dbData.description,
      images: dbData.all_images || [],
    }
  }

  const filtered = fabrics.filter((f) => f.collectionSlug === data.slug)
  const reviews = mockFabricReviews.filter((r) =>
    filtered.some((f) => f.id === r.fabricId),
  )
  const subtitle = `มีทั้งหมด ${filtered.length} ลายผ้าในกลุ่มนี้`

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 flex-1 space-y-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">หน้าแรก</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/collections">คอลเลกชัน</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{data.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <WishlistButton slug={data.slug} />
        </div>
        <p className="text-gray-700">{subtitle}</p>
        {data.description && (
          <p className="text-gray-600 whitespace-pre-line">{data.description}</p>
        )}
        <div className="flex items-center gap-2">
          <a
            href={`https://m.me/elfsofacover?text=${encodeURIComponent(
              `สนใจลายผ้า ${data.slug} ครับ`,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm">💬 สอบถามผ่าน Facebook</Button>
          </a>
          <CopyPageLinkButton />
        </div>
        <FabricsList fabrics={fabrics} />
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">รีวิวจากลูกค้าที่สั่งลายนี้</h2>
          {reviews.length === 0 ? (
            <div className="text-center text-muted text-sm">
              ยังไม่มีรีวิวสำหรับลายผ้านี้
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div key={rev.id} className="border rounded p-4 space-y-1">
                  <div className="font-medium">{rev.customerName}</div>
                  <p className="text-sm">{rev.content}</p>
                  <div className="flex items-center text-sm">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < rev.rating
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-2">ให้คะแนน {rev.rating}/5</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
      <CollectionStickyBar name={data.name} />
    </div>
  )
}
