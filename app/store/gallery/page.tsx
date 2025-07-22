"use client";
import { useState, useEffect } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";
import ModalWrapper from "@/components/ui/ModalWrapper";

export async function generateMetadata(): Promise<Metadata> {
  const title = "แกลเลอรี่สินค้า | SofaCover Pro";
  const description = "รวมตัวอย่างสินค้าผ้าคลุมโซฟาของเรา";
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: "/placeholder.jpg" }] },
  };
}

interface Prod {
  id: string;
  name: string;
  type: string;
  colors: string[];
  material: string;
  image: string;
  description: string;
}

export default function GalleryPage() {
  const [products, setProducts] = useState<Prod[]>([]);
  const [type, setType] = useState("all");
  const [color, setColor] = useState("all");
  const [material, setMaterial] = useState("all");
  const [view, setView] = useState<Prod | null>(null);

  useEffect(() => {
    fetch("/mock/store/products.json")
      .then((r) => r.json())
      .then(setProducts);
  }, []);

  const filtered = products.filter(
    (p) =>
      (type === "all" || p.type === type) &&
      (color === "all" || p.colors.includes(color)) &&
      (material === "all" || p.material === material),
  );
  const types = Array.from(new Set(products.map((p) => p.type)));
  const colors = Array.from(new Set(products.flatMap((p) => p.colors)));
  const materials = Array.from(new Set(products.map((p) => p.material)));

  const ld = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: filtered.map((p, i) => ({
      "@type": "Product",
      position: i + 1,
      name: p.name,
      image: p.image,
      offers: { "@type": "Offer", price: 0, priceCurrency: "THB" },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col theme-soft-blush">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Product Gallery</h1>
        <div className="flex flex-wrap gap-4 justify-center mb-6">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border rounded p-1"
          >
            <option value="all">All Types</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="border rounded p-1"
          >
            <option value="all">All Colors</option>
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="border rounded p-1"
          >
            <option value="all">All Materials</option>
            {materials.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setView(p)}
              className="focus:outline-none"
            >
              <Image
                src={p.image}
                alt={p.name}
                width={300}
                height={300}
                className="w-full h-40 object-cover"
              />
              <p className="text-center mt-2 text-sm">{p.name}</p>
            </button>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      </div>
      <Footer />
      <ModalWrapper open={!!view} onClose={() => setView(null)}>
        {view && (
          <div className="space-y-4">
            <Image
              src={view.image}
              alt={view.name}
              width={600}
              height={600}
              className="w-full h-auto"
            />
            <h2 className="font-semibold">{view.name}</h2>
            <p className="text-sm text-gray-600">{view.description}</p>
          </div>
        )}
      </ModalWrapper>
    </div>
  );
}
