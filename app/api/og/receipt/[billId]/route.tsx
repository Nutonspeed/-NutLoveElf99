import { ImageResponse, NextResponse } from "next/server";
import { getBills } from "@/core/mock/store";

export const runtime = "edge";

export function GET(req: Request, { params }: { params: { billId: string } }) {
  const bill = getBills().find((b) => b.id === params.billId);
  if (!bill) {
    const url = new URL("/placeholder.jpg", req.url);
    return NextResponse.redirect(url);
  }

  const total =
    bill.items.reduce((s, it) => s + it.price * it.quantity, 0) +
    (bill.shipping || 0) -
    (bill.discount || 0);
  const date = new Date(bill.createdAt).toLocaleDateString("th-TH");

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          color: "#000",
          background: "#fff",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
        }}
      >
        <div>Receipt #{bill.id}</div>
        <div>{date}</div>
        <div style={{ fontSize: 64, fontWeight: "bold", marginTop: 20 }}>
          ฿{total.toFixed(2)}
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
