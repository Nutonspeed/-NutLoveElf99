import { NextRequest, NextResponse } from "next/server";
import { saveUndo } from "@/lib/undoStore";

export async function POST(req: NextRequest) {
  const data = await req.json().catch(() => null);
  if (!data || !data.type) {
    return NextResponse.json({ error: "bad request" }, { status: 400 });
  }
  await saveUndo(data);
  return NextResponse.json({ success: true });
}
