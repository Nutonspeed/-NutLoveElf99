import ReceiptPageClient from "./ReceiptPageClient";
import { getBills } from "@/core/mock/store";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { billId: string };
}): Promise<Metadata> {
  const bill = getBills().find((b) => b.id === params.billId);
  if (!bill) return { title: "ไม่พบใบเสร็จ" };
  const title = `ใบเสร็จ ${bill.id}`;
  const description = "ใบเสร็จคำสั่งซื้อของคุณ";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: `/api/og/receipt/${bill.id}` }],
    },
  };
}

export default function ReceiptPage({
  params,
}: {
  params: { billId: string };
}) {
  const bill = getBills().find((b) => b.id === params.billId);
  if (!bill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        ไม่พบใบเสร็จ
      </div>
    );
  }
  const meta = {
    title: `ใบเสร็จ ${bill.id}`,
    description: "ใบเสร็จคำสั่งซื้อของคุณ",
    image: `/api/og/receipt/${bill.id}`,
  };
  return <ReceiptPageClient bill={bill} meta={meta} />;
}
