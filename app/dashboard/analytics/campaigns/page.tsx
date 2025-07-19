"use client"
import { useEffect, useState } from "react"
import CampaignReportCard, { CampaignReport } from "@/components/CampaignReportCard"
import { loadCampaignReports, mockCampaignReports } from "@/lib/mock-campaigns"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function CampaignSummaryPage() {
  const [reports, setReports] = useState<CampaignReport[]>([])

  useEffect(() => {
    loadCampaignReports()
    setReports([...mockCampaignReports])
  }, [])

  const data = reports.map(r => ({ slug: r.slug, bills: r.bills }))

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">สรุปแคมเปญ</h1>
      {reports.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {reports.map(r => <CampaignReportCard key={r.slug} report={r} />)}
        </div>
      ) : (
        <p className="text-muted-foreground">ไม่มีข้อมูล</p>
      )}
      {data.length > 0 && (
        <ChartContainer className="h-60" config={{ campaign: { color: "hsl(221,83%,53%)" } }}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="slug" />
            <YAxis allowDecimals={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="bills" fill="var(--color-campaign)" />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  )
}
