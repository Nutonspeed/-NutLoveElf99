"use client"

import { useEffect } from "react";

export default function AdminChatPage() {
  const chatwootUrl =
    process.env.NEXT_PUBLIC_CHATWOOT_URL || "http://localhost:3000";
  useEffect(() => {
    window.open(chatwootUrl, "_blank");
  }, [chatwootUrl]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>กำลังเปิดหน้าต่างแชท...</p>
    </div>
  );
}
