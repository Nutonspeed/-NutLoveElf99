import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "ศูนย์ช่วยเหลือ | SofaCover Pro",
  description: "ติดต่อสอบถามปัญหาการสั่งซื้อและการใช้งาน",
};

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">ศูนย์ช่วยเหลือ</h1>
        <p>
          หากมีคำถามหรือต้องการความช่วยเหลือ สามารถติดต่อทีมงานได้ที่ LINE
          หรือโทร 02-123-4567
        </p>
      </main>
      <Footer />
    </div>
  );
}
