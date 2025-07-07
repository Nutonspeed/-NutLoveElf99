import { NextResponse } from "next/server"
import { mockNotificationService } from "@/data/mock-notification-service"

export async function GET() {
  try {
    const templates = mockNotificationService.getTemplates()

    return NextResponse.json({
      success: true,
      templates,
    })
  } catch (error) {
    console.error("Notification templates API error:", error)
    return NextResponse.json({ success: false, error: "ไม่สามารถโหลดเทมเพลตได้" }, { status: 500 })
  }
}
