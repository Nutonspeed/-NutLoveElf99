"use client";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/buttons/button";

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="space-y-6 text-center">
          <h1 className="text-2xl font-bold">ขอบคุณสำหรับการสั่งซื้อ!</h1>
          <Link href="/orders">
            <Button>ดูคำสั่งซื้อทั้งหมด</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
