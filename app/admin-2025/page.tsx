"use client"

import { Button } from "@/components/ui/buttons/button"

export default function Admin2025() {
  const chatwootUrl =
    process.env.NEXT_PUBLIC_CHATWOOT_URL || "http://localhost:3000"

  return (
    <div className="p-4">
      <Button
        variant="default"
        size="lg"
        className="h-12"
        onClick={() => window.open(chatwootUrl, "_blank")}
      >
        แชทลูกค้า (Chatwoot)
      </Button>
    </div>
  )
}
