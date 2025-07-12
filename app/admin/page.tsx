"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminIndex() {
  const chatwootUrl =
    process.env.NEXT_PUBLIC_CHATWOOT_URL || "http://localhost:3000";
  return (
    <div className="flex flex-col gap-4 p-4">
      <Button
        variant="default"
        onClick={() => window.open(chatwootUrl, "_blank")}
      >
        แชทลูกค้า (Chatwoot)
      </Button>
      <Link href="/admin/dashboard">
        <Button variant="outline">เข้าสู่แดชบอร์ด</Button>
      </Link>
    </div>
  );
}
