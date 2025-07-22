import { NextResponse } from "next/server";
import { getBills } from "@/core/mock/store";
import { syncShippingStatuses } from "@/lib/shippingStatusStore";

export async function POST() {
  const ids = getBills().map((b) => b.id);
  const records = await syncShippingStatuses(ids, "Flash");
  return NextResponse.json({ statuses: records });
}
