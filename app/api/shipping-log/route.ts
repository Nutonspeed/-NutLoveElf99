import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { saveUndo } from "@/lib/undoStore";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const file = path.join(process.cwd(), "mock/store/shipping-log.json");
  let logs: any[] = [];
  try {
    const text = await fs.readFile(file, "utf8");
    logs = JSON.parse(text);
  } catch {}
  logs.push({ ...data });
  await fs.writeFile(file, JSON.stringify(logs, null, 2), "utf8");
  await saveUndo({
    type: "shipping-export",
    payload: { timestamp: data.timestamp },
  });
  return NextResponse.json({ success: true });
}
