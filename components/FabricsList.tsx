"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/buttons/button";
import { useCompare } from "@/contexts/compare-context";
import { mockCoViewLog } from "@/lib/mock-co-view-log";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";

interface Fabric {
  id: string;
  slug: string | null;
  name: string;
  sku?: string | null;
  image_url?: string | null;
  image_urls?: string[] | null;
}

export function FabricsList({
  fabrics,
  selectable = false,
  redirectTo,
}: {
  fabrics: Fabric[];
  selectable?: boolean;
  redirectTo?: string;
}) {
  const { items, toggleCompare } = useCompare();
  const router = useRouter();
  const { toast } = useToast();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("selectedFabric");
    if (stored) {
      try {
        const obj = JSON.parse(stored) as { id: string };
        setSelectedId(obj.id);
      } catch {
        setSelectedId(stored);
      }
    }
  }, []);

  const handleCompare = () => {
    router.push(`/compare`);
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {fabrics.map((fabric) => {
          const slug = fabric.slug || fabric.id;
          const checked = items.includes(slug);
          const coViewed = mockCoViewLog[slug]?.length;
          return (
            <div
              key={slug}
              className={`border rounded-lg overflow-hidden bg-white hover:shadow transition relative ${selectedId === fabric.id ? "ring-2 ring-primary" : ""}`}
            >
              {coViewed && (
                <span className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded">
                  ดูด้วยกันบ่อย
                </span>
              )}
              <Checkbox
                checked={checked}
                onCheckedChange={() => toggleCompare(slug)}
                className="absolute top-2 left-2 z-10 bg-white/80"
              />
              <div className="relative">
                {selectedId === fabric.id && (
                  <CheckCircle className="absolute bottom-2 right-2 z-10 text-green-500 h-5 w-5" />
                )}
                <Link href={`/fabrics/${slug}`}>
                  <div className="relative aspect-square">
                    <Image
                      src={
                        fabric.image_urls?.[0] ||
                        fabric.image_url ||
                        "/placeholder.svg"
                      }
                      alt={fabric.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </Link>
              </div>
              <div className="p-2 text-center space-y-2">
                <Link href={`/fabrics/${slug}`} className="block">
                  <p className="font-medium line-clamp-2">{fabric.name}</p>
                </Link>
                {selectable && (
                  <Button
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => {
                      const obj = {
                        id: fabric.id,
                        code: fabric.sku || (fabric as any).code || "",
                        name: fabric.name,
                        image:
                          fabric.image_urls?.[0] ||
                          fabric.image_url ||
                          "/placeholder.svg",
                      };
                      localStorage.setItem(
                        "selectedFabric",
                        JSON.stringify(obj),
                      );
                      setSelectedId(fabric.id);
                      if (redirectTo) {
                        router.push(redirectTo);
                      } else {
                        toast({
                          title: "เลือกลายผ้าแล้ว! กลับไปสร้างบิลต่อได้เลย",
                        });
                      }
                    }}
                  >
                    เลือกผ้านี้
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {items.length > 1 && (
        <div className="mt-4 text-center">
          <Button onClick={handleCompare}>เปรียบเทียบตอนนี้</Button>
        </div>
      )}
    </>
  );
}
