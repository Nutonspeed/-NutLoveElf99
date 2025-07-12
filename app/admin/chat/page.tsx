"use client"

import { useEffect } from "react";

export default function AdminChatPage() {
  useEffect(() => {
    window.open("http://localhost:3000", "_blank");
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>กำลังเปิดหน้าต่างแชท...</p>
    </div>
  );
}
