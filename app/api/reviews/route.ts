import { NextRequest, NextResponse } from "next/server";
import { addReview, listReviews } from "@/lib/reviewStore";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const orderId = url.searchParams.get("orderId") || undefined;
  const list = await listReviews(orderId);
  return NextResponse.json({ success: true, reviews: list });
}

export async function POST(req: NextRequest) {
  const data = (await req.json().catch(() => ({}))) as {
    orderId?: string;
    rating?: number;
    comment?: string;
    photo?: string;
  };
  if (!data.orderId || !data.rating) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  const ok = await addReview({
    orderId: data.orderId,
    rating: Number(data.rating),
    comment: data.comment || "",
    photo: data.photo,
  });
  if (!ok)
    return NextResponse.json(
      { success: false, duplicate: true },
      { status: 400 },
    );
  return NextResponse.json({ success: true });
}
