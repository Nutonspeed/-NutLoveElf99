"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useBillStore } from "@/core/store";
import billDetails from "@/mock/bill.detail.json";
import { Button } from "@/components/ui/buttons/button";

function escapeCSV(v: string | number | undefined) {
  const s = v === undefined || v === null ? "" : String(v);
  return '"' + s.replace(/"/g, '""') + '"';
}

export default function ShippingExportPage() {
  const store = useBillStore();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const details = billDetails as any[];
  const exportCSV = async () => {
    const rows = selected.map((id) => {
      const bill = store.bills.find((b) => b.id === id);
      const detail = details.find((d: any) => d.id === id);
      return [
        detail?.customer.name,
        detail?.customer.address,
        detail?.customer.phone,
        id,
        bill?.shippingMethod,
      ];
    });
    const header = ["Name", "Address", "Phone", "OrderID", "ShippingType"];
    const csv = [header, ...rows]
      .map((r) => r.map(escapeCSV).join(","))
      .join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "shipping.csv";
    a.click();
    URL.revokeObjectURL(url);
    const ts = new Date().toISOString();
    await fetch("/api/shipping-log", {
      method: "POST",
      body: JSON.stringify({ ids: selected, timestamp: ts }),
    });
    await fetch("/api/undo/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "shipping-export",
        payload: { timestamp: ts },
      }),
    });
    toast("Exported", {
      action: {
        label: "Undo",
        onClick: async () => {
          await fetch("/api/undo", { method: "POST" });
          location.reload();
        },
      },
    });
  };

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">Export Shipping CSV</h1>
      <div className="space-y-2">
        {store.bills.map((b) => (
          <label key={b.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(b.id)}
              onChange={() => toggle(b.id)}
            />
            {b.id} – {b.customer}
          </label>
        ))}
      </div>
      {selected.length > 0 && <Button onClick={exportCSV}>Export CSV</Button>}
    </div>
  );
}
