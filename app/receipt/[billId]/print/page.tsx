import ReceiptLayout from "@/components/receipt/ReceiptLayout";
import ReceiptPrintLayout from "@/components/receipt/ReceiptPrintLayout";
import { getBills } from "@/core/mock/store";

export default function ReceiptPrintPage({
  params,
}: {
  params: { billId: string };
}) {
  const bill = getBills().find((b) => b.id === params.billId);
  if (!bill) {
    return <div className="p-4 text-center">ไม่พบใบเสร็จ</div>;
  }
  return (
    <div className="p-4 print:p-0">
      <ReceiptPrintLayout>
        <ReceiptLayout bill={bill as any} />
      </ReceiptPrintLayout>
    </div>
  );
}
