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
import { mockFabrics } from "@/lib/mock-fabrics"
import { FabricsList } from "@/components/FabricsList"
import { CopyPageLinkButton } from "@/components/CopyPageLinkButton"
import { CollectionStickyBar } from "@/components/CollectionStickyBar"

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

  const fabrics = mockFabrics.filter((f) => f.collectionSlug === data.slug)
  const subtitle = `มีทั้งหมด ${fabrics.length} ลายผ้าในกลุ่มนี้`

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
      </div>
      <Footer />
      <CollectionStickyBar name={data.name} />
    </div>
  )
}
