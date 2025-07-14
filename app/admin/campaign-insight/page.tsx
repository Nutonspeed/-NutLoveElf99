"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/cards/card";
import Link from "next/link";
import { Button } from "@/components/ui/buttons/button";
import { ArrowLeft } from "lucide-react";
import { loadCampaignReports, mockCampaignReports } from "@/lib/mock-campaigns";
import CampaignReportCard from "@/components/CampaignReportCard";

export default function CampaignInsightPage() {
  const [reports, setReports] = useState(mockCampaignReports);
  useEffect(() => {
    loadCampaignReports();
    setReports([...mockCampaignReports]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin/dashboard">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Campaign Insight</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports.map((r, idx) => (
            <CampaignReportCard key={idx} report={r} />
          ))}
        </div>
        {reports.length === 0 && (
          <p className="text-center text-sm text-gray-500 mt-8">ไม่มีข้อมูล</p>
        )}
      </div>
    </div>
  );
}
