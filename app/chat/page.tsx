"use client"

import { useEffect } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function ChatPage() {
  const chatwootUrl =
    process.env.NEXT_PUBLIC_CHATWOOT_URL || "http://localhost:3000";

  useEffect(() => {
    window.open(chatwootUrl, "_blank");
  }, [chatwootUrl]);

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
