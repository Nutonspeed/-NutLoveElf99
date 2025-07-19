"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/buttons/button";
import { Input } from "@/components/ui/inputs/input";
import { updateReturnStatus } from "@/lib/mock-returns";

export default function RefundPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [date, setDate] = useState("");

  if (!id) {
    return <div className="container mx-auto py-8">ไม่พบคำขอ</div>;
  }

  const handleSubmit = () => {
    updateReturnStatus(id, "refunded", `refund ${amount}`);
    router.push("/dashboard/returns");
  };

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">ทำรายการคืนเงิน</h1>
      <Input
        placeholder="ยอด"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Input
        placeholder="ช่องทาง"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      />
      <Input
        placeholder="วันที่โอน"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Button onClick={handleSubmit}>ทำรายการคืนเงิน</Button>
    </div>
  );
}
