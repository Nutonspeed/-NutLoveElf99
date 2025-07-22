import type { Metadata } from "next";
import { promises as fs } from "fs";
import { join } from "path";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export async function generateMetadata(): Promise<Metadata> {
  const title = "ศูนย์ช่วยเหลือ | SofaCover Pro";
  const description = "ติดต่อสอบถามปัญหาการสั่งซื้อและการใช้งาน";
  return {
    title,
    description,
    openGraph: { title, description, images: [{ url: "/placeholder.jpg" }] },
  };
}

async function loadFaqs() {
  try {
    const txt = await fs.readFile(
      join(process.cwd(), "mock/store/faqs.json"),
      "utf8",
    );
    return JSON.parse(txt) as { q: string; a: string }[];
  } catch {
    return [];
  }
}

export default async function SupportPage() {
  const faqs = await loadFaqs();
  return (
    <div className="min-h-screen flex flex-col theme-soft-blush">
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-8 flex-1">
        <h1 className="text-3xl font-bold text-center">Customer Support</h1>
        <section className="grid md:grid-cols-2 gap-6">
          {faqs.map((f, i) => (
            <div key={i} className="border rounded-lg p-4 bg-white shadow-sm">
              <h3 className="font-semibold mb-2">{f.q}</h3>
              <p className="text-gray-600 text-sm">{f.a}</p>
            </div>
          ))}
        </section>
        <section className="text-center space-y-2">
          <h2 className="text-2xl font-semibold">Contact Us</h2>
          <p>LINE: @sofacover</p>
          <p>Facebook: facebook.com/sofacover</p>
          <p>Phone: 02-123-4567</p>
          <iframe
            className="w-full h-64 border rounded"
            loading="lazy"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.89784833414!2d100.5231863152806!3d13.736717401240736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2992c258e4cdd%3A0xa2b08f8ff21fbefd!2sGrand%20Palace!5e0!3m2!1sen!2sth!4v1718100000000!5m2!1sen!2sth"
            allowFullScreen
          />
        </section>
      </div>
      <Footer />
    </div>
  );
}
