"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card";

export interface CampaignReport {
  slug: string;
  clicks: number;
  bills: number;
}

export default function CampaignReportCard({
  report,
}: {
  report: CampaignReport;
}) {
  const conversion =
    report.clicks === 0 ? 0 : ((report.bills / report.clicks) * 100).toFixed(2);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{report.slug}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-1 text-sm">
        <p>ยอดคลิก: {report.clicks}</p>
        <p>บิลสำเร็จ: {report.bills}</p>
        <p>Conversion: {conversion}%</p>
      </CardContent>
    </Card>
  );
}
