"use client";
import { useState } from "react";
import Link from "next/link";
import bills from "@/mock/store/bills.json";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/inputs/input";
import { Button } from "@/components/ui/buttons/button";

interface Bill {
  id: string;
  customer: string;
  createdAt: string;
}

export default function OrderHistoryPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Bill[]>([]);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().toLowerCase();
    const list = (bills as Bill[]).filter(
      (b) =>
        b.customer.toLowerCase().includes(q) || b.id.toLowerCase().includes(q),
    );
    setResults(list);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">ประวัติการสั่งซื้อ</h1>
        <form onSubmit={search} className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาด้วยชื่อ เบอร์ หรืออีเมล"
          />
          <Button type="submit">ค้นหา</Button>
        </form>
        <div className="space-y-2">
          {results.map((b) => (
            <div key={b.id} className="border p-3 rounded">
              <div className="font-medium">{b.customer}</div>
              <div className="text-sm text-gray-600">
                {new Date(b.createdAt).toLocaleDateString()}
              </div>
              <div className="space-x-3 mt-1">
                <Link
                  href={`/receipt/${b.id}`}
                  className="underline text-blue-600"
                >
                  ใบเสร็จ
                </Link>
                <Link
                  href={`/tracking/${b.id}`}
                  className="underline text-blue-600"
                >
                  ติดตามสินค้า
                </Link>
                <Link
                  href={`/review/${b.id}`}
                  className="underline text-blue-600"
                >
                  รีวิวสินค้า
                </Link>
              </div>
            </div>
          ))}
          {results.length === 0 && (
            <p className="text-sm text-gray-500">ไม่พบรายการ</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
