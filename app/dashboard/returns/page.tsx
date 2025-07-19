"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { loadReturns, mockReturns } from "@/lib/mock-returns";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export default function ReturnsSummaryPage() {
  const [status, setStatus] = useState("all");
  const [list, setList] = useState(mockReturns);

  useEffect(() => {
    loadReturns();
    setList([...mockReturns]);
  }, []);

  const filtered = list.filter((r) => status === "all" || r.status === status);

  const reasonStats = list.reduce<Record<string, number>>((acc, r) => {
    acc[r.reason] = (acc[r.reason] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.entries(reasonStats).map(([reason, count]) => ({
    reason,
    count,
  }));

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">คำขอคืน/เปลี่ยนสินค้า</h1>
      <div className="flex items-center space-x-2">
        <span className="text-sm">สถานะ:</span>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">ทั้งหมด</SelectItem>
            <SelectItem value="pending">pending</SelectItem>
            <SelectItem value="approved">approved</SelectItem>
            <SelectItem value="rejected">rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {filtered.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.id}</TableCell>
                <TableCell>{r.orderId}</TableCell>
                <TableCell>{r.customerName}</TableCell>
                <TableCell>{r.status}</TableCell>
                <TableCell className="text-right">
                  <Link href={`/dashboard/returns/${r.id}`}>ดู</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-muted-foreground">ไม่มีคำขอ</p>
      )}
      {chartData.length > 0 && (
        <ChartContainer
          className="h-60"
          config={{ r: { color: "hsl(260,80%,60%)" } }}
        >
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="reason" />
            <YAxis allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="count" fill="var(--color-r)" />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  );
}
