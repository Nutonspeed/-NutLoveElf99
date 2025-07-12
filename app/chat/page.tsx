"use client"

import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function ChatPage() {
  useEffect(() => {
    window.open("http://localhost:3000", "_blank");
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <p>กำลังเปิดหน้าต่างแชท...</p>
      </div>
      <Footer />
    </div>
  );
}
