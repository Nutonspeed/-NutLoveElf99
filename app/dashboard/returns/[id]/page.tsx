"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/buttons/button";
import { Textarea } from "@/components/ui/textarea";
import {
  loadReturns,
  mockReturns,
  updateReturnStatus,
  addReturnComment,
} from "@/lib/mock-returns";

export default function ReturnReviewPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [req, setReq] = useState(() =>
    mockReturns.find((r) => r.id === params.id),
  );
  const [comment, setComment] = useState("");

  useEffect(() => {
    loadReturns();
    setReq(mockReturns.find((r) => r.id === params.id));
  }, [params.id]);

  if (!req) {
    return <div className="container mx-auto py-8">ไม่พบคำขอ</div>;
  }

  const handleUpdate = (status: any) => {
    updateReturnStatus(req.id, status, comment);
    router.push("/dashboard/returns");
  };

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">ตรวจสอบคำขอ {req.id}</h1>
      <p>Order: {req.orderId}</p>
      <p>Customer: {req.customerName}</p>
      <p>Reason: {req.reason}</p>
      <Textarea
        placeholder="เพิ่มคอมเมนต์"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className="space-x-2">
        <Button onClick={() => handleUpdate("approved")}>อนุมัติ</Button>
        <Button variant="outline" onClick={() => handleUpdate("rejected")}>
          ปฏิเสธ
        </Button>
        <Button variant="outline" onClick={() => handleUpdate("infoRequested")}>
          ขอข้อมูลเพิ่ม
        </Button>
      </div>
      <div className="space-y-2">
        {req.comments.map((c, idx) => (
          <p key={idx} className="text-sm text-muted-foreground">
            {new Date(c.date).toLocaleString()} - {c.text}
          </p>
        ))}
      </div>
    </div>
  );
}
