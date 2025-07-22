"use client";
import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Input } from "@/components/ui/inputs/input";
import { Button } from "@/components/ui/buttons/button";
import Link from "next/link";

export default function LoyaltyPage() {
  const [phone, setPhone] = useState("");
  const [points, setPoints] = useState<number | null>(null);

  const check = () => {
    const p = phone.trim();
    if (!p) return;
    const value = p.endsWith("0") ? 100 : 20;
    setPoints(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">ระบบสะสมแต้ม</h1>
        <p>ซื้อสินค้าครบทุก 100 บาท รับ 1 แต้ม นำมาแลกส่วนลดได้</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            check();
          }}
          className="flex gap-2"
        >
          <Input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="กรอกเบอร์โทร"
          />
          <Button type="submit">ตรวจสอบ</Button>
        </form>
        {points !== null && <p>คุณมี {points} แต้ม</p>}
        <Link href="/review" className="underline text-blue-600">
          รีวิวสินค้าเพื่อรับแต้มเพิ่ม
        </Link>
      </main>
      <Footer />
    </div>
  );
}
