import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/buttons/button";
import { Card, CardContent } from "@/components/ui/cards/card";
import { Badge } from "@/components/ui/badge";
import { Star, Shield, Truck, Headphones, ArrowRight } from "lucide-react";
import Link from "next/link";
import LazyImage from "@/components/LazyImage";
import PrefetchLink from "@/components/PrefetchLink";
import { HeroBannerSection } from "@/components/HeroBannerSection";
import { mockProducts } from "@/lib/mock-products";
import { getCollections } from "@/lib/mock-collections";
import type { Collection } from "@/types/collection";
import { RecentProductsSection } from "@/components/RecentProductsSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SofaCover Pro - ผ้าคลุมโซฟาคุณภาพพรีเมียม",
  description: "ซื้อผ้าคลุมโซฟาออนไลน์และอุปกรณ์เสริม",
  openGraph: {
    title: "SofaCover Pro",
    description: "ซื้อผ้าคลุมโซฟาออนไลน์และอุปกรณ์เสริม",
  },
};

export default async function HomePage() {
  const featuredProducts = mockProducts.slice(0, 4);
  const curatedProducts = mockProducts.filter((p) => p.curated).slice(0, 4);
  const collections: Collection[] = (await getCollections()).slice(0, 4);
  const ld = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SofaCover Pro",
    url: "https://example.com",
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <HeroBannerSection />

      {curatedProducts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Curated Picks</h2>
              <p className="text-gray-600">
                สินค้าที่คัดสรรมาเป็นพิเศษสำหรับคุณ
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {curatedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-0">
                    <PrefetchLink href={`/products/${product.slug}`}>
                      <div className="relative overflow-hidden rounded-t-lg">
                        <LazyImage
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          width={300}
                          height={300}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 space-y-2">
                        <h3 className="font-semibold text-lg line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-primary">
                            ฿{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ฿{product.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </PrefetchLink>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">ทำไมต้องเลือกเรา?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              เราให้บริการที่ดีที่สุดและผลิตภัณฑ์คุณภาพสูงเพื่อความพึงพอใจของลูกค้า
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg">คุณภาพรับประกัน</h3>
              <p className="text-gray-600 text-sm">
                ผลิตภัณฑ์คุณภาพสูง รับประกัน 2 ปี
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Truck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-lg">จัดส่งฟรี</h3>
              <p className="text-gray-600 text-sm">
                จัดส่งฟรีทั่วประเทศ สั่งซื้อขั้นต่ำ 1,500 บาท
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                <Headphones className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg">บริการ 24/7</h3>
              <p className="text-gray-600 text-sm">
                ทีมงานพร้อมให้คำปรึกษาตลอด 24 ชั่วโมง
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                <Star className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-lg">รีวิว 5 ดาว</h3>
              <p className="text-gray-600 text-sm">
                ความพึงพอใจของลูกค้ามากกว่า 98%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">คอลเลกชันแนะนำ</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {collections.map((col) => (
              <Link
                key={col.slug}
                href={`/collections/${col.slug}`}
                className="border rounded-lg overflow-hidden bg-white hover:shadow transition"
              >
                <div className="relative w-full h-40">
                  <LazyImage
                    src={col.images[0] || "/placeholder.svg"}
                    alt={col.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-base truncate">
                    {col.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{col.priceRange}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/collections">
              <Button variant="outline" size="lg">
                ดูทั้งหมด
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">สินค้าแนะนำ</h2>
            <p className="text-gray-600">
              สินค้าคุณภาพสูงที่ได้รับความนิยมจากลูกค้า
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card
                key={product.id}
                className="group hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <LazyImage
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.originalPrice && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        ลด{" "}
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100,
                        )}
                        %
                      </Badge>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg line-clamp-2">
                      {product.name}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({product.reviews})
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-primary">
                        ฿{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ฿{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <PrefetchLink href={`/products/${product.slug}`}>
                      <Button className="w-full mt-4">ดูรายละเอียด</Button>
                    </PrefetchLink>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline">
                ดูสินค้าทั้งหมด
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <RecentProductsSection />

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            พร้อมที่จะเปลี่ยนโฉมโซฟาของคุณแล้วหรือยัง?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            เริ่มต้นการช้อปปิ้งกับเราวันนี้ และรับส่วนลด 10%
            สำหรับการสั่งซื้อครั้งแรก
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100"
              >
                เริ่มช้อปปิ้ง
              </Button>
            </Link>
            <Link href="/chat">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
              >
                ปรึกษาผู้เชี่ยวชาญ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
      <Footer />
    </div>
  );
}
