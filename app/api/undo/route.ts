import { NextResponse } from "next/server";
import { loadUndo, clearUndo } from "@/lib/undoStore";
import { restoreBill, softDeleteBill } from "@/lib/deletedBills";
import { readJson, writeJson } from "@/lib/jsonFile";
import { join } from "path";

export async function POST() {
  const entry = await loadUndo();
  if (!entry) return NextResponse.json({ error: "no action" }, { status: 404 });
  if (entry.type === "delete-bill") {
    await restoreBill(entry.payload.id);
  } else if (entry.type === "restore-bill") {
    await softDeleteBill(entry.payload.id);
  } else if (entry.type === "shipping-export") {
    const file = join(process.cwd(), "mock", "store", "shipping-log.json");
    const logs = await readJson<any[]>(file, []);
    const idx = logs.findIndex((l) => l.timestamp === entry.payload.timestamp);
    if (idx !== -1) {
      logs.splice(idx, 1);
      await writeJson(file, logs);
    }
  }
  await clearUndo();
  return NextResponse.json({ success: true });
}
