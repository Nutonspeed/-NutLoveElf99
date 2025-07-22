import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { mockProducts } from "@/lib/mock-products";

export async function generateMetadata(): Promise<Metadata> {
  const title = "แกลเลอรี่สินค้า | SofaCover Pro";
  const description = "รวมตัวอย่างสินค้าผ้าคลุมโซฟาของเรา";
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: "/placeholder.jpg" }] },
  };
}

export default function GalleryPage() {
  const data = mockProducts.slice(0, 8);
  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: data.map((p, i) => ({
      "@type": "Product",
      position: i + 1,
      name: p.name,
      image: p.images[0],
      offers: { "@type": "Offer", price: p.price, priceCurrency: "THB" },
    })),
  };
  return (
    <div className="min-h-screen theme-soft-blush">
      <Navbar />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">แกลเลอรี่สินค้า</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((p) => (
            <img
              key={p.id}
              src={p.images[0]}
              alt={p.name}
              className="rounded"
            />
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      </main>
      <Footer />
    </div>
  );
}
