"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/inputs/input";
import { Textarea } from "@/components/ui/textarea";
import { getOrders } from "@/core/mock/store";
import { addReturnRequest } from "@/lib/mock-returns";
import type { ReturnRequest } from "@/types/return";

export default function OrderExchangePage({
  params,
}: {
  params: { id: string };
}) {
  const order = getOrders().find((o) => o.id === params.id);
  const [reason, setReason] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const [selected, setSelected] = useState<Record<number, boolean>>({});
  const [files, setFiles] = useState<FileList | null>(null);
  const router = useRouter();

  if (!order) {
    return <div className="container mx-auto py-8">ไม่พบคำสั่งซื้อ</div>;
  }

  const handleSubmit = () => {
    const items = order.items
      .filter((_, idx) => selected[idx])
      .map((i) => ({ productName: i.productName, quantity: i.quantity }));
    if (!items.length) return;
    const req: ReturnRequest = {
      id: `RET-${Date.now()}`,
      orderId: order.id,
      customerName: order.customerName,
      type: "exchange",
      items,
      reason,
      newProduct,
      images: files ? Array.from(files).map(() => "mock") : [],
      status: "pending",
      comments: [],
    };
    addReturnRequest(req);
    router.push("/orders");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8 space-y-4">
        <h1 className="text-2xl font-bold">ขอเปลี่ยนสินค้า {order.id}</h1>
        <div className="space-y-2">
          {order.items.map((item, idx) => (
            <label key={idx} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={!!selected[idx]}
                onChange={(e) =>
                  setSelected({ ...selected, [idx]: e.target.checked })
                }
              />
              <span>
                {item.productName} x {item.quantity}
              </span>
            </label>
          ))}
        </div>
        <Textarea
          placeholder="ระบุเหตุผล"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <Input
          placeholder="สินค้าที่ต้องการเปลี่ยนเป็น"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <Input
          type="file"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <Button onClick={handleSubmit}>ส่งคำขอ</Button>
      </div>
      <Footer />
    </div>
  );
}
